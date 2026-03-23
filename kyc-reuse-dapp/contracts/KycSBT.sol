// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title KycSBT
 * @notice Multi-issuer, levelled, expiring KYC credential (soulbound-style).
 *         Issuers (banks / exchanges) mark addresses as KYC-verified on-chain.
 *         Other contracts can call isVerifiedAtLevel() to gate access.
 */
contract KycSBT {
    address public owner;

    struct KycInfo {
        bool verified;      // is credential currently valid?
        uint8 level;        // 0 = none, 1 = basic, 2 = enhanced, etc.
        uint256 verifiedAt; // when it was last approved
        uint256 expiresAt;  // unix timestamp when it expires
    }

    // wallet => KYC info
    mapping(address => KycInfo) private _kyc;

    // addresses allowed to issue / revoke KYC
    mapping(address => bool) public isIssuer;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);

    event KycApproved(
        address indexed issuer,
        address indexed user,
        uint8 level,
        uint256 verifiedAt,
        uint256 expiresAt
    );

    event KycRevoked(address indexed issuer, address indexed user, uint256 revokedAt);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyIssuer() {
        require(isIssuer[msg.sender], "Not issuer");
        _;
    }

    constructor() {
        owner = msg.sender;
        isIssuer[msg.sender] = true; // deployer is first issuer
        emit OwnershipTransferred(address(0), msg.sender);
        emit IssuerAdded(msg.sender);
    }

    // ------------------------------------------------------------------------
    // Owner management
    // ------------------------------------------------------------------------

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function addIssuer(address issuer) external onlyOwner {
        require(issuer != address(0), "Zero address");
        require(!isIssuer[issuer], "Already issuer");
        isIssuer[issuer] = true;
        emit IssuerAdded(issuer);
    }

    function removeIssuer(address issuer) external onlyOwner {
        require(isIssuer[issuer], "Not issuer");
        isIssuer[issuer] = false;
        emit IssuerRemoved(issuer);
    }

    // ------------------------------------------------------------------------
    // KYC logic
    // ------------------------------------------------------------------------

    /**
     * @notice Approve or update KYC for a user.
     * @param user Wallet to approve.
     * @param level KYC level (1 basic, 2 enhanced, etc.).
     * @param validForSeconds Credential validity duration from now.
     */
    function approveKyc(
        address user,
        uint8 level,
        uint256 validForSeconds
    ) external onlyIssuer {
        require(user != address(0), "Zero address");
        require(level > 0, "Invalid level");
        require(validForSeconds > 0, "Invalid validity");

        uint256 nowTs = block.timestamp;

        KycInfo storage info = _kyc[user];
        info.verified = true;
        info.level = level;
        info.verifiedAt = nowTs;
        info.expiresAt = nowTs + validForSeconds;

        emit KycApproved(msg.sender, user, level, nowTs, info.expiresAt);
    }

    /**
     * @notice Revoke KYC credential for a user.
     */
    function revokeKyc(address user) external onlyIssuer {
        KycInfo storage info = _kyc[user];
        require(info.verified, "Not verified");
        info.verified = false;
        emit KycRevoked(msg.sender, user, block.timestamp);
    }

    // ------------------------------------------------------------------------
    // Views
    // ------------------------------------------------------------------------

    /**
     * @notice Get full KYC info for a wallet.
     */
    function getKycInfo(address user) external view returns (KycInfo memory) {
        return _kyc[user];
    }

    /**
     * @notice Simple check: is credential valid right now (any level)?
     */
    function isVerified(address user) public view returns (bool) {
        KycInfo memory info = _kyc[user];
        return info.verified && info.expiresAt > block.timestamp;
    }

    /**
     * @notice Check if user has at least `minLevel` and is not expired.
     */
    function isVerifiedAtLevel(address user, uint8 minLevel) external view returns (bool) {
        KycInfo memory info = _kyc[user];
        return
            info.verified &&
            info.level >= minLevel &&
            info.expiresAt > block.timestamp;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
error AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_DUST(uint256 dust);
error WRONG_PERMIT_PARAMS();
error INVALID_WORKER_SIGNATURE();

contract Web3Jobs is Ownable2Step {
    using SafeERC20 for IERC20;

    uint256 public constant DUST = 1E6;

    bytes32 private constant ASSIGN_TYPE_HASH =
        keccak256(
            "assignJob(bytes memory clientSig,bytes memory workerSig,address worker,uint256 amount,IERC20 token,stopTime)"
        );
    bytes32 private constant COMPLETION_TYPE_HASH =
        keccak256(
            "assignJob(bytes memory clientSig,bytes memory workerSig,address worker,uint256 amount,IERC20 token,stopTime)"
        );

    mapping(address user => mapping(address token => uint256 amountAvailable)) availableBalance;
    mapping(address client => mapping(address worker => uint256)) nance;
    mapping(bytes32 id => JobAssignmentMessage) JobUniqueId;
    mapping(bytes32 id => jobCompletionMessage) JobCompleteId;
    mapping(address => bytes32[]) completedJobs;
    mapping(address token => uint256 amount) protocolFee;

    enum RATING {
        NO_RATING,
        VERY_POOR,
        POOR,
        GOOD,
        VERY_GOOD,
        EXCELLENT
    }

    struct ERC20PermitParams {
        address owner;
        uint256 value;
        uint256 deadline;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    struct JobAssignmentMessage {
        address client; // must be msg.sender
        address worker; // must be same for both messages and must be the same as the recovered address of the workermsg
        uint256 amount;
        address token;
        uint256 nance;
        bool isLive;
        uint256 startTime;
        uint256 timeLine;
    }

    struct jobCompletionMessage {
        bytes32 id;
        string review;
        RATING rating;
        uint96 tip;
    }

    struct DisputeMessage {
        bytes32 id;
        bool isClient;
    }

    modifier nonreentrant() {
        uint8 UNLOCK_KEY;
        assembly {
            if tload(UNLOCK_KEY) {
                revert(0, 0)
            }
            tstore(UNLOCK_KEY, 1)
        }
        _;
        assembly {
            tstore(UNLOCK_KEY, 0)
        }
    }

    constructor() Ownable(msg.sender) {}

    function withdrawProtocolFees(address token) external {
        if (token == address(0)) {
            (bool success, ) = owner().call{value: protocolFee[token]}("");
            require(success);
        } else {
            IERC20(token).safeTransfer(owner(), protocolFee[token]);
        }
        delete protocolFee[token];
    }

    function withdrawAvailable(
        address token_,
        uint256 amount
    ) external nonreentrant {
        address sender = _msgSender();
        availableBalance[sender][token_] -= amount;
        if (token_ == address(0)) {
            (bool success, ) = sender.call{value: amount}("");
            require(success, "failed to send native");
            return;
        }
        IERC20(token_).safeTransfer(sender, amount);
    }

    function resolveDispute(
        bytes memory ownerSig,
        bytes memory otherSig,
        bool isClient,
        bytes32 id
    ) external {
        DisputeMessage memory message = DisputeMessage(id, isClient);
        (bytes32 digest, address recoveredOwner) = fullRecovery(
            message,
            ownerSig
        );
        address recoveredOther = recover(digest, otherSig);
        JobAssignmentMessage storage assignmentMessage = JobUniqueId[id];
        (
            address worker,
            address client,
            uint256 amount,
            uint256 fee,
            address token
        ) = generateAssignmentParams(assignmentMessage);
        uint256 originalAmount = amount + fee;
        if (isClient) {
            require(recoveredOther == client, "wrong signature");
        } else {
            require(recoveredOther == worker, "wrong signature");
        }
        if (owner() == recoveredOwner && assignmentMessage.isLive) {
            assignmentMessage.isLive = false;
            if (token == address(0)) {
                if (isClient) {
                    nativePayout((originalAmount), 0, client);
                } else {
                    nativePayout(amount, fee, worker);
                }
            } else {
                if (isClient) {
                    ERC20Payout(originalAmount, 0, client, token);
                } else {
                    ERC20Payout(amount, fee, worker, token);
                }
            }
        }
    }

    function completeJob(
        bytes memory sig,
        bytes32 id,
        string memory review,
        RATING rating,
        uint96 tip
    ) external nonreentrant {
        jobCompletionMessage memory message = jobCompletionMessage(
            id,
            review,
            rating,
            tip
        );
        (, address signedClient) = fullRecovery(message, sig);
        {
            JobAssignmentMessage storage assignmentMessage = JobUniqueId[id];
            (
                address worker,
                address client,
                uint256 amount,
                uint256 fee,
                address token
            ) = generateAssignmentParams(assignmentMessage);
            if (signedClient == client && assignmentMessage.isLive) {
                assignmentMessage.isLive = false;
                if (token == address(0)) {
                    if (tip == 0) {
                        nativePayout(amount, fee, worker);
                    } else {
                        availableBalance[client][token] -= uint256(tip);
                        nativePayout((amount + tip), fee, worker);
                    }
                } else {
                    if (tip == 0) {
                        ERC20Payout(amount, fee, worker, token);
                    } else {
                        availableBalance[client][token] -= uint256(tip);
                        ERC20Payout((amount + tip), fee, worker, token);
                    }
                }

                completedJobs[worker].push(id);
            }
            JobCompleteId[id] = message;
        }
    }

    function DepositWithPermitAndAssignJob(
        address token_,
        ERC20PermitParams memory permitParams,
        bytes memory workerSig,
        address worker,
        uint256 amount,
        uint256 timeLine
    ) external {
        depositWithPermit(token_, permitParams);
        assignJob(workerSig, worker, amount, (token_), timeLine);
    }

    function depositAndAssignJob(
        address token_,
        uint256 Depositamount_,
        bytes memory workerSig,
        address worker,
        uint256 amount,
        uint256 timeLine
    ) external payable {
        deposit(token_, Depositamount_);
        assignJob(workerSig, worker, amount, address(token_), timeLine);
    }

    function deposit(
        address token_,
        uint256 amount_
    ) public payable nonreentrant {
        address depositor = _msgSender();
        if (amount_ < DUST) {
            revert AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_DUST(DUST);
        }
        if (token_ == address(0)) {
            amount_ = msg.value;
        } else {
            IERC20(token_).safeTransferFrom(depositor, address(this), amount_);
        }
        availableBalance[depositor][token_] += amount_;
    }

    function depositWithPermit(
        address token_,
        ERC20PermitParams memory permitParams
    ) public {
        IERC20Permit((token_)).permit(
            permitParams.owner,
            address(this),
            permitParams.value,
            permitParams.deadline,
            permitParams.v,
            permitParams.r,
            permitParams.s
        );
        deposit(token_, permitParams.value);
    }

    function assignJob(
        bytes memory sig,
        address worker,
        uint256 amount,
        address token,
        uint256 timeLine
    ) public {
        address sender = _msgSender();
        uint256 id_ = ++nance[_msgSender()][worker];
        JobAssignmentMessage memory message = JobAssignmentMessage(
            sender,
            worker,
            amount,
            token,
            id_,
            true,
            block.timestamp,
            uint256(block.timestamp) + timeLine
        );
        (bytes32 digest, address recovered) = fullRecovery(message, sig);
        if (recovered != worker) {
            revert INVALID_WORKER_SIGNATURE();
        }
        JobUniqueId[digest] = message;
        availableBalance[sender][address(token)] -= amount;
    }

    function payFees(address token, uint256 amount) internal {
        if (amount > 0) {
            protocolFee[token] += amount;
        }
    }

    function nativePayout(
        uint256 amount,
        uint256 fee,
        address receiver
    ) internal {
        (bool success, ) = receiver.call{value: amount}("");
        require(success);
        payFees(address(0), fee);
    }

    function generateAssignmentParams(
        JobAssignmentMessage memory message
    )
        internal
        pure
        returns (
            address worker,
            address client,
            uint256 amount,
            uint256 fee,
            address token
        )
    {
        worker = message.worker;
        (amount, fee) = generateAmountAndFees(message.amount);
        client = message.client;
        token = message.token;
    }

    function ERC20Payout(
        uint256 amount,
        uint256 fee,
        address receiver,
        address token
    ) internal {
        IERC20(token).safeTransfer(receiver, amount);
        payFees(token, fee);
    }

    function generateAmountAndFees(
        uint256 originalAmount
    ) public pure returns (uint256 amount, uint256 fee) {
        amount = ((originalAmount * 95) / 100);
        fee = originalAmount - amount;
    }

    function fullRecovery(
        JobAssignmentMessage memory message,
        bytes memory sig
    ) public view returns (bytes32 digest, address recoveredAddress) {
        bytes32 structHash = hash(message);
        digest = generateDigest(structHash);
        recoveredAddress = recover(digest, sig);
    }

    function fullRecovery(
        DisputeMessage memory message,
        bytes memory sig
    ) public view returns (bytes32 digest, address recoveredAddress) {
        bytes32 structHash = hash(message);
        digest = generateDigest(structHash);
        recoveredAddress = recover(digest, sig);
    }

    function fullRecovery(
        jobCompletionMessage memory message,
        bytes memory sig
    ) public view returns (bytes32 digest, address recoveredAddress) {
        bytes32 structHash = hash(message);
        digest = generateDigest(structHash);
        recoveredAddress = recover(digest, sig);
    }

    function hash(
        JobAssignmentMessage memory message
    ) public pure returns (bytes32) {
        return keccak256(abi.encode(message));
    }

    function hash(DisputeMessage memory message) public pure returns (bytes32) {
        return keccak256(abi.encode(message));
    }

    function hash(
        jobCompletionMessage memory message
    ) public pure returns (bytes32) {
        return keccak256(abi.encode(message));
    }

    function generateDigest(
        bytes32 structHash
    ) public view returns (bytes32 digest) {
        digest = keccak256(
            abi.encodePacked(
                structHash,
                domainSeperatorGenerator(ASSIGN_TYPE_HASH),
                hex"09_01"
            )
        );
    }

    function domainSeperatorGenerator(
        bytes32 TYPED_HASH
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    TYPED_HASH,
                    keccak256("web3jobs"),
                    keccak256(abi.encode(1)),
                    block.chainid,
                    address(this)
                )
            );
    }

    function recover(
        bytes32 digest,
        bytes memory sig
    ) public pure returns (address) {
        return ECDSA.recover(digest, sig);
    }

    function getCompletedJobs(
        address worker
    ) public view returns (bytes32[] memory) {
        return completedJobs[worker];
    }

    function getCompletedJobData(
        bytes32 id
    ) public view returns (jobCompletionMessage memory) {
        return JobCompleteId[id];
    }

    function getCompletedJobDatas(
        address worker
    ) public view returns (jobCompletionMessage[] memory jobData) {
        bytes32[] memory ids = getCompletedJobs(worker);
        for (uint i = 0; i < ids.length; i++) {
            jobData[i] = getCompletedJobData(ids[i]);
        }
    }
}

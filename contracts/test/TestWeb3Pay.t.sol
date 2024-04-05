// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {Test, console, console2} from "forge-std/Test.sol";
import {Web3Jobs, IERC20} from "../src/Web3Jobs.sol";

contract TestWeb3Pay is Test {
    IERC20 USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    address USDCholder = 0xD6153F5af5679a75cC85D8974463545181f48772;
    IERC20 DAI = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    address DAIholder = 0x1E227979f0b5BC691a70DEAed2e0F39a6F538FD5;
    Web3Jobs jobs;
    address admin;
    uint256 adminKey;
    address bob;
    uint256 bobsKey;
    address alice;
    uint256 aliceKey;
    address charlie;
    uint256 charliesKey;
    address june;
    uint256 junesKey;

    function setUp() public {
        vm.createSelectFork(
            "https://mainnet.infura.io/v3/44463ecba85844b584e4597f4087e91f"
        );
        (admin, adminKey) = makeAddrAndKey("admin");
        (bob, bobsKey) = makeAddrAndKey("bob");
        (alice, aliceKey) = makeAddrAndKey("alice");
        (charlie, charliesKey) = makeAddrAndKey("charlie");
        (june, junesKey) = makeAddrAndKey("june");
        vm.prank(admin);
        jobs = new Web3Jobs();
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
        vm.deal(june, 1 ether);
        vm.deal(charlie, 1 ether);
        vm.startPrank(USDCholder);
        USDC.transfer(alice, 1000e6);
        USDC.transfer(bob, 3000e6);
        vm.stopPrank();
        vm.startPrank(DAIholder);
        DAI.transfer(alice, 1000 ether);
        DAI.transfer(bob, 3000 ether);
        vm.stopPrank();
    }

    function generateSignatureForMessageWithKey(
        Web3Jobs.JobAssignmentMessage memory message,
        uint256 privateKey
    ) public view returns (bytes memory signature) {
        bytes32 structHash = jobs.hash(message);
        console.log("sthash");
        console.logBytes32(structHash);
        bytes32 digest = jobs.generateDigest(
            jobs.ASSIGN_TYPE_HASH(),
            structHash
        );
        (uint8 v, bytes32 r, bytes32 s) = (vm.sign(privateKey, digest));
        console.logBytes32(digest);
        signature = abi.encodePacked(r, s, v);
        console.logBytes(signature);
    }

    function generateSignatureForMessageWithKey(
        Web3Jobs.jobCompletionMessage memory message,
        uint256 privateKey
    ) public view returns (bytes memory signature) {
        bytes32 structHash = jobs.hash(message);
        bytes32 digest = jobs.generateDigest(
            jobs.COMPLETION_TYPE_HASH(),
            structHash
        );
        (uint8 v, bytes32 r, bytes32 s) = (vm.sign(privateKey, digest));
        signature = abi.encodePacked(v, r, s);
    }

    function generateSignatureForMessageWithKey(
        Web3Jobs.DisputeMessage memory message,
        uint256 privateKey
    ) public view returns (bytes memory signature) {
        bytes32 structHash = jobs.hash(message);
        bytes32 digest = jobs.generateDigest(
            structHash,
            jobs.RESOLVE_DISPUTE_TYPE_HASH()
        );
        (uint8 v, bytes32 r, bytes32 s) = (vm.sign(privateKey, digest));
        signature = abi.encodePacked(v, r, s);
    }

    function deposit(address user, address token_, uint256 amount_) public {
        vm.startPrank(user);
        if (token_ != address(0)) {
            IERC20(token_).approve(address(jobs), amount_);
            jobs.deposit(token_, amount_);
        } else {
            jobs.deposit{value: amount_}(token_, amount_);
        }
        vm.stopPrank();
        console.log(jobs.getUserBalance(user, token_));
    }

    function withdraw(address user, address token_, uint256 amount_) public {
        vm.startPrank(user);
        jobs.withdrawAvailable(token_, amount_);
        vm.stopPrank();
        console.log(jobs.getUserBalance(user, token_));
    }

    function testDeposit() public {
        deposit(bob, address(0), 5 ether);
        deposit(alice, address(DAI), 500 ether);
        deposit(bob, address(USDC), 400e6);
    }

    function testWithdraw() public {
        vm.expectRevert();
        withdraw(bob, address(0), 4.000000000001 ether);
        withdraw(alice, address(DAI), 500 ether);
        withdraw(bob, address(USDC), 400e6);
    }

    function assignJob(
        address worker,
        uint256 workerPk,
        uint256 amount,
        address token,
        uint256 timeline,
        Web3Jobs.JobAssignmentMessage memory message
    ) internal {
        bytes memory sig = generateSignatureForMessageWithKey(
            message,
            workerPk
        );
        uint gasStart = gasleft();

        jobs.assignJob(sig, worker, amount, token, timeline);
        console.log("gas used", gasStart - gasleft());
    }

    function testAssignJob() public {
        testDeposit();
        vm.startPrank(bob);
        assignJob(
            charlie,
            charliesKey,
            1 ether,
            address(0),
            3 weeks,
            jobs.assignmentGenerator(charlie, 1 ether, address(0), (3 weeks), 1)
        );
        vm.stopPrank();
        testWithdraw();
    }

    function completeJob(
        Web3Jobs.jobCompletionMessage memory message,
        uint256 pk,
        bytes32 id,
        string memory review,
        Web3Jobs.RATING rating,
        uint96 tip
    ) internal {
        bytes memory sig = generateSignatureForMessageWithKey(message, pk);
        jobs.completeJob(sig, id, review, rating, tip);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {Test, console, console2} from "forge-std/Test.sol";
import {Web3Jobs} from "../src/Web3Jobs.sol";

contract TestWeb3Pay is Test {
    Web3Jobs jobs;
    address admin;
    uint256 adminKey;
    address clientOne;
    uint256 keyC1;
    address clientTwo;
    uint256 keyC2;
    address workerOne;
    uint256 keyW1;
    address workerTwo;
    uint256 keyW2;

    function setUp() public {
        (admin, adminKey) = makeAddrAndKey("admin");
        (clientOne, keyC1) = makeAddrAndKey("clientOne");
        (clientTwo, keyC2) = makeAddrAndKey("clientTwo");
        (workerOne, keyW1) = makeAddrAndKey("workerOne");
        (workerTwo, keyW2) = makeAddrAndKey("workerTwo");
        vm.prank(admin);
        jobs = new Web3Jobs();
    }

    function generateSignatureForMessageWithKey(
        Web3Jobs.JobAssignmentMessage memory message,
        uint256 privateKey
    ) public returns (bytes memory signature) {
        bytes32 structHash = jobs.hash(message);
        bytes32 digest = jobs.generateDigest(structHash);
        (uint8 v, bytes32 r, bytes32 s) = (vm.sign(privateKey, digest));
        signature = abi.encodePacked(v, r, s);
    }

    function generateSignatureForMessageWithKey(
        Web3Jobs.jobCompletionMessage memory message,
        uint256 privateKey
    ) public returns (bytes memory signature) {
        bytes32 structHash = jobs.hash(message);
        bytes32 digest = jobs.generateDigest(structHash);
        (uint8 v, bytes32 r, bytes32 s) = (vm.sign(privateKey, digest));
        signature = abi.encodePacked(v, r, s);
    }

    function generateSignatureForMessageWithKey(
        Web3Jobs.DisputeMessage memory message,
        uint256 privateKey
    ) public returns (bytes memory signature) {
        bytes32 structHash = jobs.hash(message);
        bytes32 digest = jobs.generateDigest(structHash);
        (uint8 v, bytes32 r, bytes32 s) = (vm.sign(privateKey, digest));
        signature = abi.encodePacked(v, r, s);
    }
}

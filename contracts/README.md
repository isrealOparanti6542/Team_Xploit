mapping (uint256 id, JobAssignmentMessage) idToJobMetadata
depositWithPermit(ERCPermitParams memory permitParams) external returns(uint)
DepositWithPermitAndAssignJob(ERCPermitParams memory permitParams) external returns(bool)
function deposit(IERC20 token,uint256  amount) public ;
function depositAndAssignJob(IERC20 depositToken, uint256 depositAmount,bytes memory clientSig,bytes memory workerSig,address worker,uint256 amount,IERC20 token,uint256 stopTime)external;
function assignJob(bytes memory clientSig,bytes memory workerSig,address worker,uint256 amount,IERC20 token,uint256 stopTime)
function finishJob(bytes memory clinetCompletemsg,uint256 id,string review,RATING rating,uint256 tip) external returns (uint256 id,bool isLive);
function getUserBalance(address userAddress,IERC20 token) private view returns (uint256 balance); 
function getAvailableUserBalance(address userAddress,IERC20 token) private view returns (uint256 balance); 
function getAllocatedUserBalance(address userAddress,IERC20 token) private view returns (uint256 balance);
function checkBalanceCanCoverAmount(address userAddress,IERC20 token,uint256 amount);
function getSigner(bytes memory sig);
function withdraw(IERC20 token,uint256 amount);
function DomainSeperator(bytes32 TYPED_HASH) view returns(bytes32) {
    return return keccak256(abi.encode(TYPED_HASH, _hashedName, _hashedVersion, block.chainid, address(this)));
}
client message 

struct JobAssignmentMessage{
 address client // must be msg.sender
 address worker // must be same for both messages and must be the same as the recovered address of the workermsg
 uint256 amount
 address token
 uint256 nance 
 bool isLive
}

struct ERCPermitParams{
    address owner
    address spender
    uint256 value
    uint256 deadline
    uint8 v
    bytes32 r
    bytes32 s
}
enum RATING{
    very poor
    poor
    good
    very good
    excellent

}

struct jobCompletionMessage{
    uint256 id
    string review 
    RATING rating
    uint96 tip
}
mapping(address client => mapping(address worker => uint256)) nance 
JobAssignmentMessage{
    client msg.sender
    worker _param
    amount  _param
    token _param
    _nance ++nance[msg.sender][_worker]
    startTime block.timestamp
    stopTime block.timestamp + _param
    isLive false
}
bytes32 private constant ASSIGN_TYPE_HASH =
        keccak256("assignJob(bytes memory clientSig,bytes memory workerSig,address worker,uint256 amount,IERC20 token,stopTime)");
bytes32 private constant COMPLETION_TYPE_HASH =
        keccak256("assignJob(bytes memory clientSig,bytes memory workerSig,address worker,uint256 amount,IERC20 token,stopTime)");
_hashedName = keccak256("App name")
_hashedVersion = keccak256(1)
bytes32 hash = keccak256(abi.encodePacked(keccak256(JobAssignmentMessage)),DOMAIN_SEPERATOR(ASSIGN_TYPE_HASH),hex"09_01")
ecdsa.recover(hash,clientSig)
ecdsa.recover(hash,workerSig)
ensure client == msg.sender and worker = worker param
mapping (uint256 nance =>JobAssignmentMessage) public assignments

finish job
jobCompletionMessage {
    id _param
    review _param
    rating _param
    tip _param
}
bytes32 hash = keccak256(abi.encodePacked(keccak256(jobCompletionMessage)),DOMAIN_SEPERATOR(COMPLETION_TYPE_HASH),hex"09_01")
ecdsa.recover(hash,clientSig)
ensure client = assignments[id].client
require(assignments[id].isLive)
send funds and tip if greater than zero
store review and rating in state
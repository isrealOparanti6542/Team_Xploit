let contractAddress;
const contractABI = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"ASSIGN_TYPE_HASH","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"COMPLETION_TYPE_HASH","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"DUST","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"DepositWithPermitAndAssignJob","inputs":[{"name":"token_","type":"address","internalType":"address"},{"name":"permitParams","type":"tuple","internalType":"struct Web3Jobs.ERC20PermitParams","components":[{"name":"owner","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"v","type":"uint8","internalType":"uint8"},{"name":"r","type":"bytes32","internalType":"bytes32"},{"name":"s","type":"bytes32","internalType":"bytes32"}]},{"name":"workerSig","type":"bytes","internalType":"bytes"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"start","type":"uint256","internalType":"uint256"},{"name":"timeLine","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"RESOLVE_DISPUTE_TYPE_HASH","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"acceptOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"assignJob","inputs":[{"name":"sig","type":"bytes","internalType":"bytes"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"token","type":"address","internalType":"address"},{"name":"timeLine","type":"uint256","internalType":"uint256"},{"name":"start","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"assignmentGenerator","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"token","type":"address","internalType":"address"},{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"timeline","type":"uint256","internalType":"uint256"},{"name":"id_","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.JobAssignmentMessage","components":[{"name":"client","type":"address","internalType":"address"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"token","type":"address","internalType":"address"},{"name":"nance","type":"uint256","internalType":"uint256"},{"name":"isLive","type":"bool","internalType":"bool"},{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"timeLine","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"completeJob","inputs":[{"name":"sig","type":"bytes","internalType":"bytes"},{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"completionGenerator","inputs":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}],"outputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.jobCompletionMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}]}],"stateMutability":"view"},{"type":"function","name":"deposit","inputs":[{"name":"token_","type":"address","internalType":"address"},{"name":"amount_","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"depositAndAssignJob","inputs":[{"name":"token_","type":"address","internalType":"address"},{"name":"depositAmount_","type":"uint256","internalType":"uint256"},{"name":"workerSig","type":"bytes","internalType":"bytes"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"start","type":"uint256","internalType":"uint256"},{"name":"timeLine","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"depositWithPermit","inputs":[{"name":"token_","type":"address","internalType":"address"},{"name":"permitParams","type":"tuple","internalType":"struct Web3Jobs.ERC20PermitParams","components":[{"name":"owner","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"v","type":"uint8","internalType":"uint8"},{"name":"r","type":"bytes32","internalType":"bytes32"},{"name":"s","type":"bytes32","internalType":"bytes32"}]}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"disputeGenerator","inputs":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"isClient","type":"bool","internalType":"bool"}],"outputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.DisputeMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"isClient","type":"bool","internalType":"bool"}]}],"stateMutability":"view"},{"type":"function","name":"domainSeperatorGenerator","inputs":[{"name":"TYPED_HASH","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"fullRecovery","inputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.JobAssignmentMessage","components":[{"name":"client","type":"address","internalType":"address"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"token","type":"address","internalType":"address"},{"name":"nance","type":"uint256","internalType":"uint256"},{"name":"isLive","type":"bool","internalType":"bool"},{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"timeLine","type":"uint256","internalType":"uint256"}]},{"name":"sig","type":"bytes","internalType":"bytes"},{"name":"type_hash","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"digest","type":"bytes32","internalType":"bytes32"},{"name":"recoveredAddress","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"fullRecovery","inputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.jobCompletionMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}]},{"name":"sig","type":"bytes","internalType":"bytes"},{"name":"type_hash","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"digest","type":"bytes32","internalType":"bytes32"},{"name":"recoveredAddress","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"fullRecovery","inputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.DisputeMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"isClient","type":"bool","internalType":"bool"}]},{"name":"sig","type":"bytes","internalType":"bytes"},{"name":"type_hash","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"digest","type":"bytes32","internalType":"bytes32"},{"name":"recoveredAddress","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"generateAmountAndFees","inputs":[{"name":"originalAmount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"fee","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"generateDigest","inputs":[{"name":"TypeHash","type":"bytes32","internalType":"bytes32"},{"name":"structHash","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"digest","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"getCompletedJobData","inputs":[{"name":"id","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"tuple","internalType":"struct Web3Jobs.jobCompletionMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}]}],"stateMutability":"view"},{"type":"function","name":"getCompletedJobDatas","inputs":[{"name":"worker","type":"address","internalType":"address"}],"outputs":[{"name":"jobData","type":"tuple[]","internalType":"struct Web3Jobs.jobCompletionMessage[]","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}]}],"stateMutability":"view"},{"type":"function","name":"getCompletedJobs","inputs":[{"name":"worker","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bytes32[]","internalType":"bytes32[]"}],"stateMutability":"view"},{"type":"function","name":"getNextNace","inputs":[{"name":"worker","type":"address","internalType":"address"},{"name":"client","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getUserBalance","inputs":[{"name":"user","type":"address","internalType":"address"},{"name":"token","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"hash","inputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.DisputeMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"isClient","type":"bool","internalType":"bool"}]}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"pure"},{"type":"function","name":"hash","inputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.JobAssignmentMessage","components":[{"name":"client","type":"address","internalType":"address"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"token","type":"address","internalType":"address"},{"name":"nance","type":"uint256","internalType":"uint256"},{"name":"isLive","type":"bool","internalType":"bool"},{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"timeLine","type":"uint256","internalType":"uint256"}]}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"pure"},{"type":"function","name":"hash","inputs":[{"name":"message","type":"tuple","internalType":"struct Web3Jobs.jobCompletionMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}]}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"pure"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"pendingOwner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"recover","inputs":[{"name":"digest","type":"bytes32","internalType":"bytes32"},{"name":"sig","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"pure"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"resolveDispute","inputs":[{"name":"ownerSig","type":"bytes","internalType":"bytes"},{"name":"otherSig","type":"bytes","internalType":"bytes"},{"name":"isClient","type":"bool","internalType":"bool"},{"name":"id","type":"bytes32","internalType":"bytes32"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdrawAvailable","inputs":[{"name":"token_","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdrawProtocolFees","inputs":[{"name":"token","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"DepositComplete","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"},{"name":"token","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"DisputeResolved","inputs":[{"name":"id","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"isClient","type":"bool","indexed":true,"internalType":"bool"},{"name":"message","type":"tuple","indexed":true,"internalType":"struct Web3Jobs.JobAssignmentMessage","components":[{"name":"client","type":"address","internalType":"address"},{"name":"worker","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"token","type":"address","internalType":"address"},{"name":"nance","type":"uint256","internalType":"uint256"},{"name":"isLive","type":"bool","internalType":"bool"},{"name":"startTime","type":"uint256","internalType":"uint256"},{"name":"timeLine","type":"uint256","internalType":"uint256"}]}],"anonymous":false},{"type":"event","name":"JobAssigned","inputs":[{"name":"client","type":"address","indexed":true,"internalType":"address"},{"name":"worker","type":"address","indexed":true,"internalType":"address"},{"name":"id","type":"bytes32","indexed":true,"internalType":"bytes32"}],"anonymous":false},{"type":"event","name":"JobCompleted","inputs":[{"name":"id","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"message","type":"tuple","indexed":true,"internalType":"struct Web3Jobs.jobCompletionMessage","components":[{"name":"id","type":"bytes32","internalType":"bytes32"},{"name":"review","type":"string","internalType":"string"},{"name":"rating","type":"uint8","internalType":"enum Web3Jobs.RATING"},{"name":"tip","type":"uint96","internalType":"uint96"}]}],"anonymous":false},{"type":"event","name":"OwnershipTransferStarted","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"WithdrawalSuccessful","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"},{"name":"token","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_DUST","inputs":[{"name":"dust","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"AddressEmptyCode","inputs":[{"name":"target","type":"address","internalType":"address"}]},{"type":"error","name":"AddressInsufficientBalance","inputs":[{"name":"account","type":"address","internalType":"address"}]},{"type":"error","name":"ECDSAInvalidSignature","inputs":[]},{"type":"error","name":"ECDSAInvalidSignatureLength","inputs":[{"name":"length","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ECDSAInvalidSignatureS","inputs":[{"name":"s","type":"bytes32","internalType":"bytes32"}]},{"type":"error","name":"FailedInnerCall","inputs":[]},{"type":"error","name":"INVALID_WORKER_SIGNATURE","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]},{"type":"error","name":"SafeERC20FailedOperation","inputs":[{"name":"token","type":"address","internalType":"address"}]}]
async function connect() {
  if (window.ethereum) {
    // instantiate Web3 with the injected provider
    const web3 = new Web3(window.ethereum);

    //request user to connect accounts (Metamask will prompt)
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    //get the connected accounts
    const accounts = await web3.eth.getAccounts();

    //show the first connected account in the react page
    // setConnectedAccount(accounts[0]);
  } else {
    alert('Please download metamask');
  }
}

async function sign(message,connectedAccount) {

// Connect to MetaMask provider
if (window.ethereum) {
window.web3 = new Web3(window.ethereum);
try {
    // Request account access if needed
    await window.ethereum.enable();
    console.log('Connected to MetaMask');
} catch (error) {
    // User denied account access...
    console.error('Access denied by user:', error);
}
} else {
// MetaMask not detected
console.error('MetaMask not found. Please install MetaMask.');
}

// Define your message

// Get the user's Ethereum address

// Use personal.sign to prompt the user to sign the message
web3.eth.personal.sign(message, connectedAccount, '')
.then((signature) => {
    console.log('Signature:', signature);
    // Now you can send the signature wherever you need it
})
.catch((error) => {
    console.error('Error signing message:', error);
});

}

function generateAssignMessage(client,worker,token,amount,start,timeline){
  const Web3 = require('web3');

// Connect to an Ethereum node
const web3 = new Web3('https://mainnet.infura.io/v3/44463ecba85844b584e4597f4087e91f');

// ABI of the contract



// Instantiate the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.assignmentGenerator(  client,
worker,
amount,
token,
start,
timeline,
generateNance(worker,client)).call()
  .then((result) => {
      console.log('Result of myViewFunction:', result);
      return result
  })
  .catch((error) => {
      console.error('Error calling myViewFunction:', error);
  });

// Call the view function
}
function generateNance(worker,client) {
  const Web3 = require('web3');

// Connect to an Ethereum node
const web3 = new Web3('https://mainnet.infura.io/v3/44463ecba85844b584e4597f4087e91f');

// ABI of the contract



// Instantiate the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call the view function
contract.methods.getNextNace(worker,client).call()
  .then((result) => {
      console.log('Result of myViewFunction:', result);
      return result
  })
  .catch((error) => {
      console.error('Error calling myViewFunction:', error);
  });

}
function generateCompletetionMessage(id ,review,rating,tip){
  const Web3 = require('web3');

  // Connect to an Ethereum node
  const web3 = new Web3('https://mainnet.infura.io/v3/44463ecba85844b584e4597f4087e91f');
  
  // ABI of the contract
  
  
  
  // Instantiate the contract
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  contract.methods.completionGenerator( id,review,rating,tip).call()
      .then((result) => {
          console.log('Result of myViewFunction:', result);
          return result
      })
      .catch((error) => {
          console.error('Error calling myViewFunction:', error);
      });
}

function generateDisputeMessage(id,isClient) {
  const Web3 = require('web3');

  // Connect to an Ethereum node
  const web3 = new Web3('https://mainnet.infura.io/v3/44463ecba85844b584e4597f4087e91f');

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  contract.methods.DisputeGenerator( id,isClient).call()
      .then((result) => {
          console.log('Result of myViewFunction:', result);
          return result
      })
      .catch((error) => {
          console.error('Error calling myViewFunction:', error);
      });
}
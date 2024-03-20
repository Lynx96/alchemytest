const path = require("path");
const fs = require('fs');
require("dotenv").config({ path: path.resolve("../.env") });

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

//provider - alchemy
const alchemyProvider = new ethers.AlchemyProvider(
  (network = "sepolia"),
  API_KEY
);

//signer -- you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  const filePath = './transactionHashes.txt';
  const message = await helloWorldContract.message();
  console.log("The message is: " + message);

  console.log("Updating the message...");
  const tx = await helloWorldContract.update("Sixth attempt!");
  await tx.wait();
  const updateTransactionHash = tx.hash;
  saveTransactionHash(updateTransactionHash, filePath);

  console.log(updateTransactionHash);

  const newMessage = await helloWorldContract.message();
  console.log("The new message is: " + newMessage);

}
function saveTransactionHash(updateTransactionHash, filePath){
  try {
    fs.appendFileSync(filePath, updateTransactionHash + '\n');
    console.log("Hash appended successfully!")    
        
  } catch (error) {
    console.log("Error appending the hash!");
    console.log(error.message);
  }
   

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const path = require("path");
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
  const message = await helloWorldContract.message();
  console.log("The message is: " + message);

  console.log("Updating the message...");
  const tx = await helloWorldContract.update("ccccccccccccccc");
  await tx.wait();

  console.log(tx.hash);

  const newMessage = await helloWorldContract.message();
  console.log("The new message is: " + newMessage);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

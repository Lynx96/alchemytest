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

const txHash =
  "0x83c1f1d1ad77adf2b0603e65b4eae9689a34720fa4027ec83417033e89275b89"; // Replace with your actual transaction hash

alchemyProvider
  .getTransaction(txHash)
  .then((transaction) => {
    if (transaction) {
      console.log("Transaction data:", transaction.data);
      // Process the data as needed
    } else {
      console.log("Transaction not found.");
    }
  })
  .catch((error) => {
    console.error("Error fetching transaction:", error);
  });

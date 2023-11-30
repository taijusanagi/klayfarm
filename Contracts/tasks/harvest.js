const { task } = require("hardhat/config");

task("harvest", "Calls the harvest function on the contract")
  .addParam("address", "The address to interact with")
  .addParam("index", "The index as an integer", null, types.int)
  .setAction(async (taskArgs, { ethers }) => {
    const { address, index } = taskArgs;
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("KlayFarm", address);
    const tx = await contract.connect(signer).harvest(index);
    console.log(`Called harvest function with address ${address} and index ${index} at ${tx.hash}`);
  });

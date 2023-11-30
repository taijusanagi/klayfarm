const { task } = require("hardhat/config");

task("plant", "Calls the plant function on the contract")
  .addParam("address", "The address to interact with")
  .addParam("index", "The index as an integer", null, types.int)
  .setAction(async (taskArgs, { ethers }) => {
    const { address, index } = taskArgs;

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("KlayFarm", address);
    const tx = await contract.connect(signer).plant(index);
    // const tx = await KlayFarm.attach(address).connect(signer).plant(index);

    console.log(`Called plant function with address ${address} and index ${index} at ${tx.hash}`);
  });

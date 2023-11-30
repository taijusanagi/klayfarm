const { task } = require("hardhat/config");

task("harvest", "Calls the harvest function on the contract")
  .addParam("address", "The address to interact with")
  .addParam("index", "The index as an integer", null, types.int)
  .setAction(async (taskArgs, hre) => {
    const { address, index } = taskArgs;
    console.log(`Called harvest function with address ${address} and index ${index}`);
  });

import { expect } from "chai";
import { ethers, network } from "hardhat";

async function increaseTime(duration: number) {
  await network.provider.send("evm_increaseTime", [duration]);
  await network.provider.send("evm_mine"); // this is necessary to apply the time increase
}

describe("KlayFarm", function () {
  describe("Test", function () {
    const fixture = async () => {
      const [owner] = await ethers.getSigners();
      const KlayFarm = await ethers.getContractFactory("KlayFarm");
      const klayFarm = await KlayFarm.deploy();
      await klayFarm.deployed();
      return { klayFarm, owner };
    };

    it("integration", async function () {
      const { klayFarm, owner } = await fixture();
      const tokenId = await klayFarm.getTokenIdByAddress(owner.address);
      await klayFarm.connect(owner).mint();
      const metaData = await klayFarm.getMetaData(tokenId);
      console.log("metaData", metaData);
      JSON.parse(metaData);
      const tokenURI = await klayFarm.tokenURI(tokenId);
      console.log("tokenURI", tokenURI);

      await klayFarm.connect(owner).plant(0);
      const itemsAfterPlant = await klayFarm.getAllItems(tokenId);
      console.log("itemsAfterPlant", itemsAfterPlant);

      await increaseTime(600);

      await klayFarm.connect(owner).harvest(0);
      const itemsAfterHarvest = await klayFarm.getAllItems(tokenId);
      console.log("itemsAfterHarvest", itemsAfterHarvest);
    });
  });
});

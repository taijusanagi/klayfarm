import { expect } from "chai";
import { ethers } from "hardhat";

describe("KlayFarm", function () {
  describe("Test", function () {
    const fixture = async () => {
      const [owner] = await ethers.getSigners();
      const KlayFarm = await ethers.getContractFactory("KlayFarm");
      const klayFarm = await KlayFarm.deploy();
      await klayFarm.deployed();
      return { klayFarm, owner };
    };

    it("getMetaData", async function () {
      const { klayFarm, owner } = await fixture();
      const tokenId = "0";
      await klayFarm.connect(owner).mint(owner.address, tokenId);
      const metaData = await klayFarm.getMetaData(tokenId);
      console.log("metaData", metaData);
      JSON.parse(metaData);
      const tokenURI = await klayFarm.tokenURI(tokenId);
      console.log("tokenURI", tokenURI);
    });
  });
});

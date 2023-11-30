import { ethers } from "hardhat";

async function main() {
  const KlayFarm = await ethers.getContractFactory("KlayFarm");
  const klayFarm = await KlayFarm.deploy();
  await klayFarm.deployed();
  console.log(`klayFarm deployed to ${klayFarm.address}`);
  if (!process.env.SKIP_MINT) {
    const [owner] = await ethers.getSigners();
    const tokenId = await klayFarm.getTokenIdByAddress(owner.address);
    const tokenMintTx1 = await klayFarm.mint();
    await tokenMintTx1.wait();
    console.log("minted token: ", tokenId);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

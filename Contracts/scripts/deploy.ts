import { ethers } from "hardhat";

async function main() {
  const KlayFarm = await ethers.getContractFactory("KlayFarm");
  const klayFarm = await KlayFarm.deploy();
  await klayFarm.deployed();
  console.log(`klayFarm deployed to ${klayFarm.address}`);
  if (!process.env.SKIP_MINT) {
    const [owner] = await ethers.getSigners();
    const tokenMintTx1 = await klayFarm.mint(owner.address, "0");
    await tokenMintTx1.wait();
    console.log("minted token 0");
    const tokenMintTx2 = await klayFarm.mint(owner.address, "1");
    await tokenMintTx2.wait();
    console.log("minted token 1");
    const tokenMintTx3 = await klayFarm.mint(owner.address, "2");
    await tokenMintTx3.wait();
    console.log("minted token 2");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

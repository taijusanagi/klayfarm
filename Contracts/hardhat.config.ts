import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    klaytnTestnet: {
      url: "https://public-en-baobab.klaytn.net",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;

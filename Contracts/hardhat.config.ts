import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts,
    },
    klaytnTestnet: {
      url: "https://public-en-baobab.klaytn.net",
      accounts,
    },
  },
};

export default config;

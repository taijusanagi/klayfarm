import type { VercelRequest, VercelResponse } from "@vercel/node";

import { ethers } from "ethers";
const { abi } = require("./KlayFarm.json");
const address = "0xCa12692fbF90F3551095f36BD2efcE9119330BBD";
const rpc = "https://public-en-baobab.klaytn.net";
const provider = new ethers.providers.JsonRpcProvider(rpc);
const contract = new ethers.Contract(address, abi, provider);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  console.log(id);
  const items = await contract.getAllItems(id);
  res.status(200).json(items);
}

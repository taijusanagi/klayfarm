import type { VercelRequest, VercelResponse } from "@vercel/node";

import { ethers } from "ethers";
const { abi } = require("./KlayFarm.json");
const address = "0xCa12692fbF90F3551095f36BD2efcE9119330BBD";
const rpc = "https://public-en-baobab.klaytn.net";
const provider = new ethers.providers.JsonRpcProvider(rpc);
const contract = new ethers.Contract(address, abi, provider);

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;
  console.log(id);
  const items = await contract.getAllItems(id);
  res.status(200).json({
    items: items.map((item) => {
      console.log(item);
      return {
        name: item.name,
        plantedAt: item.plantedAt.toString(),
      };
    }),
  });
};

export default allowCors(handler);

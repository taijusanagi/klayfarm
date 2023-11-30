const express = require("express");
const app = express();

const path = require("path");
const port = 8080;

const { ethers } = require("ethers");
const { abi } = require("./KlayFarm.json");
const address = "0xCa12692fbF90F3551095f36BD2efcE9119330BBD";
const rpc = "https://public-en-baobab.klaytn.net";
const provider = new ethers.providers.JsonRpcProvider(rpc);
const contract = new ethers.Contract(address, abi, provider);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.get("/items", async (req, res) => {
  const { id } = req.query;
  const items = await contract.getAllItems(id);
  res.send(items);
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

module.exports = app;

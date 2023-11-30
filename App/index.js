const express = require("express");
const app = express();
const http = require("http");
// const path = require("path");
const port = 3000;

// app.use(express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

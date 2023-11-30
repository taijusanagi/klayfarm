const express = require("express");
const app = express();

const path = require("path");
const port = 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

module.exports = app;

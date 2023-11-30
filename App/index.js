const express = require("express");
const app = express();

const path = require("path");
const port = 8080;

app.use(express.static(path.join(process.cwd(), "/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), +"/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

module.exports = app;

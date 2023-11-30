const express = require("express");
const app = express();

const path = require("path");
const port = 8080;

app.use(express.static(path.join(process.cwd(), "/")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(process.cwd(), +"/index.html"));
// });

app.get("/", (req, res) => {
  console.log("__dirname");
  console.log(__dirname);
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

module.exports = app;

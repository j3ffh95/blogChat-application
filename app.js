const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Welcme to our new app");
});

app.listen(3000);

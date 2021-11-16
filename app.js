const express = require("express");
const app = express();

// Set express views so it could know where to look for it (in the views folder)
app.set("views", "views");

app.get("/", function (req, res) {
  res.send("Welcome to our new app");
});

app.listen(3000);

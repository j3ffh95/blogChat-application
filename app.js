const express = require("express");
const app = express();

// Let express know we are using the public folder
app.use(express.static("public"));
// Set express views so it could know where to look for it (in the views folder)
app.set("views", "views");
// let express know which template system/engine we are using
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home-guest");
});

app.listen(3000);

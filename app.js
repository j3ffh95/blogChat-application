const express = require("express");
const router = require("./router");
const app = express();

// HTML Form submit - let express know to add the user submitted data onto our request object, so then we can access it from request.body
app.use(express.urlencoded({ extended: false }));
// Let express know about sending Json data
app.use(express.json());

// Let express know we are using the public folder
app.use(express.static("public"));
// Set express views so it could know where to look for it (in the views folder)
app.set("views", "views");
// let express know which template system/engine we are using
app.set("view engine", "ejs");

// Let our app know to use that new router we set up
app.use("/", router);

module.exports = app;

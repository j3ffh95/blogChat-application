const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const router = require("./router");
const app = express();

let sessionOptions = session({
  secret: "JavaScript is so cool",
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});

app.use(sessionOptions);
app.use(flash());

// HTML Form submit - let express know to add the user submitted data onto our request object, so then we can access it from request.body
app.use(express.urlencoded({ extended: false }));
// Let express know about sending Json data
app.use(express.json());

// Let express know we are using the public folder
app.use(express.static("public"));
// Set express views so it could know where to look for it (in the views folder),
// second argument is the name of the folder that has our views, in this case is "views"
app.set("views", "views");
// let express know which template system/engine we are using
app.set("view engine", "ejs");

// Let our app know to use that new router we set up
app.use("/", router);

module.exports = app;

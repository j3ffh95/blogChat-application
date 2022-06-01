const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const app = express();

// we need to create a few configuration options for sessions
let sessionOptions = session({
  secret: "JavaScript is so cool",
  // setting the store property so it can connect to mongodb
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  // maxAge is how long the cookie for a session should be valid before it expires,
  // its measured in milliseconds , one day before the cookie expires
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});

// Tell express to use sessionOptions and flash
app.use(sessionOptions);
app.use(flash());

// app.use is telling Express to run this function for every request.
// And because we are including this before our router, this means this will run first
app.use(function (req, res, next) {
  // the locals object will be able from within our ejs templates
  res.locals.user = req.session.user;
  // Since we are calling next(), Express will move on to run the actual relevant functions for a particular route
  next();
});

const router = require("./router");
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

const User = require("../models/User");

exports.mustBeLoggedIn = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.flash("errors", "You must be logged in to perform that action");
    req.session.save(function () {
      res.redirect("/");
    });
  }
};

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      // setting up the user object to the session object, giving it a avatar, username and id property
      req.session.user = {
        avatar: user.avatar,
        username: user.data.username,
        _id: user.data._id,
      };
      // manually save the session with the save() method
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch(function (error) {
      req.flash("errors", error);
      // manually save the session with the save() method
      req.session.save(function () {
        res.redirect("/");
      });
    });
};

exports.logout = function (req, res) {
  // destroy session in mongodb
  req.session.destroy(function () {
    res.redirect("/");
  });
};

exports.register = function (req, res) {
  let user = new User(req.body);
  // console.log(user)
  user
    .register()
    .then(() => {
      req.session.user = {
        username: user.data.username,
        avatar: user.avatar,
        _id: user.data._id,
      };
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch(regErrors => {
      regErrors.forEach(function (error) {
        req.flash("regErrors", error);
      });
      req.session.save(function () {
        res.redirect("/");
      });
    });
};
exports.home = function (req, res) {
  // when we get a get request to the home page we need to check if the req.session.user exist or not
  if (req.session.user) {
    // the second arg in the render method is what we want to pass on the ejs template
    res.render("home-dashboard");
  } else {
    res.render("home-guest", {
      errors: req.flash("errors"),
      regErrors: req.flash("regErrors"),
    });
  }
};

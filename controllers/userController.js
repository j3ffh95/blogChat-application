const User = require("../models/User");

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      req.session.user = { username: user.data.username };
      res.send(result);
    })
    .catch(function (error) {
      res.send(error);
    });
};
exports.logout = function () {};
exports.register = function (req, res) {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("Congrats there are no errors.");
  }
};
exports.home = function (req, res) {
  if (req.session.user) {
    res.send("welcome to the actual application!!!");
  } else {
    res.render("home-guest");
  }
};

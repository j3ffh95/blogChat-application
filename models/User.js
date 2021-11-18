const validator = require("validator");

// This is our constructor function (Blueprint)
let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }
  // Get rid of any bogus properties, make sure the data is the properties we need
  this.data = {
    username: this.data.username,
    email: this.data.email,
    password: this.data.password,
  };
};

User.prototype.validate = function () {
  // Validation for the fields if they are empty
  if (this.data.username == "") {
    this.errors.push("You must provide a username.");
  }
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push("Username can only contain letters and numbers.");
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must provide a valid email address.");
  }
  if (this.data.password == "") {
    this.errors.push("You must provide a password.");
  }
  // Validate the fields length
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push("Password must be at least 12 characters.");
  }
  if (this.data.password.length > 100) {
    this.errors.push("Password cannot exceed 100 characters");
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push("username must be at least 3 characters.");
  }
  if (this.data.username.length > 30) {
    this.errors.push("username cannot exceed 30 characters");
  }
};

User.prototype.register = function () {
  // call the clean up function to make sure the fields are strings.
  this.cleanUp();
  // Step 1: Validate user data
  this.validate();
  // Step 2: Only if there are no vaildation errors then save the user data into a database
};

module.exports = User;

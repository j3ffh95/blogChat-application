// This is our constructor function (Blueprint)
let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.validate = function () {
  // Validation for the fields if they are empty
  if (this.data.username == "") {
    this.errors.push("You must provide a username.");
  }
  if (this.data.email == "") {
    this.errors.push("You must provide a valid email address.");
  }
  if (this.data.password == "") {
    this.errors.push("You must provide a password.");
  }
  // Validate the password length
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push("Password must be at least 12 characters.");
  }
  if (this.data.password.length > 100) {
    this.errors.push("Password cannot exceed 100 characters");
  }
};

User.prototype.register = function () {
  // Step 1: Validate user data
  this.validate();
  // Step 2: Only if there are no vaildation errors then save the user data into a database
};

module.exports = User;

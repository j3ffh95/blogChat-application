// This is our constructor function (Blueprint)
let User = function (data) {
  this.data = data;
};

User.prototype.register = function () {
  // Step 1: Validate user data
  // Step 2: Only if there are no vaildation errors then save the user data into a database
};

module.exports = User;

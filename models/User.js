const bcrypt = require("bcryptjs");
const usersCollection = require("../db").db().collection("users");
const validator = require("validator");
const md5 = require('md5')

// This is our constructor function (Blueprint)
let User = function (data) {
  this.data = data;
  this.errors = [];
};

// This cleanUp func makes sure the input fields are type of strings
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
  // Get rid of any bogus properties, make sure the data is the properties we need by updating the data  object
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.validate = function() {
  return new Promise( async (resolve, reject) => {
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
    if (this.data.password.length > 50) {
      this.errors.push("Password cannot exceed 50 characters");
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("username must be at least 3 characters.");
    }
    if (this.data.username.length > 30) {
      this.errors.push("username cannot exceed 30 characters");
    }
  
    // Only if username is valid then check if the username is taken
    if(this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
      // check to see if the username is in the mondodb
      let usernameExists = await usersCollection.findOne({username: this.data.username});
      // console.log(this.data.username)
      if (usernameExists) {this.errors.push('That username is taken already.')}
    }
  
    // Only if email  is valid then check if the email is taken
    if(validator.isEmail(this.data.email)) {
      // check to see if the email is in the mondodb
      let emailExists = await usersCollection.findOne({email: this.data.email});
      if (emailExists) {this.errors.push('That email is taken already.')}
    }
    // call resolve to signify that this operation or promise has completed
    resolve()
  
  })
}

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    usersCollection
      .findOne({ username: this.data.username })
      .then(attemptedUser => {
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          this.data = attemptedUser
          this.getAvatar()
          resolve("Congrats!!!");
        } else {
          reject("Invalid username / password.");
        }
      })
      .catch(function () {
        reject("Please try again later.");
      });
  });
};

User.prototype.register = function() {
  return new Promise(async (resolve, reject) => {
    // call the clean up function to make sure the fields are strings.
    this.cleanUp();
    // Step 1: Validate user data
    await this.validate();
    // Step 2: Only if there are no validation errors then save the user data into a database
    if (!this.errors.length) {
      // Hash user password
      // First we have to generate a salt to start hashing the pw
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      // If there are no errors then CREATE(insertOne() method) a user in the users collection and pass through it the object of this.data
      await usersCollection.insertOne(this.data);
      // call the avatar function
      this.getAvatar()
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

User.prototype.getAvatar = function() {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}

module.exports = User;

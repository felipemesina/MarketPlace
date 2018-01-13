const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

//Email Length Validator
let emailLength = (email) => {
  if (!email) {
    return false;
  } else {
    if (email.length < 9 || email.length > 40) {
      return false;
    } else {
      return true;
    }
  }
};

//Valid Email Format
let validEmail = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regExp.test(email);
  }
};

//Validate Username Length
let usernameLength = (username) => {
  if (!username) {
    return false;
  } else {
    if (username.length < 3 || username.length > 15) {
      return false;
    } else {
      return true;
    }
  }
};

//Validate Username Characters
let validUsername = (username) => {
  if (!username) {
    return false;
  } else {
    const regExp = new RegExp (/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
};

//Validate Password Length
let passwordLengthValidator = (password) => {
  if (!password) {
    return false;
  } else {
    if (password.length < 8 || password.length > 40) {
      return false;
    } else {
      return true;
    }
  }
};

//Validate Password Character Requirements
let validPassword = (password) => {
  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d]).{8,40}$/);
    return regExp.test(password);
  }
};


const passwordValidator = [
  {
    validator: passwordLengthValidator, message: "Password must be between 8-40 characters long"
  },
  {
    validator: validPassword, message: "Password must contain a lowercase/uppercase letter and a number"
  }
]


const usernameValidator = [
  {
    validator: usernameLength, message: "Username must be between 3 and 15 characters"
  },
  {
    validator: validUsername, message: "Username may only contain letters and numbers"
  }
];


const emailValidator = [
  {
    validator: emailLength, message: "Email must be at least 9 characters but less than 40"
  },
  {
    validator: validEmail, message: "Must be a valid email"
  }
];


//UserSchema
let UserSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true, validate: usernameValidator },
  email: { type: String, require: true, unique: true, trim: true, validate: emailValidator },
  password: { type: String, require: true, validate: passwordValidator }

});

//authenticate input against database documents
UserSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({ username: username.toLowerCase() })
  .exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user){
      console.log("User not found")
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback(err);
      }
    })
  })
}

//hash password before saving to DB
UserSchema.pre('save', function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

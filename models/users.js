const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

//UserSchema
let UserSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true, trim: true },
  password: { type: String, require: true }

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

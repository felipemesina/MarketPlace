const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = {
  create: function(req, res) {
    if (req.body.username &&
        req.body.email &&
        req.body.password ) {
          //create object with form input
          let user = new User({
            username: req.body.username.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: req.body.password
          });
          //insert User to mongodb
          user.save((err) => {
            if (err) {
              if (err.code === 11000) {
                res.json({ success: false, msg: "Username or email already exists" });
              } else {
                console.log(err);
                if (err.errors) {
                  if (err.errors.email) {
                    res.json({ success: false, msg: err.errors.email.message });
                  } else {
                    if (err.errors.username) {
                      res.json({ success: false, msg: err.errors.username.message });
                    } else {
                      if (err.errors.password) {
                        res.json({ success: false, msg: err.errors.password.message });
                      } else {
                        res.json({ success: false, msg: err });
                      }
                    }
                  }
                } else {
                  res.json({ success: false, msg: "Something went wrong. Error: ",
                  err });
                }
              }
            } else {
              res.json({success: true, msg: "User registered"});
            }
          })
        } else {
        res.json({success: false, msg: "All fields required"})
      }
  },
  authenticate: function(req, res) {
    if (req.body.username && req.body.password) {
      User.authenticate(req.body.username, req.body.password, function (err, user) {
        if (err || !user) {
          res.json({sucess: false, msg: "Wrong email and/or password"});
        } else {
          req.session.userId = user._id;
          User.findById(req.session.userId)
          .exec( function(err, user) {
            if (err){
              console.log(err);
            } else {
              console.log("succeess! you are logged in!")
              res.json({success: true, msg: "You are logged in"});
            }
          })
        }
      });
    } else {
      res.json({success: false, message: "Username and Password are required"})
    }
  },
  logout: function(req, res){
    if (req.session){
      req.session.destroy(function(err) {
        if(err){
          console.log(err);
        } else {
          res.json({success: true, msg: "Logged out"})
        }
      })
    }
  },
  index: function(req, res) {
    if (!req.session.userId) {
      res.json({success: false})
    } else {
    let user = User.findById(req.session.userId)
    .exec( function(err, user) {
      if (err){
        console.log(err);
      } else {
        res.json({success: true, user: user.username});
      }
    })
  }
}
}

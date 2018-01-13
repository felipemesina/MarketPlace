//dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const router = express.Router();
const config = require("./config/mongoose_setup");
const authentication = require("./config/routes/authentication")(router);

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err) {
    console.log("Server Error: ", err)
  } else {
    console.log("Connected to database: " + config.uri);
  }
});

// const MongoStore = require('connect-mongo')(session);

//Static Folder
app.use(express.static(path.join(__dirname + "/public/dist")));

//use sessions for tracking logins
app.use(session ( {
  secret: "you shall not pass!",
  resave: true,
  saveUninitialized: false,
  // store: new MongoStore({ url: 'mongodb://localhost/marketdb' })
}));


//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/authentication', authentication);


//no matching routes
router.get("*", (req,res) => {
  res.sendfile(path.join(__dirname + "/public/dist/index.html"));
});

//Server Listening at 4200
app.listen(4200, () => console.log("server running on 4200"));

//dependencies
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const router = express.Router();
const setUp = require("./config/mongoose_setup.js");
const appRoutes = require("./config/routes")(router);


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
app.use('', appRoutes);



//Server Listening at 4200
app.listen(4200, () => console.log("server running on 4200"));

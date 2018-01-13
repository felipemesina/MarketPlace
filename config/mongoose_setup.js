//Mongo DB
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports = {
  uri: "mongodb://localhost:27017/marketdb",
  secret: crypto,
  db: 'marketdb'
};




const models_path = path.join(__dirname, "/../models");
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf(".js") > 0) {
    require(models_path + "/" + file);
  }
})

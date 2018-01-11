//Mongo DB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/marketdb");

const fs = require("fs");
const path = require("path");

const models_path = path.join(__dirname, "/../models");
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf(".js") > 0) {
    require(models_path + "/" + file);
  }
})

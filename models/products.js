const mongoose = require("mongoose");


let ProductSchema = new mongoose.Schema({
  title: { type: String, require: true },
  desc: { type: String, require: true },
  price: { type: Number },
  location: { type: String, require: true },
  image: { type: String }
});
mongoose.model("Product", ProductSchema);

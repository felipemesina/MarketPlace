const mongoose = require("mongoose");
const Product = mongoose.model("Product");

module.exports = {
  home: function(req, res) {
    return res.render("index")
  },
  index: function(req, res) {
    let products = Product.find({}, (err, products) => {
      return res.json(products);
    });
  },
  create: function(req, res) {
    let product = new Product({ title: req.body.title, desc: req.body.desc, price: req.body.price, location: req.body.location, image: req.body.image });
    product.save(function (err) {
      if (err){
        console.log(err)
      } else {
        res.redirect("/products");
      }
    });
  }
}

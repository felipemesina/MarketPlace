//**** Controllers ****
const usersController = require("../../controllers/users");
const productsController = require("../../controllers/products");
const jwt = require('jsonwebtoken');

module.exports = (router) => {

  //home page
  router.get("/", productsController.index);

  //get all products
  router.get("/products", productsController.index);

  //creat a listing
  router.post("/products", productsController.create);

  //create a user
  router.post("/register", usersController.create);

  //log in user
  router.post("/login", usersController.authenticate);

  //get log in route
  router.get("/login", usersController.login);

  //logout user
  router.get("/logout", usersController.logout);

  //get profile
  router.get("/profile", usersController.authenticate);


  return router;
}

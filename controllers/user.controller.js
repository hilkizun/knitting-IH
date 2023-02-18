const Product = require("../models/Product.model");
const User = require("../models/User.model");

module.exports.profile = (req, res, next) => {
  res.render("user/profile");
};


module.exports.products = (req, res, next) => {
  //res.render('product/all-products');
  Product.find()

    .then((products) => {
      res.render("product/all-products", { products });
    })
    .catch((err) => next(err));
};

module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)

    .then((user) => {
      res.render("user/edit-profile", { user });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
  console.log("vista", req.params.id, req.body)
  User.findByIdAndUpdate(req.params.id, req.body)

    .then((user) => {
      res.redirect(`/profile/${user.id}/edit`);
    })
    .catch((err) => next(err));
};

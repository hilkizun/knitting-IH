const Product = require('../models/Product.model')

module.exports.profile = (req, res, next) => {
  res.render('user/profile')
}

module.exports.products = (req, res, next) => {
    //res.render('product/all-products');
    Product.find()
  
    .then(products => {
      res.render('product/all-products', { products });
    })
    .catch(err => next(err))
  
  }
const Product = require('../models/Product.model')
const User = require('../models/User.model')

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

  module.exports.edit = (req, res, next) => {
    console.log(req.params)
    // User.findbyId(req.params.userId)
    // .then(user => {
    //   res.render('user/edit-profile', {user})
    // })
    // .catch()
    
  }
  
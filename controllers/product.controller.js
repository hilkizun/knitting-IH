const Product = require('../models/Product.model')
const mongoose = require('mongoose')

module.exports.create = (req, res, next) => {
    res.render('product/form-product')
}

module.exports.doCreate = (req, res, next) => {
    const newProduct = {
        ...req.body,
        user:req.user.id
    }

    Product.create(newProduct)
        .then(product => {
            res.redirect('/products')
        })
        .catch(err => {
            if (mongoose.Error.ValidationError) {
              res.render('product/form-products', { product: req.body.body, errors: err.errors })
            }
            next(err)
          })
}

module.exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect('/products')
      })
      .catch(err => next(err))
  }

module.exports.detail = (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => {
        res.render('product/product-detail', { product })
    })
    .catch(err => console.error(err))
}
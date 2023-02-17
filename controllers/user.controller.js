const Product = require('../models/Product.model')
const Like = require('../models/Like.model')

module.exports.profile = (req, res, next) => {
  res.render('user/profile')
}

module.exports.products = (req, res, next) => {
    //res.render('product/all-products');
    Product.find()
      .populate('user')
      .populate('likes')
      .then(products => {
      res.render('product/all-products', { products });
    })
    .catch(err => next(err))  
  }

  module.exports.like = (req, res, next) => {
    const user = req.user.id;
    const product = req.params.id;
  
    const like = {
      user,
      product
    };
  
    Like.findOne({ user, product })
      .then(dbLike => {
        if (dbLike) {
          return Like.findByIdAndDelete(dbLike.id) 
            .then((createdLike) => {
              res.status(204).json({ like: createdLike })
            })
        } else {
          return Like.create(like)
            .then(() => {
              res.status(201).json({ ok: true })
            })
        }
      })
      .catch(err => next(err))
  }
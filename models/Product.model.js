const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      },
      productName: {
        type: String,
        required : [true, 'Product name is required'],
      },
      description: {
        type: String,
        required : [true, 'Product description is required'],
      },
      image: {
        type: String
      },
      pattern: {
        type: {
          name: String,
          price: Number
        }
      },
      videoTutorial: {
        type: {
          name: String,
          price: Number
        }
      },
      kit: {
        type: {
          name: String,
          price: Number
        }
      },
      productCreated: {
        type: {
          name: String,
          price: Number
        }
      }
    },
    {
      timestamps: true,
    }
  );
  
productSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'product',
    localField: '_id',
    justOne: false
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
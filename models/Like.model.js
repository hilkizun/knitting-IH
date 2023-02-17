const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'No puedes dar like si no estás registrado']
      },
      product: {
        type:mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
    {
      timestamps: true,
      toObject: {
        virtual: true
      }
    }
  );

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'No puedes dar like si no estás registrado']
      },
      product: {
        type:mongoose.type.ObjectId,
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

const like = mongoose.model('like', likeSchema);

module.exports = like;
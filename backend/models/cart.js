const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientUser',
    required: true
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'About',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      totalPrice: {
        type: Number
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartItemSchema);

module.exports = Cart;
const express = require('express');
const app = express();

// Bring in Models & Utils
const Cart = require('../models/cart');
const Product = require('../models/card');

app.post('/addCart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }

    const existingCartItem = cart.cartItems.find(item => item.product.equals(productId));

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice = product.price * existingCartItem.quantity;
    } else {
      cart.cartItems.push({
        product: productId,
        quantity,
        totalPrice: product.price * quantity
      });
    }


    await cart.save();
    console.log('Item added to cart successfully');
    return res.status(201).json(cart);
  } catch (error) {
    console.log('Internal Server Error', error);
    return res.status(500).send('Internal Server Error');
  }
});
// Cart
app.get('/cart', async (req, res) => {
  try {
    const { userId } = req.query;
    const cartItems = await Cart.find({ user: userId }).populate(
      {
        path: 'cartItems.product',
        select: 'card_name price card_image card_description quantity',
      }).select('-_id cartItems');
    console.log('Cart Items:', cartItems);
    return res.status(200).send(cartItems);
  } catch (error) {
    console.log('Error fetching cart items:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;
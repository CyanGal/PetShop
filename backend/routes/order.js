const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/clientUser');

// EMAIL CONFIGURATION 
const config = {
  service: "gmail",
  auth: {
      user: "purrfectpets32@gmail.com",
      pass: "btym sgub xmbm dkjk",
  },
};

const send = (emailData) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(emailData, (err, info) => {
      if (err) {
          console.log(err);
      } else {
          return info.response;
      }
  });
};
//Order
app.post('/createOrder', async (req, res) => {
  try {
    const { userId, cartItems, shippingAddress } = req.body;
    const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    const order = new Order({
      user: userId,
      items: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        totalPrice: item.totalPrice
      })),
      total: totalPrice,
      shippingAddress: shippingAddress,
    });
    await order.save();
    await Cart.findOneAndDelete({ user: userId });
    console.log('Order created successfully');
   
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).send("User not found");
    }
    // SEND EMAIL AFTER ORDER IS SUCCESSFUL
    const emailData = {
      "from": "purrfectpets32@gmail.com",
      "to": user.email,
      "subject": "Order successful!",
      "text": "We are glad to inform you that your order was successful and will be sent your way very soon.\nThank you so much for shopping with us!\n We hope you enjoyed our little shop!",
  }

  send(emailData);
  return res.status(201).json(order);
  } catch (error) {
    console.log('Internal Server Error', error);
    return res.status(500).send('Internal Server Error');
  }
});
app.post("/api/email", async (req, res) => {
  const { from, to, subject, text } = req.body;
  const emailData = { from, to, subject, text };
  const r = await nodemailer.send(emailData);
  res.send(r);
});
module.exports = app;
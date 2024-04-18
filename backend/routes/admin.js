const mongoose = require("mongoose");
const express = require('express');
const attendeeModel = require('../models/admin');
const jwt = require('jsonwebtoken');
const secret = 'asdfe45we45w3cfgbhjml,ikmujhytgvrfcdxcfvgbhyjnmuk';
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const app = express();
app.use(cookieParser());
app.use(express.json());

// Register
app.post('/adminRegister', async (req, res) => {
  const adminData = req.body
  try {
    let admin = await attendeeModel.findOne({ email: adminData.email }).exec()
    if (admin) {
      return res.status(400).send("This admin exist")
    } else {
      let newAdmin = new attendeeModel({
        username: adminData.username,
        email: adminData.email,
        password: bcrypt.hashSync(adminData.password, salt),
      })
      await newAdmin.save()
      return res.status(200).send('Admin Created ' + newAdmin)
    }
  } catch (err) {
    res.status(500).send('Something is wrong ' + err)
  }
})
// Login
app.post('/adminLogin', async (req, res) => {
  const adminData = req.body;

  const findAdmin = await attendeeModel.findOne({ email: adminData.email }).exec();
  try {
    if (findAdmin) {
      const passOk = bcrypt.compareSync(adminData.password, findAdmin.password);
      if (passOk) {
        jwt.sign({ email: findAdmin.email, id: findAdmin._id }, secret, {}, (err, token) => {
          if (err) {
            console.error('Error generating token:', err);
            res.status(500).send("Something is wrong");
          } else {
            console.log('Generated token:', token);
            res.cookie('token', token, { httpOnly: true }).json({
              id: findAdmin._id,
              email: findAdmin.email
            });
          }
        });
      } else {
        res.status(400).send('Invalid credentials');
      }
    } else {
      res.status(404).send('Admin not found');
    }
  } catch (err) {
    res.status(500).send("Something is wrong " + err);
  }
});
// Admin
app.get('/admin', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).send('Unauthorized Admin');
    }
    res.json(info);
  });
});

// Logout 
app.post('/logout', (req, res) => {
  console.log('Logout request received');
  res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json('ok');
});
module.exports = app
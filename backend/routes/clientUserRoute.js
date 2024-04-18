const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const secret = 'asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf';
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const userModel = require('../models/clientUser')
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
 
// EMAIL CONFIGURATION 
const config = {
    service: "gmail",
    auth: {
        user: "purrfectpets32@gmail.com",
        pass: "btym sgub xmbm dkjk",
    },
};

const send = (data) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            return info.response;
        }
    });
};
// SIGN UP FUNCTION
app.post('/signup', async (req, res) => {

    const userInfo = req.body
    try {
        if (userInfo.name == "" && userInfo.surname == "") {
            return (
                res.status(404).send("Field are empty")
            )
        }
        if (userInfo.password.length < 8) {
            return (
                res.status(404).send("Short password")
            )
        }
        let foundUser = await userModel.findOne({ email: userInfo.email }).exec()

        if (foundUser) {

            return res.status(400).send("This user exist")
        } else {

            let newUser = new userModel({
                name: userInfo.name,
                surname: userInfo.surname,
                email: userInfo.email,
                password: bcrypt.hashSync(userInfo.password, salt),
            })

            await newUser.save()

            // SEND EMAIL AFTER REGISTERING ON THE PAGE
            const data = {
                "from": "purrfectpets32@gmail.com",
                "to": newUser.email,
                "subject": "Welcome to our website!",
                "text": "Thank you for signing up in our website!\nPlease log in to continue exploring our products and finding the ones to your liking!",
            }

            send(data);

            return res.status(200).send(newUser)
        }

    } catch (err) {

        res.status(500).send('Something is wrong')
    }
})

app.post("/api/email", async (req, res) => {
    const { from, to, subject, text } = req.body;
    const data = { from, to, subject, text };
    const r = await nodemailer.send(data);
    res.send(r);
});

// LOG IN FUNCTION
app.post('/login', async (req, res) => {

    const userData = req.body;
    const findUser = await userModel.findOne({ email: userData.email }).exec();
    try {

        if (findUser) {

            const passOk = bcrypt.compareSync(userData.password, findUser.password);

            if (passOk) {

                jwt.sign({ email: findUser.email, id: findUser._id }, secret, {}, (err, token) => {

                    if (err) {
                        console.error('Error generating token:', err);
                        res.status(500).send("Something is wrong");
                    } else {

                        console.log('Generated token:', token);

                        res.cookie('token', token, { httpOnly: true }).json({
                            id: findUser._id,
                            email: findUser.email
                        });
                    }
                });
            } else {
                res.status(400).send('Invalid credentials');
            }
        } else {

            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send("Something is wrong " + err);
    }
});


app.get('/user', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        res.json(info);
    });
});
app.post('/logout', (req, res) => {

    res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json('ok');
})

module.exports = app
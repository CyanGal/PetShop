const express = require('express');
const categoryModel = require('../models/category');

const app = express();

app.post('/createCat', async (req, res) => {
    try {
        const newCat = new categoryModel(req.body);
        await newCat.save();
        console.log(newCat);
        res.status(200).send(newCat);
    } catch (err) {
        console.log(err)
        res.status(500).send("Not created " + err);
    }
});
app.get('/readCat', async (req, res) => {
    try {
        const allCat = await categoryModel.find({});
        res.status(200).send(allCat);
    } catch (err) {
        console.log(err)
        res.status(500).send("Not created " + err);
    }
});

module.exports = app;
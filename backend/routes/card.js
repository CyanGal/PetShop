const express = require("express");
const cardModel = require("../models/card");
const categoryModel = require("../models/category");
const app = express();

// Create => post
app.post('/create', async (req, res) => {
    try {
        const adminId = req.body.adminId;
        const { card_category, ...cardData } = req.body; 

        let category;

        // Check if the category already exists
        const existingCategory = await categoryModel.findOne({ category_name: card_category });

        if (existingCategory) {
            category = existingCategory;
        } else {
            // Create a new category if it doesn't exist
            category = new categoryModel({ category_name: card_category });
            await category.save();
        }

        // Create a new card and associate it with the category
        const newCard = new cardModel({ ...cardData, card_category: category._id, adminCard: adminId, });
        await newCard.save();

        res.status(200).send(newCard);
    } catch (err) {
        res.status(500).send("Not created " + err);
    }
});
// Read - All => get
app.get('/readAll', async (req, res) => {
    try {
        const { category } = req.query;

        let query = {};

        // If category parameter is provided, filter by category
        if (category) {
            query = { card_category: category };
        }

        // Fetch data from the database
        const allCard = await cardModel.find(query).populate('card_category');

        // Send the data to the front end
        res.status(200).send(allCard);
    } catch (err) {
        res.status(500).send("Data are not read" + err);
    }
});

// Read - One => get (id)
app.get('/readOne/:id', async (req, res) => {
    try {
        const cardId = req.params.id
        // marr nga databaza
        const oneCard = await cardModel.findById({ _id: cardId })
        // kalim tek front end
        res.status(200).send(oneCard)
    } catch (err) {
        res.status(500).send("Info are not read" + err)
    }
})
// Update => put ose patch (id)
app.patch('/updateCard/:id', async (req, res) => {
    try {
        // marr nga DB me id, card e percaktuar
        const cardID = req.params.id
        // info te bera update nga input
        const cardUpdate = req.body
        // komunikimi- marrja, update dhe ruajtja e infove te ndryshuara-delete info e vjeter
        const cardUp = await cardModel.findByIdAndUpdate({ _id: cardID },
            { $set: cardUpdate }, { new: true })
        res.status(200).send(cardUp)
    } catch (err) {
        res.status(500).send("Item not updated " + err)
    }
})
// delete => delele (id)
app.delete('/delete/:id', async (req, res) => {
    try {
        const cardId = req.params.id
        // marr nga databaza
        await cardModel.deleteOne({ _id: cardId })
        // kalim tek front end
        res.status(200).send("Card deleted")
    } catch (err) {
        res.status(500).send("Info are not read" + err)
    }
})
module.exports = app;

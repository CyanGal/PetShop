const express = require('express');
const cardSearch = require('../models/card');
const app = express();

app.use(express.json());

app.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      console.log("This is query:" + query)
      console.log("This is not query:" + !query)
    }
    // card_name ishte boshe per cdo element
    const results = await cardSearch.find({ card_description: { $regex: new RegExp(query, 'i') } });
    console.log(results);
    res.status(200).send({ results });
  } catch (error) {
    console.error(err);
    res.status(500).send({ err: 'Internal Server Error' });
  }
});

module.exports = app;
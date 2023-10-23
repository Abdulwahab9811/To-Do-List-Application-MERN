const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { MongoClient } = require('mongodb');
require('dotenv').config(); 

const uri = process.env.MONGO_URI;


const app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


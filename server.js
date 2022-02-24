const express = require('express')
const app = express()
require("dotenv").config();
mongoose = require('mongoose')
const port = process.env.PORT || 3000
const studentRoutes = require('./routes/students')
const {MongoClient} = require('mongodb');

const client = new MongoClient(process.env.DATABASE);

mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });
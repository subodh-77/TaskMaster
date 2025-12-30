const express = require('express');//handles url routing and request/response handling
const mongoose = require('mongoose');//mongoose is an ODM library for MongoDB and Node.js
const app = require('./app');
require('dotenv').config();


app.use(express.json());

// MongoDB connection //connect backend to database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))// on successful connection
.catch((err) => console.error(err));   // on connection error

//test route
app.get('/',(req,res)=>{
    res.send('API is running....');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


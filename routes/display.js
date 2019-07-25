const express = require('express');
const router = express.Router();

//gets metaphor model
const Metaphor = require('../models/metaphor');


router.get('/display',(req,res)=>{


res.json("working on display");

});
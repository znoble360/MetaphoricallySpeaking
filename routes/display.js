const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');

//const db = require('../config/keys').MongoURI;
//gets metaphor model
const Metaphor = require('../models/metaphor');


router.get('/display',(req,res,next)=>{
    var resultArray = [];
    Metaphor.find({}).exec(function (err, documents){
        if (err)throw err;
        else{ 
           res.send(documents);
    }
});
});

module.exports = router;
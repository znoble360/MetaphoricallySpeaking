//This module implements add-delete of posts

const express = require('express');
const router = express.Router();

//gets metaphor model
const Metaphor = require('../models/metaphor');


router.post('/add', (req,res,next)=>{

    passport.authenticate('local',{

        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true

    })(req,res,next);
});


module.exports = router;

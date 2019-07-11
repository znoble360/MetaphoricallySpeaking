const express = require('express');
const router = express.Router();


router.get('/login', (req,res)=>res.render('login'));


router.get('/register', (req,res)=>res.render('register'));


//register handle
router.post('/register', (req,res,next)=>{

    const {name,email,password, password2} = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){

        errors.push({msg: "fill in all fields"});
    }

    //check to see if passwords match

    if(password !== password2){

        errors.push({msg: "passwords do not match"});
    }
    
});

module.exports = router;
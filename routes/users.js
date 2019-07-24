const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');
//user model
const User = require('../models/user');

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

        errors.push({msg: "Passwords do not match"});
    }
    if(password.length < 6){

        errors.push({msg: 'Passwords should be at least 6 characters'});

    }

    if(errors.length > 0 ){


        res.render('register',{

            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        User.findOne({email : email})
        .then(user => {
            if(user){
                //user exists
                errors.push({msg: 'User is already registered'});
                res.render('register',{

                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else{

                const newUser  = new User({
                    name: name,
                    email: email,
                    password: password

                });
                
       
                //Hash Password
                bcrypt.genSalt(10, (err ,salt)=>
                 bcrypt.hash(newUser.password, salt,(err, hash)=> {

                    if(err) throw err;
                    //password hashed
                    newUser.password = hash;

                    //save user
                    newUser.save()
                    .then(user =>{
                        console.log("yes");
                        req.flash('success_msg', 'You have successfully created an account');
                        res.redirect('./login');
                    })
                    .catch(err => console.log(err));
                 })
                 )
            }   
        });
    
    }
});

//Login handle

router.post('/login', (req,res,next)=>{

    passport.authenticate('local',{

        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true

    })(req,res,next);
});

//logout 
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;
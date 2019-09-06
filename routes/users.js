const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const bcrypt = require('bcryptjs');
const passport = require('passport');
//user model
const User = require('../models/user');
const Metaphor = require('../models/metaphor');

router.get('/login', (req,res)=>res.render('login', {
    page: "login"
}));


router.get('/register', (req,res)=>res.render('register', {
    page: "register"
}));


//register handle
router.post('/register', (req,res,next)=>{

    const {name, username, email, password, password2} = req.body;
    let errors = [];

    if(!name || !username || !email || !password || !password2){

        errors.push({msg: "Please fill in all fields"});
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
            username,
            email,
            password,
            password2,
            page: "register"
        });
    }
    else{
        User.findOne({email : email}).then(user => {
            if(user){
                //user exists
                errors.push({msg: 'Email is already registered'});
                res.render('register',{

                    errors,
                    name,
                    username,
                    email,
                    password,
                    password2,
                    page: "register"
                });
            }
            else{

                User.findOne({username : username}).then(user => {
                    if(user){
                        //user exists
                        errors.push({msg: 'Username is already registered'});
                        res.render('register',{
                            errors,
                            name,
                            username,
                            email,
                            password,
                            password2,
                            page: "register"
                        });
                    } else {

                        const newUser  = new User({
                            name: name,
                            username: username,
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
                                    
                                    req.flash('success_msg', 'You have successfully created an account');
                                    res.redirect('./login');
                                }).catch(err => console.log(err));
                            })
                        );
                    }
                });
            }   
        });
    
    }
});

router.put('/edit',(ensureAuthenticated), (req,res) => {
    const {name, username, email} = req.body;

    console.log(req.user._id);
    console.log("old name: " + req.user.name);
    console.log("old username: " + req.user.username);
    console.log("old email: " + req.user.email);
    console.log("new name: " + req.body.name);
    console.log("new username: " + req.body.username);
    console.log("new email: " + req.body.email);

    User.findOne({email: req.body.email}).then( (user) => {
        if(user && user.email != req.user.email){
            //email exists
            res.send({success: false, error: "Email"});
        } else {
            User.findOne({username: req.body.username}).then( (user) => {
                if(user && user.username != req.user.username){
                    //username exists
                    res.send({success: false, error: "Username"});
                } else {
                    User.updateOne({_id: req.user._id}, {name: req.body.name, username: req.body.username, email: req.body.email}, (error) => {
                        if (error) {
                            res.send({success: false, error: "Error"});
                        } else {
                            res.send({success: true, error: ""});
                        }
                    });
                }
            });
        }
    });
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
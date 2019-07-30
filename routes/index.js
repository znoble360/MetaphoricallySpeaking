const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Metaphor = require('../models/metaphor');
const temp = "5d2e39fbd4ffb0000462dfcd";

//finds all the metaphors in the database
var getMetaphors = function(query, sort) {
    return new Promise(function(resolve, reject) {
        Metaphor.find(query).sort(sort).exec(function (err, documents){
            if (err)throw err;
            else{ 
               resolve(documents);
            }
        });
    });
}

//welcome page
router.get('/', (req,res)=> {
    getMetaphors(null, {likeCount : -1}).then(function(metaphors) {
        res.render("welcome", {
            page: "welcome",
            id: null,
            name: null,
            username: null,
            email: null,
            metaphor: metaphors
        });
    });
});

router.get('/please-log-in', (req,res)=> {
    req.flash('success_msg', 'You must be logged in to do that.');
    res.redirect("/");
});


router.get('/dashboard',(ensureAuthenticated), (req,res)=> {
    getMetaphors(null, {likeCount : -1}).then(function(metaphors) {
        res.render("dashboard", {
            page: "dashboard",
            name: req.user.name,
            username: req.user.username,
            id: req.user._id.toHexString(),
            email: req.user.email,
            metaphor: metaphors
        });
    });  
});

router.get('/myprofile', (ensureAuthenticated), (req,res)=> {
    getMetaphors({authorID: req.user._id}, {time : -1}).then(function(metaphors) {
        res.render("myprofile", {
            page: "myprofile",
            name: req.user.name,
            username: req.user.username,
            id: req.user._id.toHexString(),
            email: req.user.email,
            metaphor: metaphors,
            display: "posts"
        });
    });
});

router.get('/myprofile/likes', (ensureAuthenticated), (req,res)=> {

    
    getMetaphors({likedBy: req.user._id}, {time : -1}).then(function(metaphors) {
        res.render("myprofile", {
            page: "myprofile",
            name: req.user.name,
            username: req.user.username,
            id: req.user._id.toHexString(),
            email: req.user.email,
            metaphor: metaphors,
            display: "likes"
        });
    });
});


module.exports = router;
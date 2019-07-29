const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Metaphor = require('../models/metaphor');
const temp = "5d2e39fbd4ffb0000462dfcd";

//finds all the metaphors in the database
var getMetaphors = new Promise(function(resolve, reject) {
    Metaphor.find({}).exec(function (err, documents){
        if (err)throw err;
        else{ 
           resolve(documents);
        }
    });
});

//temporary variables for testing
const metaphor1 = {
    _id: "000",
    text: "It's raining cats and dogs.",
    explanation: "It is raining hard.",
    author: "metaphor_guy",
    authorID: "xxx",
    likeCount: "130",
    dislikeCount: "14",
    time: "3 days ago"
}

const metaphor2 = {
    _id: "111",
    text: "Cry me a river.",
    explanation: "You are overreacting.",
    author: "metaknight1337",
    authorID: temp,
    likeCount: "2043",
    dislikeCount: "50",
    time: "12/2/18 at 11:30"
}

const metaphors2 = [metaphor1, metaphor2];

//welcome page
router.get('/', (req,res)=> {
    getMetaphors.then(function(metaphors) {
        res.render("welcome", {
            page: "welcome",
            id: null,
            name: null,
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
    console.log("before");
    getMetaphors.then(function(metaphors) {
        console.log("after");
        res.render("dashboard", {
            page: "dashboard",
            name: req.user.name,
            id: req.user._id,
            email: req.user.email,
            metaphor: metaphors
        });
    });  
});

router.get('/myprofile', (ensureAuthenticated), (req,res)=> {

    console.log("myprof id: " + req.user._id);

    res.render("myprofile", {
    page: "myprofile",
    name: req.user.name,
    id: req.user._id,
    email: req.user.email,
    metaphor: metaphors2,
    display: "posts"
})});

router.get('/myprofile/likes', (ensureAuthenticated), (req,res)=> {

    res.render("myprofile", {
    page: "myprofile",
    name: req.user.name,
    id: req.user._id,
    email: req.user.email,
    metaphor: metaphors2,
    display: "likes"
})});


module.exports = router;
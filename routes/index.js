const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const temp = "5d2e39fbd4ffb0000462dfcd";

//temporary variables for testing
const metaphor1 = {
    _id: "000",
    text: "It's raining cats and dogs.",
    explanation: "It is raining hard.",
    author: "metaphor_guy",
    authorID: "xxx",
    likeCount: "130",
    dislikeCount: "14",
    time_string: "3 days ago"
}

const metaphor2 = {
    _id: "111",
    text: "Cry me a river.",
    explanation: "You are overreacting.",
    author: "metaknight1337",
    authorID: temp,
    likeCount: "2043",
    dislikeCount: "50",
    time_string: "12/2/18 at 11:30"
}

const metaphors2 = [metaphor1, metaphor2];

//welcome page
router.get('/', (req,res)=> res.render("welcome", {
    page: "welcome",
    id: null,
    name: null,
    email: null,
    metaphor: metaphors2
}));

router.get('/please-log-in', (req,res)=> {
    req.flash('success_msg', 'You must be logged in to do that.');
    res.redirect("/");
});


router.get('/dashboard',(ensureAuthenticated), (req,res)=> {

    console.log("dash id: " + req.user._id);

    res.render("dashboard", {
    page: "dashboard",
    name: req.user.name,
    id: req.user._id,
    email: req.user.email,
    metaphor: metaphors2
})});

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
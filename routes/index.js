const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
//welcome page
router.get('/', (req,res)=> res.render("welcome", {metaphor : 
    [{text : "It's raining cats and dogs.", explanation : "It is raining hard.", 
    author : "metaphor_guy", likeCount : "130", dislikeCount : "14", time_string : "3 days ago"}, 
    {text : "Cry me a river.", explanation : "You are overreacting.", author : "metaknight1337", 
    likeCount : "2043", dislikeCount : "50", time_string : "12/2/18 at 11:30"}]}));


router.get('/dashboard',(ensureAuthenticated), (req,res)=> 

res.render("dashboard", {
    name: req.user.name,
    id: req.user._id,
    metaphor : [{text : "It's raining cats and dogs.", 
    explanation : "It is raining hard.", author : "metaphor_guy", 
    likeCount : "130", dislikeCount : "14", time_string : "3 days ago"}, 
    {text : "Cry me a river.", explanation : "You are overreacting.", 
    author : "metaknight1337", likeCount : "2043", dislikeCount : "50", 
    time_string : "12/2/18 at 11:30"}]
}));




module.exports = router;
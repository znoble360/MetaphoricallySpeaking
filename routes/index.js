const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Metaphor = require('../models/metaphor');
const sortByNew = {time : -1};
const sortByLikes = {likeCount : -1};
var sortmethod = "default";

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
    var method;
    var sort = "Most Liked";

    if (sortmethod != "default")
    {
        sort = sortmethod;
        sortmethod = "default";
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }

    getMetaphors(null, method).then(function(metaphors) {
        res.render("welcome", {
            page: "welcome",
            id: null,
            name: null,
            username: null,
            email: null,
            metaphor: metaphors,
            sortmethod: sort
        });
    });
});

router.get('/please-log-in', (req,res)=> {
    req.flash('success_msg', 'You must be logged in to do that.');
    res.redirect("/");
});


router.get('/dashboard',(ensureAuthenticated), (req,res)=> {
    var method;
    var sort = "Most Liked";

    if (sortmethod != "default")
    {
        sort = sortmethod;
        sortmethod = "default";
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }

    getMetaphors(null, method).then(function(metaphors) {
        res.render("dashboard", {
            page: "dashboard",
            name: req.user.name,
            username: req.user.username,
            id: req.user._id.toHexString(),
            email: req.user.email,
            metaphor: metaphors,
            sortmethod: sort
        });
    });  
});

router.get('/myprofile', (ensureAuthenticated), (req,res)=> {
    var method;
    var sort = "Newest";

    if (sortmethod != "default")
    {
        sort = sortmethod;
        sortmethod = "default";
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }
    
    getMetaphors({authorID: req.user._id}, method).then(function(metaphors) {
        res.render("myprofile", {
            page: "myprofile",
            name: req.user.name,
            username: req.user.username,
            id: req.user._id.toHexString(),
            email: req.user.email,
            metaphor: metaphors,
            display: "posts",
            sortmethod: sort
        });
    });
});

router.get('/myprofile/likes', (ensureAuthenticated), (req,res)=> {
    var method;
    var sort = "Newest";

    if (sortmethod != "default")
    {
        sort = sortmethod;
        sortmethod = "default";
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }
    
    getMetaphors({likedBy: req.user._id}, method).then(function(metaphors) {
        res.render("myprofile", {
            page: "myprofilelikes",
            name: req.user.name,
            username: req.user.username,
            id: req.user._id.toHexString(),
            email: req.user.email,
            metaphor: metaphors,
            display: "likes",
            sortmethod: sort
        });
    });
});

router.put('/sort/:sortmethod', (req,res) => {
    console.log("sortmethod: " + req.params.sortmethod);
    sortmethod = req.params.sortmethod;

    res.send("Sort method updated to " + sortmethod);
});


module.exports = router;
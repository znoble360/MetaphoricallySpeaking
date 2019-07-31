const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Metaphor = require('../models/metaphor');
const User = require('../models/user');
const mongoose = require('mongoose');

const sortByNew = {time : -1};
const sortByLikes = {likeCount : -1};

//finds all the metaphors in the database
const getMetaphors = function(query, sort) {
    return new Promise(function(resolve, reject) {
        Metaphor.find(query).sort(sort).exec(function (err, documents){
            if (err)throw err;
            else{ 
               resolve(documents);
            }
        });
    });
}

const setClasses = function(metaphors, id) {
    metaphors.forEach( (meta) => {
        if (meta.likedBy.includes(id)) {
            meta.class = "metaphor-liked";
        } else if (meta.dislikedBy.includes(id)) {
            meta.class = "metaphor-disliked";
        } else {
            meta.class = "metaphor-default";
        }

        var timeElapsed = Date.now() - meta.time.getTime();
        var seconds = Math.floor(timeElapsed/1000);
        var minutes = Math.floor(timeElapsed/60000);
        var hours = Math.floor(timeElapsed/3600000);
        var days = Math.floor(timeElapsed/86400000);
        var weeks = Math.floor(timeElapsed/604800000);
        var months = Math.floor(timeElapsed/2592000000);
        var years = Math.floor(timeElapsed/31536000000);

        if (seconds < 1)
            meta.timestring = "Now";
        else if (seconds < 60)
            meta.timestring = seconds + "s";
        else if (minutes < 60)
            meta.timestring = minutes + "m";
        else if (hours < 24)
            meta.timestring = hours + "h";
        else if (days < 7)
            meta.timestring = days + "d";
        else if (days < 30)
            meta.timestring = weeks + "w";
        else if (days < 365)
            meta.timestring = months + " month" + (months == 1 ? "" : "s");
        else
            meta.timestring = years + " year";
    });
}

const getUser = function(search) {
    return new Promise(function(resolve, reject) {
        User.find({username: search}).exec(function (err, user) {
            if (err)throw err;
            else {
                resolve(user[0]);
            }
        });
    });
}

var sortmethod = "default";
var welcomeSort = "default";
var dashboardSort = "default";
var myprofileSort = "default";
var userSort = "default";

//welcome page
router.get('/', (req,res)=> {
    var method;
    var sort = "Most Liked";

    if (sortmethod != "default") {
        sort = sortmethod;
        welcomeSort = sortmethod;
        sortmethod = "default";
    } else if (welcomeSort != "default") {
        sort = welcomeSort;
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }

    getMetaphors(null, method).then(function(metaphors) {
        setClasses(metaphors, null);
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
    res.send("Please log in");

});

router.get('/empty-string', (req,res)=> {

    req.flash('success_msg', 'You didn\'t search for anything.');
    res.send("Please enter a valid search query.");

});


router.get('/dashboard',(ensureAuthenticated), (req,res)=> {
    var method;
    var sort = "Most Liked";

    if (sortmethod != "default") {
        sort = sortmethod;
        dashboardSort = sortmethod;
        sortmethod = "default";
    } else if (dashboardSort != "default") {
        sort = dashboardSort;
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }

    getMetaphors(null, method).then(function(metaphors) {
        setClasses(metaphors, req.user._id);
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

    if (sortmethod != "default") {
        sort = sortmethod;
        myprofileSort = sortmethod;
        sortmethod = "default";
    } else if (myprofileSort != "default") {
        sort = myprofileSort;
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }
    
    getMetaphors({authorID: req.user._id}, method).then(function(metaphors) {
        setClasses(metaphors, req.user._id);
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

    if (sortmethod != "default") {
        sort = sortmethod;
        myprofileSort = sortmethod;
        sortmethod = "default";
    } else if (myprofileSort != "default") {
        sort = myprofileSort;
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }
    
    getMetaphors({likedBy: req.user._id}, method).then(function(metaphors) {
        setClasses(metaphors, req.user._id);
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

router.get('/user/:username', (req,res)=> {

    if (req.isAuthenticated() && req.params.username == req.user.username)
    {
        res.redirect('/myprofile');
    }

    var method;
    var sort = "Newest";

    if (sortmethod != "default") {
        sort = sortmethod;
        userSort = sortmethod;
        sortmethod = "default";
    } else if (userSort != "default") {
        sort = userSort;
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }

    var username = req.params.username;
    
    //mongoose.Types.ObjectId(userid)

    getUser(username).then(function(user){
        getMetaphors({authorID: user._id}, method).then(function(metaphors) {
            if (req.isAuthenticated()) {
                setClasses(metaphors, req.user._id);
                res.render("user", {
                    page: "user",
    
                    name: req.user.name,
                    username: req.user.username,
                    id: req.user._id.toHexString(),
                    email: req.user.email,
    
                    user_name: user.name,
                    user_username: user.username,
                    user_id: user._id.toHexString(),
                    user_email: user.email,
    
                    metaphor: metaphors,
                    display: "posts",
                    sortmethod: sort
                });
            } else {
                setClasses(metaphors, null);
                res.render("user", {
                    page: "user",

                    name: null,
                    username: null,
                    id: null,
                    email: null,

                    user_name: user.name,
                    user_username: user.username,
                    user_id: user._id.toHexString(),
                    user_email: user.email,

                    metaphor: metaphors,
                    display: "posts",
                    sortmethod: sort
                });
            }
            
        });
    });
    
});

router.get('/user/:username/likes', (req,res)=> {

    if (req.isAuthenticated() && req.params.username == req.user.username)
    {
        res.redirect('/myprofile/likes');
    }

    var method;
    var sort = "Newest";

    if (sortmethod != "default") {
        sort = sortmethod;
        userSort = sortmethod;
        sortmethod = "default";
    } else if (userSort != "default") {
        sort = userSort;
    }

    if (sort == "Most Liked") {
        method = sortByLikes;
    } else if (sort == "Newest") {
        method = sortByNew;
    }

    var username = req.params.username;
    
    //mongoose.Types.ObjectId(userid)

    getUser(username).then(function(user){
        getMetaphors({likedBy: user._id}, method).then(function(metaphors) {
            if (req.isAuthenticated()) {
                setClasses(metaphors, req.user._id);
                res.render("user", {
                    page: "userlikes",
    
                    name: req.user.name,
                    username: req.user.username,
                    id: req.user._id.toHexString(),
                    email: req.user.email,
    
                    user_name: user.name,
                    user_username: user.username,
                    user_id: user._id.toHexString(),
                    user_email: user.email,
    
                    metaphor: metaphors,
                    display: "likes",
                    sortmethod: sort
                });
            } else {
                setClasses(metaphors, null);
                res.render("user", {
                    page: "userlikes",

                    name: null,
                    username: null,
                    id: null,
                    email: null,

                    user_name: user.name,
                    user_username: user.username,
                    user_id: user._id.toHexString(),
                    user_email: user.email,

                    metaphor: metaphors,
                    display: "likes",
                    sortmethod: sort
                });
            }
            
        });
    });
    
});

router.put('/sort/:sortmethod', (req,res) => {
    sortmethod = req.params.sortmethod;
    res.send("Sort method updated to " + sortmethod);
});


module.exports = router;
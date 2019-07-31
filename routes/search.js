//This function takes in a JSON request that has a field labled 'searchString'
//and it returns a JSON object with a field labled 'searchResults' that contains
//an array of metaphors.

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//gets metaphor model
const Metaphor = require('../models/metaphor');
const User = require('../models/user');
var sortmethod = "default";

const getAuthor = function(authorID) {
    return new Promise(function(resolve, reject) {
        User.findOne({_id: authorID}).then(function(user) {
            if (user) {
                resolve(user);
            } else {

            }
        });
    });
}

const setClasses = function(metaphors, id) {
    return new Promise(function(resolve, reject) {
        var i = 0;

        metaphors.forEach( (meta) => {
            getAuthor(meta.authorID).then(function(user){
                i++;
                meta.author = user.username;
                meta.class = "";

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

                if (i == metaphors.length)
                    resolve();
            });   
        });
    });
}

var search = function (request, response){
	//gets string from request
	const searchString = request.query.searchString;
	var returnArray = [];
	
	//gets all of the metaphors in database, puts them in an array, then does a function
	Metaphor.find({}).exec(function (err, documents){
		
		//goes through all of the metaphors. If a metaphor contains the search query,
		//it gets pushed to an array
		var i;
		
		for(i = 0; i < documents.length; i++){
			
			if (documents[i].text.includes(searchString)){
				returnArray.push(documents[i]);
			}
		}
		
		//sends a JSON object with the array of results.
		console.log("The return array for the search function is:" + returnArray);
		response.send({searchResults : returnArray});
	});
	
}

//A new and improved search function that should work in O(1) time, 
//because it directly queries what we need.

//It returns the results sorted by likes in descending order, and can also 
//find a metaphor by unique ID

betterSearch = function (request, response){
	//gets string from request
	const searchString = request.query.searchString;
	var sort = "Most Liked";
	var method;

	if (sortmethod != "default")
	{
		sort = sortmethod;
		sortmethod = "default";
	}
	
	if (sort == "Most Liked") {
		method = {likeCount : -1};
	} else if (sort == "Newest") {
		method = {time : -1};
	}
	
	var returnArray = [];
	
	//uses a regular expression shortcut to query exactly what we need, and saves it in an array
	//also specifies that the result must be sorted by likeCount
	Metaphor.find({text: {$regex: searchString, $options: "$i", } }).sort(method).exec(function (err, textResult){
		
		//sets the result of the query to a return variable
		if(textResult != null){
			returnArray = returnArray.concat(textResult);			
		}
	
		//if a post ID was input, it will find that and push it onto the return array
		Metaphor.find({_id: searchString}).sort(method).exec(function (err, metaIDResult){
			
			if(metaIDResult != null){
				returnArray = returnArray.concat(metaIDResult);
			}
			
			Metaphor.find({authorID: searchString}).sort(method).exec(function (err, authIDResult){
				
				if(authIDResult != null){
					returnArray = returnArray.concat(authIDResult);
				}
				
				Metaphor.find({author: searchString}).sort(method).exec(function (err,authorResult){
					
					if(authorResult != null){
						returnArray = returnArray.concat(authorResult);
					}
					
					// redirects to page with credentials if user is logged in					
					if (request.isAuthenticated()) {
						setClasses(returnArray, request.user._id).then(function(){
							response.render("searchresults", {
								page: "searchresults",
								search: searchString,
								name: request.user.name,
								id: request.user._id,
								email: request.user.email,
								username: request.user.username,
								metaphor: returnArray,
								sortmethod: sort
							});
						});
					} else {
						setClasses(returnArray, null).then(function(){
							response.render("searchresults", {
								page: "searchresults",
								search: searchString,
								name: null,
								id: null,
								email: null,
								username: null,
								metaphor: returnArray,
								sortmethod: sort
							});
						});
					}
				});
			});
		});
	});
}

//Basically the same thing as betterSearch, but returns a JSON object for the app
searchApp = function (request, response){
	//gets string from request
	const searchString = request.query.searchString;
	
	var returnArray = [];
	
	//uses a regular expression shortcut to query exactly what we need, and saves it in an array
	//also specifies that the result must be sorted by likeCount
	Metaphor.find({text: {$regex: searchString, $options: "$i", } }).sort({likeCount : -1}).exec(function (err, textResult){
		
		//sets the result of the query to a return variable
		if(textResult != null){
			returnArray = returnArray.concat(textResult);				
		}
	
		//if a post ID was input, it will find that and push it onto the return array
		Metaphor.find({_id: searchString}).exec(function (err, metaIDResult){
			
			if(metaIDResult != null){
				returnArray = returnArray.concat(metaIDResult);
			}
			
			//searches for the author by ID
			Metaphor.find({authorID: searchString}).exec(function (err, authIDResult){
				
				if(authIDResult != null){
					returnArray = returnArray.concat(authIDResult);
				}
				
				//searches for the author by name
				Metaphor.find({author: searchString}).exec(function (err,authorResult){
					
					if(authorResult != null){
						returnArray = returnArray.concat(authorResult);
					}
					
					//sends a json object with the results of the search
					response.send({searchResults : returnArray});
				
					
				});
			});
		});
	});
}

router.put('/sort/:sortmethod', (req,res) => {
    sortmethod = req.params.sortmethod;
    
    res.send("Sort method updated to " + sortmethod);
});

router.get('/search', betterSearch);

router.get('/searchApp', searchApp);

module.exports = router;

//This function takes in a JSON request that has a field labled 'searchString'
//and it returns a JSON object with a field labled 'searchResults' that contains
//an array of metaphors.

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//gets metaphor model
const Metaphor = require('../models/metaphor');


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
	
	var returnArray = [];
	
	//uses a regular expression shortcut to query exactly what we need, and saves it in an array
	//also specifies that the result must be sorted by likeCount
	Metaphor.find({text: {$regex: searchString, $options: "$i", } }).sort({likeCount : -1}).exec(function (err, documents){
		
		//sets the result of the query to a return variable

		returnArray.push(documents);
		
		//if a post ID was input, it will find that and push it onto the return array
		Metaphor.find({_id: searchString}).exec(function (err, documents2){
			if(documents2 != null){
				returnArray.push(documents2);
			}

			//sends a JSON object with the array of results, labeled searchResults.

			

			if (request.isAuthenticated()) {
				response.render("searchresults", {
					page: "searchresults",
					search: searchString,
					name: request.user.name,
					id: request.user._id,
					email: request.user.email,
					metaphor: returnArray[0]
				});
			} else {
				response.render("searchresults", {
					page: "searchresults",
					search: searchString,
					name: null,
					id: null,
					email: null,
					metaphor: returnArray[0]
				});
			}
		
		});
	});
}


router.get('/search', betterSearch);

module.exports = router;


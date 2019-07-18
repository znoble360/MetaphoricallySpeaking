//This function takes in a JSON request that has a field labled 'searchString'
//and it returns a JSON object with a field labled 'searchResults' that contains
//an array of metaphors.

const express = require('express');
const router = express.Router();

//gets metaphor model
const Metaphor = require('../models/metaphor');


var search = function (request, response){
	//gets string from request
	const {searchString} = request.body;
	var returnArray = [];
	
	//gets all of the metaphors in database, puts them in an array, then does a function
	Metaphor.find({}).toArray(function (err, documents){
		
		//goes through all of the metaphors. If a metaphor contains the search query,
		//it gets pushed to an array
		var i;
		for(i = 0; i < documents.length; i++){
			
			if (documents[i].text.includes(searchString)){
				returnArray.push(documents[i]);
			}
		}
	});
	
	//sends a JSON object with the array of results.
	response.send({searchResults : returnArray});
}


router.get('/search', search);

module.exports = router;

// CHEAT SHEET

// Objects...

// "property of an object"

// Example (output the "body" property of the "req" object):
// console.log( req.body );

// NOTES:

// --------------------------------------------------------------------------------------------------------------
// Node.js: is web server software

// HTTP Request: A message that some application sends to a web server.
// 				 The application sending the request expects a response.

// Web Server: An application that listens for HTTP requests and responds to them.


// You can send extra data with a request. The extra data is referred to as request data/parameters

// Example:
// When you want to create a new "metaphor" record in your database, you'll send all of the information
// about the metaphor with the request.

// HTTP requests have different "methods"...

// GET: is for "reading" from server.
// 		To send request parameters with GET, you put the data in the "query string"
// Query String: a list of key/value pairs at the end of the URL/address, after a '?'
// Example:
// localhost:3000/metaphors/add?text=its+raining+cats+and+dogs&explanation=its+raining+a+lot

// Keys:			Values:
// text				its raining cats and dogs
// explanation		its raining a lot

// POST: is for "creating" on the server

// --------------------------------------------------------------------------------------------------------------
// MongoDB: Database server software
// Mongoose: A module that makes using MongoDB easier. It lets you design "models", which are templates to create
// 			 an object that represents a record in your database.

// Example:
// If you want to start metaphors in your database, you'll have "records" that all have the same properties/fields
// You'll have many metaphor records that all have text and an explanation

/*
// You can make a model to represent a metaphor
let Metaphor = new mongoose.Schema( {
  text: { type: String },
  explanation: { type: String }
} );
*/


// --------------------------------------------------------------------------------------------------------------
// Postman (www.getpostman.com): An application for manually sending HTTP requests
// You can use it to simulate a user submitting a form on your website, with any method (GET, POST, etc..) and any request data


//This module implements add-delete of posts

const express = require('express');
const router = express.Router();

//gets metaphor model
const Metaphor = require('../models/metaphor');

// router.post (Creating)
// router.get (Read)
// router.put (Update)
// router.delete (Delete)

router.post('/add', (req,res,next)=>{

  	Metaphor.find( {}, "text explanation", function( error, records ){
      if( error ){
       	console.log( error );
      } else {
      	console.log( "All metaphors: ", records );
      }
    } );

    // The following code runs when a user sends an HTTP request to the /add route of your app using the POST method
    // TODO: Add a single record to the database with data from the request

  	// To get the data sent with the request, you must use...
    // body parameters: req.body
    // query string: req.query
    // route parameters: req.params

  	let metaphor = new Metaphor( {
    	text: req.body.text,
      	explanation: req.body.explanation
    } );

  	// After you create/get an object using the model, you must call the model's methods to actually interact with the database

  	metaphor.save( function( error ){
      // NOTE: This code runs after the saving is complete

      if( error ){
        console.log( error );
        res.send( error );
      } else {
        console.log( "Metaphor created successfully!" );
        res.send( "Metaphor created successfully!" );
      }

    } );

    /*
    passport.authenticate('local',{

        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true

    })(req,res,next);
    */
});


module.exports = router;

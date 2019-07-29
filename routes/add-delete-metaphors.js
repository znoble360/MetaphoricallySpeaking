
//This module implements add-delete of posts
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const user = require('../routes/users');
const user = require('../models/user');

//gets metaphor model
const Metaphor = require('../models/metaphor');

// Request Methods:
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
        explanation: req.body.explanation,
        authorID: req.user._id,
        author: req.user.name,
        likeCount: 0,
        dislikeCount: 0
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

// localhost:3000/delete/3
router.delete('/delete/:id', (req,res,next)=>{

  Metaphor.find( {}, "id text explanation", function( error, records ){
    if( error ){
      console.log( error );
    } else {
      console.log( "All metaphors: ", records );
    }
  } );

  // To get the data sent with the request, you must use...
  // body parameters: req.body
  // query string: req.query
  // route parameters: req.params

  console.log( "id: ", req.params.id );

  //              specify which metaphor to find
  //                      v
  // NOTE:
  // 1. The automatically generated metaphor id field is "_id", NOT just "id"
  // 2. In order to translate a plain number to an _id, you need to call ObjectId()
  Metaphor.deleteOne( { "_id": mongoose.Types.ObjectId(req.params.id) }, function( error ){
    if( error ){
      console.log( error );
      res.send( error );
    } else {
      console.log( "Deleting metaphor with id " + req.params.id );
      res.send( "Deleting metaphor with id " + req.params.id );
    }
  } );

});


module.exports = router;

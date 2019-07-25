//This module implements like/dislike of posts

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//gets metaphor model
const Metaphor = require('../models/metaphor');

// GET (Read)
// POST (Create)
// PUT (Update)
// DELETE (Delete)

// localhost:3000/metaphor/like/3/5
// NOTE: The user will request this route when they click a "Like" button
router.put('/like/:metaphorId/:userId', (req,res,next)=>{

  	Metaphor.find( { _id: req.params.metaphorId }, "text explanation likedBy dislikedBy", function( error, records ){
      if( error ){
       	console.log( error );
      } else {
        let metaphor = records[0];

        if( metaphor.likedBy.includes( mongoose.Types.ObjectId( req.params.userId ) ) == false ){
        	metaphor.likedBy.push( mongoose.Types.ObjectId( req.params.userId ) );
        }

        if( metaphor.dislikedBy.includes( mongoose.Types.ObjectId( req.params.userId ) ) == true ){
        	let index = metaphor.dislikedBy.indexOf( mongoose.Types.ObjectId( req.params.userId ) );
          	metaphor.dislikedBy.splice( index, 1 );
        }

        metaphor.save( function( error ){
          // NOTE: This code runs after the saving is complete

          Metaphor.find( { }, "text explanation likedBy dislikedBy", function( error, records ){
            if( error ){
              console.log( error );
            } else {
              console.log( "All Metaphors after liking: ", records );
            }
          });

          if( error ){
            console.log( error );
            res.send( error );
          } else {
            console.log( "Metaphor liked successfully!" );
            res.send( "Metaphor liked successfully!" );
          }

        } );
      }
    } );

});



// localhost:3000/metaphor/dislike/3/5
// NOTE: The user will request this route when they click a "Dislike" button
router.put('/dislike/:metaphorId/:userId', (req,res,next)=>{

  	Metaphor.find( { _id: req.params.metaphorId }, "text explanation likedBy dislikedBy", function( error, records ){
      if( error ){
       	console.log( error );
      } else {
        let metaphor = records[0];

        if( metaphor.dislikedBy.includes( mongoose.Types.ObjectId( req.params.userId ) ) == false ){
        	metaphor.dislikedBy.push( mongoose.Types.ObjectId( req.params.userId ) );
        }

        if( metaphor.likedBy.includes( mongoose.Types.ObjectId( req.params.userId ) ) == true ){
        	let index = metaphor.likedBy.indexOf( mongoose.Types.ObjectId( req.params.userId ) );
          	metaphor.likedBy.splice( index, 1 );
        }

        metaphor.save( function( error ){
          // NOTE: This code runs after the saving is complete

          Metaphor.find( { }, "text explanation likedBy dislikedBy", function( error, records ){
            if( error ){
              console.log( error );
            } else {
              console.log( "All Metaphors after disliking: ", records );
            }
          });

          if( error ){
            console.log( error );
            res.send( error );
          } else {
            console.log( "Metaphor disliked successfully!" );
            res.send( "Metaphor disliked successfully!" );
          }

        } );
      }
    } );

});


module.exports = router;

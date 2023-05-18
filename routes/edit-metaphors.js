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

// localhost:3000/delete

router.put('/edit', (req, res) => {
    Metaphor.updateOne( { "_id": mongoose.Types.ObjectId(req.body.id) }, { text: req.body.text, explanation: req.body.explanation }, function( error ){
        if( error ){
          console.log( error );
          res.send( error );
        } else {
          console.log( "Metaphor edited successfully.");
          res.send( "Metaphor edited successfully.");
        }
    });
});
module.exports = router;

router.put('/report',(req,res)=>{

  Metaphor.updateOne( {"_id": mongoose.Types.ObjectId(req.body.id)}, {report: req.body.report}, function(error){

      if(err)throw err;
      else{
        console.log("Reported the metaphor");
      }


  });


});
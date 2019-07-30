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
    console.log("req: " + req);
    console.log("id: ", req.body.id);
    console.log("text: " + req.body.text);
    console.log("explanation: " + req.body.explanation);

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

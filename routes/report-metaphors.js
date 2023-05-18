//This module implements add-delete of posts
const express = require('express');
const router = express.Router();
//const user = require('../routes/users');

//gets report model
const Report = require('../models/reports');

// Request Methods:
// router.post (Creating)
// router.get (Read)
// router.put (Update)
// router.delete (Delete)

// localhost:3000/delete

router.post('/report', (req, res) => {
    let newReport = new Report( {
        issue: req.body.issue,
        metaphorID: req.body.metaid,
        authorID: req.body.authorid,
        userID: req.user._id
    });

    // check to see if user has already reported the metaphor
    Report.findOne({metaphorID: req.body.metaid, userID: req.user._id}).then( (oldReport) => {
        if (oldReport) {
            console.log( "Metaphor already reported" );
            res.send( "Metaphor already reported" );
        } else {
        newReport.save( function( error ){            
                if( error ){
                    console.log( error );
                    res.send( error );
                } else {
                    console.log( "Metaphor reported." );
                    res.send( "Metaphor reported." );
                }
            });
        }
    }); 
});
module.exports = router;

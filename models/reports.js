const mongoose = require('mongoose');

let ReportSchema = new mongoose.Schema( {
<<<<<<< HEAD
    report: { type: [mongoose.SchemaTypes.String], ref:'Metaphor' },
    metaphor: {type: mongoose.Schema.Types.String, ref: 'Metaphor'},
    metaphorId: { type: [mongoose.Schema.Types.ObjectId], ref: 'Metaphor' },
    author: {type: [mongoose.Schema.Types.String], ref: 'User'},
  
=======
    issue: { type: String },
    metaphorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Metaphor' },
    authorID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
>>>>>>> 9bb0ce23257223fe397d838558958a65d9165233
  } );
  
  const ReportModel = mongoose.model('Report', ReportSchema);
  module.exports = ReportModel;
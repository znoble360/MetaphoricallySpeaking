const mongoose = require('mongoose');

let ReportSchema = new mongoose.Schema( {
    issue: { type: String },
    metaphorID: { type: [mongoose.Schema.Types.ObjectId], ref: 'Metaphor' },
    authorID: {type: [mongoose.Schema.Types.ObjectId], ref: 'User'},
    userID: {type: [mongoose.Schema.Types.ObjectId], ref: 'User'}
  } );
  
  const ReportModel = mongoose.model('Report', ReportSchema);
  module.exports = ReportModel;
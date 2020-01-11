const mongoose = require('mongoose');

let ReportSchema = new mongoose.Schema( {
    report: { type: [mongoose.SchemaTypes.String], ref:'Metaphor' },
    metaphor: {type: mongoose.Schema.Types.String, ref: 'Metaphor'},
    metaphorId: { type: [mongoose.Schema.Types.ObjectId], ref: 'Metaphor' },
    author: {type: [mongoose.Schema.Types.String], ref: 'User'},
  
  } );
  
  const ReportModel = mongoose.model('Report', ReportSchema);
  module.exports = ReportModel;
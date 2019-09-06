const mongoose = require('mongoose');

// You can make a model to represent a metaphor
let MetaphorSchema = new mongoose.Schema( {
  text: { type: String },
  explanation: { type: String },
  likedBy: { type: [mongoose.Schema.Types.ObjectId] },
  dislikedBy: { type: [mongoose.Schema.Types.ObjectId] },
  likeCount: {type: Number },
  dislikeCount: { type: Number },
  time : { type : Date, default: Date.now },
<<<<<<< HEAD
  authorID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  author: {type: mongoose.Schema.Types.String, ref: 'User'},
  report: {type: [String]}
=======
  authorID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
>>>>>>> 9bb0ce23257223fe397d838558958a65d9165233
} );

const MetaphorModel = mongoose.model('Metaphor', MetaphorSchema);
module.exports = MetaphorModel;

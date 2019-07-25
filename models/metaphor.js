const mongoose = require('mongoose');

// You can make a model to represent a metaphor
let MetaphorSchema = new mongoose.Schema( {
  text: { type: String },
  explanation: { type: String },
  likedBy: { type: [mongoose.Schema.Types.ObjectId] },
  dislikedBy: { type: [mongoose.Schema.Types.ObjectId] },
  likeCount: {type: Number },
  dislikeCount: { type: Number },
  date: { type: Date }
} );

const MetaphorModel = mongoose.model('Metaphor', MetaphorSchema)
module.exports = MetaphorModel;

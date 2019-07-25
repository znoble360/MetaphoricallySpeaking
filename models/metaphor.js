const mongoose = require('mongoose');
// You can make a model to represent a metaphor
let MetaphorSchema = new mongoose.Schema( {
  text: { type: String },
  explanation: { type: String }
});

const MetaphorModel = mongoose.model('Metaphor', MetaphorSchema)
module.exports = MetaphorModel;
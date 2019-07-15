const mongoose = require('mongoose');
const CreateDeleteSchema = new mongoose.Schema({

name: {
    type: String,
    required: true
},

email: {
    type: String,
    required: true
},
message: {
    type: String,
    required: true
},


}); 

const CreateDeleteModel = mongoose.model('CreteDelete', CreateDeleteSchema)
module.exports = CreateDelete;

const mongoose = require('mongoose');
const AddDeleteSchema = new mongoose.Schema({

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

const AddDeleteModel = mongoose.model('AddDelete', AddDeleteSchema)
module.exports = AddDelete;

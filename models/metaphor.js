const mongoose = require("mongoose");
const MetaphorSchema = new mongoose.Schema({
	
	content: {
		type: String,
		required: true
	},
	
	description: {
		type: String,
		required: true
	}
	
});

const Metaphor = mongoose.model('Metaphor', MetaphorSchema);
module.exports = Metaphor;
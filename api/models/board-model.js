const {Schema, model} = require('mongoose');

const BoardSchema = new Schema({
	name: {type: String, required: true},
	access: {type: String, required: true},
	bg: {type: String, required: true},
	chief: {type: String, required: true},
	columns: [],
})

module.exports = model('Board', BoardSchema);

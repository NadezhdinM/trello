const {Schema, model} = require('mongoose');

const BoardSchema = new Schema({
	name: {type: String, required: true},
	access: {type: String, required: true},
	bg: {type: String, required: true},
	chief: {type: String, required: true},
	columns: [
		new Schema({ 
			nameColumn: {type: String, required: true},
			cards: [
				new Schema({ 
					nameCard: {type: String, required: true}
				})
			],
			order: { type: String, required: true }
		})
	]
})

module.exports = model('Board', BoardSchema);

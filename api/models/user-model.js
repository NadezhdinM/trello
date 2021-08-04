const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	boards: [
		new Schema({ 
			idBoard: String,
			nameBoard: String, 
			bgBoard: String
		}, { _id: false })
	],
	isActivated: {type: Boolean, default: false},
	activationLink: {type: String},
})

module.exports = model('User', UserSchema);

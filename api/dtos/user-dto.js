module.exports = class UserDto {
	email;
	id;
	boards;
	isActivated;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
		this.boards = model.boards;
		this.isActivated = model.isActivated;
	}
}

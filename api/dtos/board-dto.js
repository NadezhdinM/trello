module.exports = class BoardDto {
	access;
	bg;
	chief;
	columns;
	name;
	_id;

	constructor(model) {
		this.access = model.access;
		this.bg = model.bg;
		this.chief = model.chief;
		this.columns = model.columns;
		this.name = model.name;
		this.id = model._id;
	}
}
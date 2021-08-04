const BoardModel = require('../models/board-model');

class BoardService {
	async postBoard(name, access, bg, chief) {
		const board = await BoardModel.create({name, access, bg, chief});
		return {board};
	}
	async getBoard(idBoard) {
		const board = await BoardModel.findById(idBoard);
		return {board};
	}
}

module.exports = new BoardService();
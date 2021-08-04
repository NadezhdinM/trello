const boardService = require('../service/board-service');

class BoardController {
	async postBoard(req, res, next) {
		try {
			const {name, access, bg, chief} = req.body;
			const board = await boardService.postBoard(name, access, bg, chief);
			return res.json(board);
		} catch (e) {
			next(e);
		}
	}
	async getBoard(req, res, next) {
		try {
			const {idBoard} = req.params;
			const board = await boardService.getBoard(idBoard);
			return res.json(board);
		} catch (e) {
			res.status(500).json(e);
		}
	}
}

module.exports = new BoardController();
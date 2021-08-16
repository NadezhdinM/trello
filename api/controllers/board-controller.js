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
	async addColumn(req, res, next) {
		try {
			const {idBoard, columnText} = req.body;
			const board = await boardService.addColumn(idBoard, columnText);
			return res.json(board);
		} catch (e) {
			next(e);
		}
	}
	async changeColumns(req, res, next) {
		try {
			const {idBoard, columns} = req.body;
			const columnsData = await boardService.changeColumns(idBoard, columns);
			return res.json(columnsData);
		} catch (e) {
			next(e);
		}
	}
	async addCard(req, res, next) {
		try {
			const {idBoard, index, cardName, order} = req.body;
			const board = await boardService.addCard(idBoard, index, cardName, order);
			return res.json(board);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new BoardController();
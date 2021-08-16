const BoardModel = require('../models/board-model');

class BoardService {
	async postBoard(name, access, bg, chief) {
		const board = await BoardModel.create({name, access, bg, chief});
		return board;
	}
	async getBoard(idBoard) {
		const board = await BoardModel.findById(idBoard);
		return board;
	}
	async addColumn(idBoard, columnText) {
		const board = await BoardModel.findByIdAndUpdate(
			idBoard,
			{ $push: { 
				columns: [{
					nameColumn: columnText, 
					cards: []
				}],
			}}, 
			{new: true}
		);
		return board;
	}
	async changeColumns(idBoard, columns) {
		const columnsData = await BoardModel.findByIdAndUpdate(
			idBoard,
			{ $set: { 
				columns: columns
			}}, 
			{new: true}
		);
		return columnsData;
	}
	async addCard(idBoard, index, cardName, order) {
		
		const board = await BoardModel.findByIdAndUpdate(
			idBoard, 
			{ 
				$push: {
					[`columns.${index}.cards`]: [{
						nameCard: cardName, 
						order: order
					}]
				},

			},
			{new: true}
		);
		return board;
	}
}

module.exports = new BoardService();
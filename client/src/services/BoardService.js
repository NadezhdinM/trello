import $api from '../http';

export default class BoardService {
	static postBoard(name, access, bg, chief) {
		return $api.post('/postBoard', { name, access, bg, chief })
	}
	static getBoard(idBoard) {
		return $api.get(`/getBoard/${idBoard}`);
	}
	static addColumn(idBoard, columnText) {
		return $api.put(`/addColumn`, { idBoard, columnText });
	}
	static changeColumns(idBoard, columns) {
		return $api.put(`/changeColumns`, { idBoard, columns });
	}
	static addCard(idBoard, index, cardName, order) {
		return $api.put(`/addCard`, {idBoard, index, cardName, order});
	}
}
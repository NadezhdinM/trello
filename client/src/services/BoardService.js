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
}
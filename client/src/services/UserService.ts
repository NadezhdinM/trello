import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class UserService {
	static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/users')
	}
	static createBoard(chiefBoard: string, idBoard: string, nameBoard: string, bgBoard: string) {
		return $api.put('/createBoard', { chiefBoard, idBoard, nameBoard, bgBoard })
	}
}
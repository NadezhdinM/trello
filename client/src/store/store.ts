import { IUser } from "../models/IUser";
import { IBoard } from "../models/IBoard";
import { AuthResponse } from "../models/response/AuthResponse";

import AuthService from "../services/AuthService";
import BoardService from "../services/BoardService";
import UserService from "../services/UserService";

import axios from 'axios';
import { API_URL } from "../http";

import { makeAutoObservable } from "mobx";

export default class Store {
	user = {} as IUser;
	board = {} as IBoard || null;
	isAuth = false;
	isLoading = false;
	isActive = false;
	isWarning = false;
	activeAdd = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	setLoading(bool: boolean) {
		this.isLoading = bool;
	}

	setActive(bool: boolean) {
		this.isActive = bool;
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
			window.location.replace("/");
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async registration(email: string, password: string) {
		try {
			const response = await AuthService.registration(email, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
			window.location.replace("/");
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async logout() {
		try {
			localStorage.removeItem('token');
			this.setAuth(false);
			this.setUser({} as IUser);
			window.location.replace("/login");
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async checkAuth() {
		try {
			this.setLoading(true);
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e.response?.data?.message);
		} finally {
			this.setLoading(false);
		}
	}

	async postBoard(name: string, access: string, bg: string, chief: string) {
		try {
			const responseBoard = await BoardService.postBoard(name, access, bg, chief);
			console.log(responseBoard);
			const chiefBoard = responseBoard.data.chief,
				idBoard = responseBoard.data._id,
				nameBoard = responseBoard.data.name,
				bgBoard = responseBoard.data.bg;
			const responseUser = await UserService.createBoard(chiefBoard, idBoard, nameBoard, bgBoard);
			this.setUser(responseUser.data);
		} catch (e) {
			console.log(e);
		}
	}
}

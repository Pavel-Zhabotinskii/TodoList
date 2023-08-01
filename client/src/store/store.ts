import { ITodo, ITodoDto, IUser } from '../models/response/TodoResponse';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import TaskSetvice from '../services/Task.Service';

export default class Store {
	user = {} as IUser;
	isAuth = false;
	tasks = [] as ITodo[];

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	setTasks(tasks: ITodo[]) {
		this.tasks = tasks;
	}
	async login(username: string, password: string) {
		let responseLogin;
		try {
			responseLogin = await AuthService.login(username, password);
			localStorage.setItem('token', responseLogin.data.message);
			this.setAuth(true);
			this.setUser(responseLogin.data.user)
		} catch (e: any) {
			console.log(e.response?.data?.message);
		}
		return responseLogin;
	}

	async CheckAuth() {
		try {
			const response = await TaskSetvice.GetTodoList();
			this.setAuth(true);
			this.setTasks(response.data)
		} catch (e){
			console.log(e);
		}
	}

	async registration(
		firstName: string,
		lastName: string,
		userName: string,
		email: string,
		password: string
	){
		let response;
		try {
			response = await AuthService.registration(
				firstName,
				lastName,
				userName,
				email,
				password
			);
		} catch (e: any) {
			console.log(e.response?.data?.message);
		}
		return response;
	}

	async logout() {
		try {
			await new Promise(resolve => setTimeout(resolve, 1000)); 
			this.setAuth(false);
			localStorage.removeItem('token');
		} catch (e: any) {
			console.log(e.message);
		}
	}

	async GetTodoList() {
		try {
			const response = await TaskSetvice.GetTodoList();
			this.setAuth(true);
			this.setTasks(response.data)
		} catch (e){
			console.log(e);
		}
	}

	
	async CreateTask(Description: string, IsCompleted: boolean) {
		try {
			const response = await TaskSetvice.CreateTask(Description, IsCompleted);
			return response
		} catch (e){
			console.log(e);
		}
	}

	async UpdateTask(newTask: ITodoDto) {
		try {
			const response = await TaskSetvice.UpdateTask(newTask);
			return response
		} catch (e){
			console.log(e);
		}
	}

	async DeleteTask(id: number) {
		try {
			const response = await TaskSetvice.DeleteTask(id);
		} catch (e){
			console.log(e);
		}
	}
}

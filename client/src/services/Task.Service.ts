import $api from '../http';
import { AxiosResponse } from 'axios';
import { ITodo, ITodoDto } from '../models/response/TodoResponse';

export default class TaskSetvice {
	static async GetTodoList(): Promise<AxiosResponse<ITodo[]>> {
		return $api.get('/Tasks/get-todo-list');
	}

	static async CreateTask(
		description: string,
		isCompleted: boolean
	): Promise<AxiosResponse<ITodo>> {
		return $api.post('/Tasks/create-task', {
			description,
			isCompleted,
		});
	}

	static async UpdateTask(newTodo: ITodoDto): Promise<AxiosResponse<string>> {
		return $api.put('/Tasks/update-task', newTodo);
	}

	static async DeleteTask(id: number): Promise<AxiosResponse<string>> {
	  return await $api.delete('/Tasks/delete-task', { params: { id: id } });;
	}
}

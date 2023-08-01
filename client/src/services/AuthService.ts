import $api from '../http';
import { AxiosResponse } from 'axios';
import {
	LoginResponse,
	RegisterResponse,
} from '../models/response/AuthResponse';

export default class AuthSetvice {
	static async login(
		username: string,
		password: string
	): Promise<AxiosResponse<LoginResponse>> {
		return $api.post('/Auth/login', { username, password });
	}

	static async registration(
		firstName: string,
		lastName: string,
		userName: string,
		email: string,
		password: string
	): Promise<AxiosResponse<RegisterResponse>> {
		return $api.post('/Auth/register', {
			firstName,
			lastName,
			userName,
			email,
			password,
		});
	}

	// static async logout(): Promise<void> {
	// 	return $api.post('/Auth/logout');
	// }
}

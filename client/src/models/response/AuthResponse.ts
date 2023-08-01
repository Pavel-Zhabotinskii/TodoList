import { IUser } from "./TodoResponse";

export interface LoginResponse {
	isSucceed: boolean;
	message: string;
	user: IUser
}

export interface RegisterResponse {
	isSucceed: boolean;
	message: string;
	user: IUser
}

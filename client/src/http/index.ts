import axios from 'axios';

export const API_URL = 'https://localhost:7150/api';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use(config => {
	config.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
	return config;
});

export default $api;

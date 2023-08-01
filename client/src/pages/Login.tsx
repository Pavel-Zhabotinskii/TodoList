import React, { FC, useState, useContext } from 'react';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
	const [userName, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { store } = useContext(Context);
	const navigate = useNavigate();

	async function Login (userName: string, password: string){
		const response = await store.login(userName, password)
		setUserName('')
		setPassword('')
		if(response?.data.isSucceed) navigate('/to-do-list');
	  }

	return (
		<div className='loginForm__container'>
			<input
				className='loginForm__input'
				type='text'
				placeholder='User Name'
				onChange={e => setUserName(e.target.value)}
				value={userName}
			/>
			<input
				className='loginForm__input'
				type='password'
				placeholder='Password'
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>
			<button className='loginForm__button' onClick={() => Login(userName, password)}>Log up</button>
		</div>
	);
};

export default Login;
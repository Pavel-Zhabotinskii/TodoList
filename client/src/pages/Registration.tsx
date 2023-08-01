import React, { FC, useState, useContext } from 'react';
import { Context } from '..';

const Registration: FC = () => {
	const [lastName, setLastName] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { store } = useContext(Context);

    async function registration(firstName: string, lastName: string, userName: string, email: string, password: string) {
        const response = await store.registration(firstName, lastName, userName, email, password);
        setLastName('')
        setFirstName('')
        setUserName('')
        setEmail('')
        setPassword('')
        console.log(response?.data);
    }

	return (
            <div className='loginForm__container'>
                <input
                    className='loginForm__input'
                    type='text'
                    placeholder='First Name'
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                />
                <input
                    className='loginForm__input'
                    type='text'
                    placeholder='Last Name'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                />
                <input
                    className='loginForm__input'
                    type='text'
                    placeholder='User Name'
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                />
                <input
                    className='loginForm__input'
                    type='text'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    className='loginForm__input'
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <button
                    className='loginForm__button'
                    onClick={() =>
                        registration(firstName, lastName, userName, email, password)
                    }
                >
                    Registration
                </button>
            </div>
	);
};

export default Registration;
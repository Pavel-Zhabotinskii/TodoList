import './styles/App.css';
import React, { FC, useContext, useEffect } from 'react';
import { Context } from '.';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {Route,  Routes, useNavigate} from "react-router-dom";
import { routes } from './router';



const App: FC = () => {
	const { store } = useContext(Context);
	const navigate = useNavigate();
	  
	useEffect(() => {
		(async function (){
			if(localStorage.getItem('token')){
				await store.CheckAuth();
			   	if (store.isAuth ) {
					return navigate('/to-do-list');
			   	}
			}
			navigate('/login')
		}())
	}, []);

	return (
		<div className='wrapper'>
			<Header/>
			<main className='main'>
			<Routes> 
				{routes.map(route => 
					<Route key={route.path} element={<route.component/>} path={route.path}/>
				)}
			</Routes>
			</main>
			<Footer/>
		</div>
	);
};

export default App;

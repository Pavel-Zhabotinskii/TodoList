import { FC, useContext} from "react";
import { Context } from "../..";
import { Link, useNavigate } from "react-router-dom";
import cl from "./Header.module.css"
import {observer} from "mobx-react-lite";

const Header: FC = ()=> {
	const { store } = useContext(Context);
	const navigate = useNavigate();

	const loguot = () => {
		store.setAuth(false);
		localStorage.removeItem('token');
		return navigate('/login')
	}
  
	return (
	  <header className={cl.header}>
		<div className={cl.header__container}>
		  <Link to={store.isAuth ? '/to-do-list' : '/'} className={cl.logo}>TodoList</Link>
		  {store.isAuth ? (
			<button className={cl.button} onClick={loguot}>
			  Log out
			</button>
		  ) : (
			<div>
			  <Link className={cl.button} to='/login'>Log up</Link>
			  <Link className={cl.button} to='/registration'>
				Registration
			  </Link>
			</div>
		  )}
		</div>
	  </header>
	);
  };

  export default observer(Header);

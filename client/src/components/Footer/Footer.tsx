import React, {FC} from 'react';
import cl from './Footer.module.css'

const Footer: FC = () => {
	return (
		<footer className={cl.footer}>
			<div className={cl.footer__container}>
                TodoList 
			</div>
		</footer>
	);
};

export default Footer;

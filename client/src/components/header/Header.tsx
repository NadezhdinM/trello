import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

function Header() {
	/* window.addEventListener('scroll', (event) => {
		const header = document.querySelector('header');
		if (!header) {
			return;
		}
		if (window.pageYOffset !== 0) {
			header.classList.add('active');
		} else {
			header.classList.remove('active');
		}
	}); */
	return (
		<header className="header">
			<nav className="header__nav">
				<Link to="#" className="header__link">
					<img alt="Trello" className="logo__svg" src={logo} />
				</Link>
				<div className="header__right">
					<Link to="/login" className="btn btn-sm btn-link text-primary">Войти</Link>
					<Link to="/signup" data-analytics-button="whiteSignupHeroButton" className="btn btn-sm bg-primary text-white font-weight-bold">Регистрация</Link>
				</div>
			</nav>
		</header>
	);
}

export default Header;
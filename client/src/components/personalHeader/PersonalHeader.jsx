import React, { useRef } from 'react';
import './personalHeader.scss';
import logo from "./logo.gif";
import plus from "./plus.svg";
import home from "./home.svg";
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../..';
import { useContext } from 'react';
import Activation from '../activation/Activation';
import Warning from '../warning/Warning';
import { observer } from 'mobx-react-lite';

function PersonalHeader() {
	const { store } = useContext(Context);
	const userAlert = useRef();
	const onActive = () => {
		userAlert.current.classList.toggle('active');
	}
	const name = store.user.email;
	let history = useHistory();
	return (
		<>
			<header className="personalheader">
				<div className="personalheader__left">
					<button className="header__btn" onClick={() => history.push("/")}>
						<img src={home} alt="" />
					</button>
				</div>
				<Link to="/" className="personalheader__center">
					<img src={logo} alt="Вернуться на главную страницу" />
				</Link>
				<div className="personalheader__right">
					<div className="personalheader__btn">
						<button className="header__btn" onClick={() => store.setActive(true)}>
							<img src={plus} alt="" />
						</button>
						<button
							onClick={() => onActive()}
							className="user__btn">
							<span>m</span>
						</button>
					</div>
				</div>
				<div ref={userAlert} className="personal__alert">
					<div className="personal__h4">Учетная запись</div>
					<hr />
					<nav>
						<ul>
							<div className="personal__info">
								<div>
									<span className="personal__icon">{ }</span>
								</div>
								<div>
									<span className="personal__mail">{name}</span>
								</div>
							</div>
							<hr />
							<li>
								<button
									onClick={() => store.logout()}>
									Выйти
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			{!store.user.isActivated && <Activation />}
			{store.isWarning && <Warning />}
		</>
	);
}

export default observer(PersonalHeader);
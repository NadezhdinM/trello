import "./login.scss";
import { Link } from "react-router-dom";
import React, { FC, useContext } from 'react';
import Bg from "../../components/bg/Bg";
import { Context } from "../..";
import { useState } from "react";
import { observer } from "mobx-react-lite";


const Login: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { store } = useContext(Context);

	return (
		<div>
			<img alt="Trello" className="main__logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
			<section className="login form">
				<div className="login__inner form__inner">
					<h1>Вход в Trello</h1>
					<input
						onChange={e => setEmail(e.target.value)}
						value={email}
						type="text" name="user" id="user" className="form__field" autoCapitalize="off" placeholder="Укажите адрес электронной почты" autoComplete="username" />
					<input
						onChange={e => setPassword(e.target.value)}
						value={password}
						type="password" name="password" id="password" className="form__field" placeholder="Введите пароль" autoComplete="current-password" />
					<input
						onClick={() => store.login(email, password)}
						id="login" type="submit" className="btn form__btn" value="Войти" />
					<hr />
					<ul className="form__link">
						<li><Link to="/forgot" className="form__forgot">Не удается войти?</Link></li>
						<li><Link to="/signup" className="form__signup">Зарегистрировать аккаунт</Link></li>
					</ul>
				</div>
			</section>
			<Bg />
		</div>
	);
}

export default observer(Login);
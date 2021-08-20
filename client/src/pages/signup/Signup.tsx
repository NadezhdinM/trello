import "./signup.scss";
import Bg from "../../components/bg/Bg";

import { Link } from "react-router-dom";
import React, { FC, useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const Signup: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { store } = useContext(Context);

	return (
		<div>
			<img alt="Trello" className="main__logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
			<section className="sign form">
				<div className="sign__inner form__inner">
					<h1>Зарегистрировать аккаунт</h1>
					<input
						onChange={e => setEmail(e.target.value)}
						value={email}
						type="text" name="user" id="user" className="form__field" autoCapitalize="off" placeholder="Укажите адрес электронной почты" autoComplete="username" />
					<input
						onChange={e => setPassword(e.target.value)}
						value={password}
						type="password" name="password" id="password" className="form__field" placeholder="Введите пароль" autoComplete="current-password" />
					<input
						onClick={() => store.registration(email, password)}
						id="sign" type="submit" className="btn form__btn" value="Зарегистрироваться" />
					<hr />
					<ul className="form__link">
						<li><Link to="/login" className="form__login">Уже есть аккаунт? Войти</Link></li>
					</ul>
				</div>
			</section>
			<Bg />
		</div>
	);
}

export default observer(Signup);
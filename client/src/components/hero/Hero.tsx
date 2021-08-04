import React from 'react';
import './hero.scss';

function Hero() {
	return (
		<section className="hero">
			<div className="hero__inner container">
				<div className="hero__left">
					<h1>Trello помогает командам эффективно решать рабочие задачи.</h1>
					<p>Работайте в команде, управляйте проектами и выводите продуктивность на новый уровень собственным уникальным способом вместе с Trello.</p>
					<form className="hero__form">
						<input name="email" className="hero__form-mail" type="email" placeholder="Электронная почта" />
						<button type="submit" className="btn btn-wrap btn-primary btn-block">Зарегистрируйтесь<br />— это бесплатно!</button>
					</form>
				</div>
				<div className="hero__right">
					<img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" width="931" height="1205" className="hero__bg" alt="" />
				</div>
			</div>
		</section>
	);
}

export default Hero;
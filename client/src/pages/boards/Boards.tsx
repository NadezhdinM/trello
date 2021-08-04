import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import './boards.scss';

function Boards() {
	const { store } = useContext(Context);
	return (
		<div className="boards">
			<h3 className="boards__h3">
				Ваши рабочие пространства
			</h3>
			<ul className="boards__list">
				{
					store.user.boards.map((elem: any) => {
						return <li key={elem.idBoard} className={`boards__item ${elem.bgBoard}`}><Link to={`/b/${elem.idBoard}`} className="boards__a">{elem.nameBoard}</Link></li>
					})
				}
				<li className="boards__item"><span className="boards__add" onClick={() => store.setActive(true)}>Создать доску</span></li>
			</ul>
		</div>
	);
}

export default Boards;
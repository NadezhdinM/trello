import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../..';
import Modal from '../../components/modal/Modal';
import PersonalHeader from '../../components/personalHeader/PersonalHeader';
import './board.scss';
import plus from './plus.svg';
import close from './close.svg';

function Board() {
	const { store } = useContext(Context);
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	useEffect(() => {
		store.getBoard(`${path}`);
	});
	console.log(store.board);
	const [activeAdd, setActiveAdd] = useState(false);
	return (
		<>
			<PersonalHeader />
			<div className={`board`}>
				<div className="board__inner">
					<div className="board__column">
						<div className="board__column-top">
							<h2>sdfe</h2>
						</div>
						<div className="board__column-main">



						</div>
						<div className="board__column-btm">
							<Link to="#" className="board__column-btm-a" onClick={() => setActiveAdd(true)}>
								<span className="board__column-btm-img">
									<img src={plus} alt="" />
								</span>
								<span className="board__column-btm-text"  >
									Добавить карточку
								</span>
							</Link>
						</div>
					</div>
					<div className={activeAdd ? 'board__column-add active' : 'board__column-add'}>
						<form className="board__column-form">
							<Link onClick={() => setActiveAdd(true)} to="#" className="board__column-add-a">
								<span className="board__column-add-img">
									<img src={plus} alt="" />
								</span>
								<span className="board__column-add-text"  >
									Добавьте еще одну колонку
								</span>
							</Link>
							<div className="board__column-add-inner">
								<input type="text" />
								<div className="board__column-add-btm">
									<input type="submit" value="Добавить в список" />
									<span onClick={() => setActiveAdd(false)}>
										<img src={close} alt="" />
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Modal />
		</>
	);
}

export default observer(Board);
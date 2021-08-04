import React, { FC, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../..';
import Modal from '../../components/modal/Modal';
import PersonalHeader from '../../components/personalHeader/PersonalHeader';
import './board.scss';
import plus from './plus.svg';
import close from './close.svg';
import { observer } from 'mobx-react-lite';

const Board: FC = () => {
	const { store } = useContext(Context);
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	useEffect(() => {
		store.getBoard(`${path}`);
	}, []);
	const [activeAdd, setActiveAdd] = useState(false);
	const [columnText, setColumnText] = useState('');

	const [currentColumn, setCurrentColumn] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);
	function dragOverHandler(e: any) {
		e.preventDefault();
		if (e.target.className === 'board__column') {
			e.target.style.background = 'black';
		}
	}

	function dragLeaveHandler(e: any) {
		e.target.style.background = '';
	}

	function dragStartHandler(e: any, board: any) {
		setCurrentColumn(board);
	}

	function dragEndHandler(e: any) {
		e.target.style.background = '';
	}

	function dropHandler(e: any, board: any) {
		e.preventDefault();
		setCurrentColumn(store.board.columns.map((col: any) => {
			if (col.id === store.board.columns.indexOf(currentColumn)) {
				return store.board.columns[store.board.columns.indexOf(board)]
			}
			if (col.id === store.board.columns.indexOf(board)) {
				return store.board.columns[store.board.columns.indexOf(currentColumn)]
			}
			return col;
		}))
		console.log(currentColumn);
		console.log(store.board.columns.indexOf(board));
	}

	return (
		<>
			<PersonalHeader />
			<div className={`board`}>
				<div className="board__inner">
					{store.board.columns !== null &&
						(store.board.columns !== undefined &&
							store.board.columns.map((board: any, index: number) => {
								return (
									<div
										key={index}
										onDragOver={(e) => dragOverHandler(e,)}
										onDragLeave={(e) => dragLeaveHandler(e)}
										onDragStart={(e) => dragStartHandler(e, board)}
										onDragEnd={(e) => dragEndHandler(e)}
										onDrop={(e) => dropHandler(e, board)}
										draggable={true}
										className="board__column">
										<div className="board__column-top">
											<h2>{board.nameColumn}</h2>
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
								)
							}))
					}
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
								<input onChange={(e) => setColumnText(e.target.value)} type="text" />
								<div className="board__column-add-btm">
									<input onClick={(e) => {
										e.preventDefault();
										console.log('click');
										store.addColumn(path, columnText);
									}} type="submit" value="Добавить в список" />
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
import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import PersonalHeader from '../../components/personalHeader/PersonalHeader';
import './board.scss';
import BoardService from "../../services/BoardService";
import Column from '../../components/column/Column';
import plus from '../../pages/board/plus.svg';
import close from '../../pages/board/close.svg';
import Loading from '../../components/loading/Loading';

const Board: FC = () => {

	const location = useLocation();
	const path: string = location.pathname.split('/')[2];

	const [columns, setColumns] = useState([]);
	// const [warning, setWarning] = useState(false);
	const [activeAdd, setActiveAdd] = useState(false);
	const [columnText, setColumnText] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cleanupFunction = false;
		const getBoard = async (idBoard: string) => {
			try {
				const responseBoard = await BoardService.getBoard(idBoard);
				if (!cleanupFunction) setColumns(responseBoard.data.columns);
			} catch (e) {
				console.log(e);
			} finally {

			}
		}

		getBoard(path);
		setLoading(false);
		return () => { cleanupFunction = true }
	}, [path]);

	async function addColumn(idBoard: string, columnText: string) {
		try {
			const addColumn = await BoardService.addColumn(idBoard, columnText);
			setColumns(addColumn.data.columns);
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<>
			<PersonalHeader />
			{loading
				? <Loading />
				: <div className={`board`}>
					<div className="board__inner">
						<>

							{Array.from(columns).map((column: any, index: number, array: any) => {
								return <Column key={column._id} column={column} CI={index} path={path} columns={array} setColumns={setColumns} />
							})}
							<div className="board__sign">
								<div className={activeAdd ? 'board__column-add active' : 'board__column-add'}>
									<form className="board__column-form">
										<Link draggable='false' onClick={() => setActiveAdd(true)} to="#" className="board__column-add-a">
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
													addColumn(path, columnText);
												}} type="submit" value="Добавить в список" />
												<span onClick={() => setActiveAdd(false)}>
													<img src={close} alt="" />
												</span>
											</div>
										</div>
									</form>
								</div>
							</div>
						</>
					</div>
				</div>
			}
			<Modal />
		</>
	);
}

export default Board;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import plus from '../../pages/board/plus.svg';
import close from '../../pages/board/close.svg';
import './column.scss';
import Card from '../card/Card';
import BoardService from '../../services/BoardService';

const Column = (props: any) => {
	const { column, CI, path, columns, setColumns } = props;
	const [activeAdd, setActiveAdd] = useState(false);
	const [nameColumn, setNameColumn] = useState(column.nameColumn);
	const [cardName, setCardName] = useState('');

	function mouseDownHandler(e: any, column: any, ind: any) {
		let colInd: number;
		let overColInd: number;

		const currentWrapper = e.target.closest('.board__wrapper');
		colInd = (Array.prototype.indexOf.call(currentWrapper.parentElement.parentElement?.children, currentWrapper.parentElement));

		let shiftX = e.clientX - currentWrapper.parentElement.getBoundingClientRect().left;
		let shiftY = e.clientY - currentWrapper.parentElement.getBoundingClientRect().top;

		const place = document.createElement("div");
		place.className = 'board__wrapper place placeholder';
		place.style.height = currentWrapper.offsetHeight + 'px';
		place.style.width = currentWrapper.offsetWidth + 'px';

		currentWrapper.parentElement.style.position = 'absolute';
		currentWrapper.parentElement.style.zIndex = 1000;
		currentWrapper.className = 'board__wrapper board__wrapper-active';

		currentWrapper.parentElement.replaceWith(place);

		document.body.append(currentWrapper.parentElement);

		moveAt(e.pageX, e.pageY);

		function moveAt(pageX: any, pageY: any) {
			currentWrapper.parentElement.style.left = pageX - shiftX + 'px';
			currentWrapper.parentElement.style.top = pageY - shiftY + 'px';
		}

		function onMouseMove(e: any) {

			moveAt(e.pageX, e.pageY);

			currentWrapper.parentElement.hidden = true;
			let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
			currentWrapper.parentElement.hidden = false;

			if (!elemBelow) return;

			let droppableBelow = elemBelow.closest('.board__column');
			if (!droppableBelow) return;
			overColInd = (Array.prototype.indexOf.call(droppableBelow.parentElement?.children, droppableBelow));

			if (droppableBelow !== null) {
				if (droppableBelow.nextSibling !== place) {
					droppableBelow.parentElement?.insertBefore(place, droppableBelow.nextSibling);
				} else {
					droppableBelow.parentElement?.insertBefore(place, droppableBelow);
				}
			}
		}

		document.addEventListener('mousemove', onMouseMove);

		currentWrapper.parentElement.onmouseup = function () {

			document.removeEventListener('mousemove', onMouseMove);
			currentWrapper.parentElement.onmouseup = null;
			place.replaceWith(currentWrapper.parentElement);
			currentWrapper.parentElement.style.cssText = '';
			currentWrapper.className = 'board__wrapper';


			columns.splice(colInd, 1);
			columns.splice(overColInd, 0, column);
			setColumns([]);
			setColumns(columns);
			changeColumns(path, columns);

		};
	}

	async function addCard(idBoard: string, index: number, cardName: string) {
		try {
			const addCard = await BoardService.addCard(idBoard, index, cardName);
			setColumns([]);
			setColumns(addCard.data.columns);
		} catch (e) {
			console.log(e);
		}
	}

	async function changeColumns(idBoard: string, columns: any) {
		try {
			await BoardService.changeColumns(idBoard, columns);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div
			className={`board__column place`}>
			<div
				className={`board__wrapper`}>
				<div className="board__column-top" onMouseDown={(e) => mouseDownHandler(e, column, CI)}>
					<input onMouseDown={(e) => e.stopPropagation()} onChange={(e) => setNameColumn(e.target.value)} value={nameColumn} />
				</div>
				<div className="board__column-main">
					{column.cards.map((card: any, index: number) => {
						return <Card key={card._id} card={card} index={index} CI={CI} columns={columns} changeColumns={changeColumns} setColumns={setColumns} path={path} />
					})}
				</div>
				<div className={activeAdd ? 'board__column-btm active' : 'board__column-btm'}>
					<form className="board__column-btm-form">
						<Link to="#" className="board__column-btm-a" draggable="false" onClick={() => setActiveAdd(true)}>
							<span className="board__column-btm-img">
								<img src={plus} alt="" />
							</span>
							<span className="board__column-btm-text"  >
								Добавить карточку
							</span>
						</Link>
						<div className="board__column-btm-inner">
							<textarea onChange={(e) => setCardName(e.target.value)} placeholder="Ввести заголовок для этой карточки" />
							<div className="board__column-btm-btm">
								<input onClick={(e) => {
									e.preventDefault();
									addCard(path, CI, cardName);
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
	)
}

export default Column;
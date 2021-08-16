import React from 'react';
import './card.scss';

const Card = (props: any) => {
	const { card, CI, index, columns, setColumns, changeColumns, path } = props;

	function mouseDownCardHandler(e: any, card: any, CI: number, index: number) {
		let overColI: any;
		let overCardI: any;

		const currentCard = e.target.closest('.board__card');

		let shiftX = e.clientX - currentCard.getBoundingClientRect().left;
		let shiftY = e.clientY - currentCard.getBoundingClientRect().top;

		const place = document.createElement("div");
		place.className = 'board__card placeholder';
		place.style.height = currentCard.offsetHeight + 'px';

		currentCard.style.height = currentCard.offsetHeight + 'px';
		currentCard.style.width = currentCard.offsetWidth + 'px';
		currentCard.style.position = 'absolute';
		currentCard.style.zIndex = 1000;
		currentCard.className = 'board__card board__card-active';

		currentCard.replaceWith(place);
		document.body.append(currentCard);

		moveAt(e.pageX, e.pageY);

		function moveAt(pageX: any, pageY: any) {
			currentCard.style.left = pageX - shiftX + 'px';
			currentCard.style.top = pageY - shiftY + 'px';
		}

		function onMouseMoveCard(e: any) {
			moveAt(e.pageX, e.pageY);

			currentCard.style.display = 'none';
			let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
			currentCard.style.display = '';

			if (!elemBelow) return;

			let droppableColumn = elemBelow.closest('.board__column');
			if (!droppableColumn) return;
			if (droppableColumn !== null) {

				let draggingCardList = droppableColumn.children[0].children[1];
				let cardAfterDraggingCard = getCardAfterDraggingCard(draggingCardList, e.clientY);

				if (cardAfterDraggingCard) {
					cardAfterDraggingCard?.parentNode.insertBefore(place, cardAfterDraggingCard);
				} else {
					draggingCardList.appendChild(place);
				}
			}

			function getCardAfterDraggingCard(list: any, yDraggingCard: any) {

				let listCards = [...list.querySelectorAll('.board__card:not(.placeholder)')];

				return listCards.reduce((closestCard, nextCard) => {
					let nextCardRect = nextCard.getBoundingClientRect();
					let offset = yDraggingCard - nextCardRect.top - nextCardRect.height / 2;

					if (offset < 0 && offset > closestCard.offset) {
						return { offset, element: nextCard }
					} else {
						return closestCard;
					}
				}, { offset: Number.NEGATIVE_INFINITY }).element;
			}

			overCardI = (Array.prototype.indexOf.call(place.parentElement?.children, place));
			overColI = (Array.prototype.indexOf.call(droppableColumn.parentElement?.children, droppableColumn));
		}

		document.addEventListener('mousemove', onMouseMoveCard);

		currentCard.onmouseup = function () {

			document.removeEventListener('mousemove', onMouseMoveCard);
			currentCard.onmouseup = null;
			place.replaceWith(currentCard);
			currentCard.style.cssText = '';
			currentCard.className = 'board__card';

			if (overCardI !== undefined) {
				columns[CI]?.cards.splice(index, 1);
				columns[overColI]?.cards.splice(overCardI, 0, card);

				setColumns([]);
				setColumns(columns);
				changeColumns(path, columns);
			}
		}
	}
	return (
		<div onMouseDown={(e) => mouseDownCardHandler(e, card, CI, index)} className="board__card" draggable='false' >
			<div className="board__card-name">
				{card.nameCard}
			</div>
		</div>
	);
}

export default Card;
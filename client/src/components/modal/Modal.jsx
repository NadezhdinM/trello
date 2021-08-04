import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../..';
import './modal.scss';
import users from './users.svg';
import lock from './lock.svg';
import global from './global.svg';
import arrow from './arrow.svg';
import check from './check.svg';


const Modal = () => {
	const { store } = useContext(Context);
	const [name, setName] = useState();

	const bg = [
		{ id: 0, name: "Синий", bgClass: 'bgBlue' },
		{ id: 1, name: "Зеленый", bgClass: 'bgGreen' },
		{ id: 2, name: "Жёлтый", bgClass: 'bgYellow' }
	];
	const [bgId, setBgId] = useState(0);
	const [modalSm, setModalSm] = useState(false);
	const access = [
		{ id: 0, name: "Приватная", img: lock, desc: 'Просматривать и изменять эту доску могут только добавленные на нее участники.' },
		{ id: 1, name: "Рабочее пространство", img: users, desc: 'Просматривать и изменять эту доску могут все участники рабочего пространства «Рабочая площадка Trello».' },
		{ id: 2, name: "Публичная", img: global, desc: 'Просматривать эту доску могут все в Интернете (в том числе поисковые роботы Google). Изменять ее могут только участники.' }
	]
	const [currentAccess, setCurrentAccess] = useState(1);
	const bgCurrent = bg[bgId].bgClass;

	const userCurrent = store.user.id;

	return (
		<div className={store.isActive ? 'modal active' : 'modal'} onClick={() => store.setActive(false)}>
			<div className="modal__content" onClick={(e) => e.stopPropagation()}>
				<div className="modal__top">
					<div className={`modal__main ${bg[bgId].bgClass}`}>
						<input onInput={(e) => setName(e.target.value)} type="text" className="modal__name" placeholder="Добавить заголовок доски" />
						<span className="modal__desc">Рабочая площадка Trello</span>
						<button className="modal__name-btn" onClick={() => setModalSm(true)}>
							<span><img src={access[currentAccess].img} alt="" /></span>
							<span>{access[currentAccess].name}</span>
							<span><img src={arrow} alt="" /></span>
						</button>
						<ul className="modal__access">
							<li></li>
						</ul>
					</div>
					<ul className="modal__bg">
						{bg.map((elem) => {
							return <li key={elem.id} className={bgId === elem.id ? `${elem.bgClass} active` : `${elem.bgClass}`} onClick={() => setBgId(elem.id)}></li>
						})}
					</ul>
				</div>
				<div className="modal__btm">
					<button onClick={() => store.postBoard(name, currentAccess, bgCurrent, userCurrent)} disabled={name === undefined || name === '' ? true : false} className="modal__btn">Создать доску</button>
				</div>
			</div>
			<div onClick={(e) => e.stopPropagation()} className={modalSm ? `modal__sm active` : `modal__sm`} >
				<ul>
					{access.map((elem) => {
						return (
							<li key={elem.id} onClick={() => {
								setCurrentAccess(elem.id);
								setModalSm(false);
							}}>
								<button className="modal__sm-btn">
									<div>
										<span><img src={elem.img} alt="" /></span>
										<span>{elem.name}</span>
										{currentAccess === elem.id && (<span><img src={check} alt="" /></span>)}
									</div>
									<div className="modal__sm-desc">
										{elem.desc}
									</div>
								</button>
							</li>
						)
					})}
				</ul>
			</div>
		</div >
	);
}

export default observer(Modal);
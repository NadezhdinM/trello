import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import board from './board.svg';
import set from './set.svg';
import { Context } from '../..';

function Sidebar() {
	const { store } = useContext(Context);
	return (
		<div className="sidebar">
			<nav className="sidebar__nav">
				<ul>
					<li>
						<NavLink exact to={`/${store.user.id}/boards`} className="sidebar__a" activeclassname="active">
							<span><img src={board} alt="" /></span>
							<span>Доски</span>
						</NavLink>
					</li>
					<li>
						<NavLink exact to={`/${store.user.id}/account`} className="sidebar__a" activeclassname="active">
							<span><img src={set} alt="" /></span>
							<span>Настройки</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
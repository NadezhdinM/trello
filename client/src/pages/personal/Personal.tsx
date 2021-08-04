import React, { useContext } from 'react';
import './personal.scss';
import PersonalHeader from '../../components/personalHeader/PersonalHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import Boards from '../boards/Boards';
import Modal from '../../components/modal/Modal';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Context } from '../..';

function Personal() {
	const { store } = useContext(Context);
	return (
		<>
			<PersonalHeader />
			<section className="main">
				<Sidebar />
				<div className="content">
					<Switch>
						<Route path={`/${store.user.id}/boards`}>
							<Boards />
						</Route>
						<Route path={`/${store.user.id}/account`}>
							<Redirect to="/" />
						</Route>
					</Switch>
				</div>
			</section>
			<Modal />
		</>
	);
}

export default Personal;
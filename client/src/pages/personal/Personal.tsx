import './personal.scss';
import PersonalHeader from '../../components/personalHeader/PersonalHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import Boards from '../boards/Boards';
import Modal from '../../components/modal/Modal';

import React, { FC, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const Personal: FC = () => {
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

export default observer(Personal);
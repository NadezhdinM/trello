import './App.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import { useEffect, FC, useContext } from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import Personal from './pages/personal/Personal';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Logo from './components/loading/Loading';
import Board from './pages/board/Board';

const App: FC = () => {
	const { store } = useContext(Context);
	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
		console.log('----------------------------------------');
	}, []);

	if (store.isLoading) {
		return <Logo />
	}

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{store.isAuth ? <Redirect to={`/${store.user.id}`} /> : <Home />}
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path={`/${store.user.id}/`}>
					<Personal />
				</Route>
				<Route path={`/b/:boardId`}>
					<Board />
				</Route>

			</Switch>
		</Router>
	);
}

export default observer(App);

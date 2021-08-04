import React from 'react';
import './loading.scss';
import logo from '../personalHeader/logo.gif';

function Loading() {
	return (
		<div className="loading">
			<img src={logo} alt="" />
		</div>
	);
}

export default Loading;
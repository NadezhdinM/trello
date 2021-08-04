import React from 'react';
import './bg.scss'
import leftBg from "./left_bg.svg";
import rightBg from "./right_bg.svg";

function Bg() {
	return (
		<div className="bg">
			<div className="bg__left">
				<img src={leftBg} alt="" />
			</div>
			<div className="bg__right">
				<img src={rightBg} alt="" />
			</div>
		</div>
	);
}

export default Bg;
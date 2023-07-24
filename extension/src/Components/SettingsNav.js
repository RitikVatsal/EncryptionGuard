import React from "react";
import { MdChevronRight } from "react-icons/md";
import "./Settings.css";

function SettingsNav(props) {
	return (
		<div className='d-flex justify-content-between align-items-center my-3 border-bottom settings-nav-container rounded px-3' onClick={props.onClick}>
			<div className='d-flex align-items-center align-middle'>
				<span className='d-flex align-items-center justify-content-center settings-nav-icon-container'>{props.icon}</span> <span className='ms-3 align-items-center'>{props.title}</span>
			</div>
			<MdChevronRight style={{ width: "25px", height: "25px" }} />
		</div>
	);
}

export default SettingsNav;

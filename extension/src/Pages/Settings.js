import React, { useState } from "react";
// Icons
import { IoSettingsOutline } from "react-icons/io5";
import { VscKey } from "react-icons/vsc";
import { RiFolderTransferLine } from "react-icons/ri";
import { MdChevronLeft } from "react-icons/md";
// Bootstrap components

// Custom Components
import SettingsNav from "../Components/SettingsNav";
import GeneralSettings from "./GeneralSettings";
import KeyManagement from "./KeyManagement";
import ImportExportKeys from "./ImportExportKeys";

import "../Components/Settings.css";

function Settings() {
	const [settingsPage, setSettingsPage] = useState(0);
	const [icon, setIcon] = useState(<MdChevronLeft style={{ width: "30px", height: "30px" }} />);

	const handleMouseEnter = () => {
		setIcon(<MdArrowBack style={{ width: "30px", height: "30px" }} />);
	};

	const handleMouseLeave = () => {
		setIcon(<MdChevronLeft style={{ width: "30px", height: "30px" }} />);
	};
	return (
		<>
			{settingsPage > 9 && (
				<div className='d-flex align-items-center my-4 mx-2 btn w-25 back-btn' style={{ width: "auto", backgroundColor: "transparent" }} onClick={() => setSettingsPage(0)}>
					<MdChevronLeft style={{ width: "35px", height: "35px" }} />
					<h5 className='mb-0 ml-2'>Back</h5>
				</div>
			)}
			{settingsPage < 10 ? (
				<div className='m-3 mt-5'>
					<SettingsNav icon={<IoSettingsOutline style={{ width: "20px", height: "20px" }} />} title='General' onClick={() => setSettingsPage(11)} />
					<SettingsNav icon={<VscKey style={{ width: "20px", height: "20px" }} />} title='Key Management' onClick={() => setSettingsPage(12)} />
					<SettingsNav icon={<RiFolderTransferLine style={{ width: "20px", height: "20px" }} />} title='Keys Import/Export' onClick={() => setSettingsPage(13)} />
				</div>
			) : settingsPage === 11 ? (
				<GeneralSettings />
			) : settingsPage === 12 ? (
				<KeyManagement />
			) : settingsPage === 13 ? (
				<ImportExportKeys />
			) : null}
		</>
	);
}

export default Settings;

// <Tabs defaultActiveKey='General' id='uncontrolled-tab-example' className='mt-3'>
// 	<Tab eventKey='General' title='General' className='m-3 bg-primary'>
// 		<button>ancb</button>
// 	</Tab>
// 	<Tab eventKey='Keys' title='Manage Keys'>
// 		<button>ancb</button>
// 	</Tab>
// 	<Tab eventKey='Import/Export Keys' title='Import/Export Keys'>
// 		<Accordion defaultActiveKey='0' className='mx-3 mt-3'>
// 			<Accordion.Item eventKey='0'>
// 				<Accordion.Header>
// 					<IoSettingsOutline className='me-2' />
// 					General Settings
// 				</Accordion.Header>
// 				<Accordion.Body>
// 					<p>default key generation length</p>
// 				</Accordion.Body>
// 			</Accordion.Item>
// 			<Accordion.Item eventKey='1'>
// 				<Accordion.Header>
// 					<MdVpnKey className='me-2' /> Key Management
// 				</Accordion.Header>
// 				<Accordion.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Accordion.Body>
// 			</Accordion.Item>
// 		</Accordion>
// 	</Tab>
// </Tabs>

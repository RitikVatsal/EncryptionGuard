import React, { useState } from "react";
// Icons
import { IoSettingsOutline } from "react-icons/io5";
import { VscKey } from "react-icons/vsc";
import { RiFolderTransferLine } from "react-icons/ri";
// Bootstrap components
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// Custom Components
import SettingsNav from "../Components/SettingsNav";
import GeneralSettings from "./GeneralSettings";
import KeyManagement from "./KeyManagement";

function Settings() {
	const [settingsPage, setSettingsPage] = useState("Settings");
	return (
		<>
			{settingsPage === "Settings" ? (
				<div className='m-3'>
					<div className='m-3'>
						<SettingsNav icon={<IoSettingsOutline style={{ width: "20px", height: "20px" }} />} title='General' onClick={() => setSettingsPage("General")} />
						<SettingsNav icon={<VscKey style={{ width: "20px", height: "20px" }} />} title='Key Management' onClick={() => setSettingsPage("Key Management")} />
						<SettingsNav icon={<RiFolderTransferLine style={{ width: "20px", height: "20px" }} />} title='Keys Import/Export' onClick={() => setSettingsPage("Keys Import/Export")} />
					</div>
				</div>
			) : settingsPage === "General" ? (
				<GeneralSettings />
			) : settingsPage === "Key Management" ? (
				<KeyManagement />
			) : settingsPage === "Keys Import/Export" ? (
				<h1>Import/Export</h1>
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

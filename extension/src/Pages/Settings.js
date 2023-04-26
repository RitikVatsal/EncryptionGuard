import React, { useState } from "react";
// Icons
import { IoSettingsOutline } from "react-icons/io5";
import { VscKey } from "react-icons/vsc";
import { RiFolderTransferLine } from "react-icons/ri";
import { MdChevronLeft, MdOutlineInfo } from "react-icons/md";

// Bootstrap components

// Custom Components
import SettingsNav from "../Components/SettingsNav";
import GeneralSettings from "./GeneralSettings";
import KeyManagement from "./KeyManagement";
import ImportExportKeys from "./ImportExportKeys";

import "../Components/Settings.css";

function Settings() {
	const [settingsPage, setSettingsPage] = useState(0);
	return (
		<>
			{settingsPage > 9 && (
				<div className='d-flex align-items-center my-4 mx-2 btn w-25 back-btn' style={{ width: "auto", backgroundColor: "transparent" }} onClick={() => setSettingsPage(0)}>
					<MdChevronLeft style={{ width: "35px", height: "35px" }} />
					<h5 className='mb-0 ml-2'>Back</h5>
				</div>
			)}
			{settingsPage < 10 ? (
				<div className='mx-3 mt-5' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "80vh" }}>
					<div>
						<SettingsNav icon={<IoSettingsOutline style={{ width: "20px", height: "20px" }} />} title='General' onClick={() => setSettingsPage(11)} />
						<SettingsNav icon={<VscKey style={{ width: "20px", height: "20px" }} />} title='Key Management' onClick={() => setSettingsPage(12)} />
						<SettingsNav icon={<RiFolderTransferLine style={{ width: "20px", height: "20px" }} />} title='Keys Import/Export' onClick={() => setSettingsPage(13)} />
					</div>
					<div className='h-100 d-flex align-items-end w-100'>
						<div className='w-100'>
							<SettingsNav icon={<MdOutlineInfo />} title='About' />
						</div>
					</div>
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

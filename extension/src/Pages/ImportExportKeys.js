import React from "react";
import Button from "react-bootstrap/Button";
import { BsDownload } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function ImportExportKeys() {
	const exportKeys = () => {
		const keys = JSON.parse(localStorage.getItem("Keys"));
		const element = document.createElement("a");
		const file = new Blob([JSON.stringify(keys)], { type: "text/json" });
		element.href = URL.createObjectURL(file);
		element.download = "keys.json";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	const importKeys = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			const importedKeys = JSON.parse(reader.result);
			localStorage.setItem("Keys", JSON.stringify(importedKeys));
		};
		reader.readAsText(file);
	};

	return (
		<div className='my-5'>
			<div className='my-5 pt-3 pb-2' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
				<h4>Export Keys</h4>
				<Button variant='outline-dark' onClick={exportKeys} className='w-75'>
					<BsDownload className='me-3' /> Export Keys
				</Button>
			</div>

			<div className='my-5 pb-3 pt-2' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
				<h4>Import Keys</h4>
				{/* <input type='file' accept='application/json' onChange={importKeys} /> */}
				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Control type='file' accept='application/json' onChange={importKeys} />
				</Form.Group>
			</div>

			<Alert variant='warning' className='mx-3'>
				<Alert.Heading>Hey, nice to see you</Alert.Heading>
				<p>how to migrate keys to different device</p>
				<hr />
				<p className='mb-0'>need to export keys on frequest basis, for backup</p>
			</Alert>
		</div>
	);
}

export default ImportExportKeys;

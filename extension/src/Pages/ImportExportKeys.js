import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BsDownload } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
var CryptoJS = require("crypto-js");

function decrypt(ciphertext, key) {
	var bytes = CryptoJS.AES.decrypt(ciphertext, key);
	var originalText = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
}

function ImportExportKeys(props) {
	const [importSuccess, setImportSuccess] = useState(false);
	const exportKeys = () => {
		const keys = JSON.parse(localStorage.getItem("Keys"));
		for (let website in keys) {
			for (let key_name in keys[website]) {
				keys[website][key_name] = decrypt(keys[website][key_name], props.masterPassword);
			}
		}
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
			for (let website in importedKeys) {
				for (let key_name in importedKeys[website]) {
					importedKeys[website][key_name] = CryptoJS.AES.encrypt(importedKeys[website][key_name], props.masterPassword).toString();
				}
			}
			if (localStorage.getItem("Keys")) {
				confirmAlert({
					title: "Existing Keys Found",
					message: `How would you like to handle this??`,
					buttons: [
						{
							label: "Override",
							onClick: () => {
								localStorage.setItem("Keys", JSON.stringify(importedKeys));
								setImportSuccess(true);
								setTimeout(() => {
									setImportSuccess(false);
								}, 3000);
							},
						},
						{
							label: "Combine",
							onClick: () => {
								//TODO: handle duplicates also
								const existingKeys = JSON.parse(localStorage.getItem("Keys"));
								// if website does not already exist, add it
								for (let website in importedKeys) {
									if (!existingKeys[website]) {
										existingKeys[website] = importKeys[website];
									} else {
										for (let key_name in importedKeys[website]) {
											// duplicate name
											if (existingKeys[website][key_name]) {
												// duplicate name, different key
												if (decrypt(existingKeys[website][key_name], props.masterPassword) !== decrypt(importedKeys[website][key_name], props.masterPassword)) {
													existingKeys[website][key_name + "_imported"] = importedKeys[website][key_name];
												}
											} else existingKeys[website][key_name] = importedKeys[website][key_name];
										}
									}
								}
								localStorage.setItem("Keys", JSON.stringify(existingKeys));
								setImportSuccess(true);
								setTimeout(() => {
									setImportSuccess(false);
								}, 3000);
							},
						},
						{
							label: "Cancel",
							onClick: () => {
								return;
							},
						},
					],
				});
			}
			// reset the input field
			event.target.value = "";
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
				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Control type='file' accept='application/json' onChange={importKeys} />
				</Form.Group>
				{importSuccess && <Alert variant='success'>Keys Imported Successfully</Alert>}
			</div>

			<Alert variant='warning' className='mx-3'>
				<Alert.Heading>Warning</Alert.Heading>
				<hr />
				<p className='mb-0'>Do not share your exported keys.json file with anyone.</p>
			</Alert>
		</div>
	);
}

export default ImportExportKeys;

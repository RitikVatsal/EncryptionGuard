import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { MdDelete } from "react-icons/md";
import NoKeys from "../Images/3973480.svg";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../Components/Settings.css";
var CryptoJS = require("crypto-js");

function KeyManagement(props) {
	const [keys, setKeys] = useState(JSON.parse(localStorage.getItem("Keys")) || {});
	const [show, setShow] = useState(true);

	useEffect(() => {
		const storedKeys = JSON.parse(localStorage.getItem("Keys")) || {};
		setKeys(storedKeys);
	}, []);

	const handleDelete = (website, key_name) => {
		confirmAlert({
			title: "Confirm to Delete",
			message: `Are you sure you want to delete Key-${key_name}?`,
			buttons: [
				{
					label: "Yes",
					onClick: () => {
						const updatedKeys = { ...keys };
						delete updatedKeys[website][key_name];
						setKeys(updatedKeys);
						localStorage.setItem("Keys", JSON.stringify(updatedKeys));
					},
				},
				{
					label: "No",
					onClick: () => {
						return;
					},
				},
			],
		});
	};

	function decrypt(ciphertext, key) {
		var bytes = CryptoJS.AES.decrypt(ciphertext, key);
		var originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText;
	}

	function generateTable(website, Keys) {
		console.log(props.a);
		let table = [];
		for (let key_name in Keys[website]) {
			table.push(
				<tr key={website + "-" + key_name}>
					<td>{key_name}</td>
					<td>{decrypt(Keys[website][key_name], props.masterPassword)}</td>
					<td>
						<MdDelete className='delete-icon' style={{ width: "25px", height: "25px" }} id={website + "-" + key_name} onClick={() => handleDelete(website, key_name)} />
					</td>
				</tr>
			);
		}
		return table;
	}

	function generateAccordion() {
		let found_key = false;
		let accordion = [];
		for (let website in keys) {
			// check if website has any keys
			if (Object.keys(keys[website]).length == 0) continue;
			found_key = true;
			accordion.push(
				<Accordion.Item eventKey={website} key={website}>
					<Accordion.Header>{website}</Accordion.Header>
					<Accordion.Body className='px-0 !important'>
						<Table striped bordered hover className='mx-0 !important w-100'>
							<thead>
								<tr id={website}>
									<th>Key Name</th>
									<th>Key Value</th>
									<th></th>
								</tr>
							</thead>
							<tbody>{generateTable(website, keys)}</tbody>
						</Table>
					</Accordion.Body>
				</Accordion.Item>
			);
		}
		if (!found_key) setShow(false);
		return accordion;
	}
	return (
		<>
			{show ? (
				<Accordion className='mt-3'>{generateAccordion()}</Accordion>
			) : (
				<div className='mt-4 d-flex flex-column align-items-center justify-content-center'>
					<img src={NoKeys} alt='Keys Missing Image' height='150px' width='auto' />
					<h1 className='text-center mt-5'>No Keys Found</h1>
				</div>
			)}
		</>
	);
}

export default KeyManagement;

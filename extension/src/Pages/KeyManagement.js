import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { MdDelete } from "react-icons/md";
import NoKeys from "../Images/3973480.svg";

function KeyManagement() {
	const [keys, setKeys] = useState({});
	const [show, setShow] = useState(false);

	useEffect(() => {
		const storedKeys = JSON.parse(localStorage.getItem("Keys")) || {};
		setKeys(storedKeys);
	}, []);

	const handleDelete = (website, key_name) => {
		const updatedKeys = { ...keys };
		delete updatedKeys[website][key_name];
		setKeys(updatedKeys);
		localStorage.setItem("Keys", JSON.stringify(updatedKeys));
	};

	function generateTable(website, Keys) {
		let table = [];
		for (let key_name in Keys[website]) {
			table.push(
				<tr key={website + "-" + key_name}>
					<td>{key_name}</td>
					<td>{Keys[website][key_name]}</td>
					<td>
						<MdDelete className='text-danger' id={website + "-" + key_name} onClick={() => handleDelete(website, key_name)} />
					</td>
				</tr>
			);
		}
		return table;
	}

	function generateAccordion() {
		let accordion = [];
		for (let website in keys) {
			if (Object.keys(keys[website]).length === 0) continue;
			setShow(true);
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
		return accordion;
	}
	return (
		<>
			{show ? (
				<Accordion className='mt-3'>{generateAccordion()}</Accordion>
			) : (
				<>
					<div className='d-flex flex-column align-items-center justify-content-center'>
						<img src={NoKeys} alt='Keys Missing Image' style={{ transform: "scale(0.4)", marginBottom: "-150px" }} />
						<h1 className='text-center mt-5'>No Keys Found</h1>
					</div>
				</>
			)}
		</>
	);
}

export default KeyManagement;

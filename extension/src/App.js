import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
var CryptoJS = require("crypto-js");
import AddKeys_modal from "./Pages/AddKeys_modal";

const DEBUG = true;
function debug(parameterName, parameter) {
	if (DEBUG) console.log(parameterName + ": " + parameter);
}

function App() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	function encrypt(data) {
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), "secret key 123").toString();
		return ciphertext;
	}

	function decrypt(ciphertext) {
		var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
		var originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText;
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		debug("user input text", event.target.user_intput_text.value);
		const text = event.target.user_intput_text.value;
		// do encryption
		if (is_text_plaintext(text)) {
			const encrypted_text = encrypt(text);
			debug("Encrypted text", encrypted_text);

			// change the text in the text area
			event.target.user_intput_text.value = encrypted_text;
		}
		// do decryption
		else {
			const decrypted_text = decrypt(text);
			debug("Decrypted text", decrypted_text);

			// change the text in the text area
			event.target.user_intput_text.value = decrypted_text;
		}
	};

	function is_text_plaintext(text) {
		// ciphertext doesnt contain spaces and has length greater than 15
		text = text.trim();
		return text.includes(" ") || text.length < 15 ? true : false;
	}
	return (
		<div className='App mt-4'>
			<h1 className='title'>Encryption Guard</h1>
			<Form className='m-3' onSubmit={handleSubmit}>
				<FloatingLabel controlId='user_intput_text' label='Enter your plaintext/ciphertext here' className='my-2'>
					<Form.Control as='textarea' placeholder='Enter your plaintext/ciphertext here' style={{ minHeight: "50vh" }} />
				</FloatingLabel>

				<div className='d-flex my-3'>
					<Form.Select aria-label='Default select example' className='me-2'>
						<option>Open this select menu</option>
						<option value='1'>One</option>
						<option value='2'>Two</option>
						<option value='3'>Three</option>
					</Form.Select>
					<Button variant='dark' onClick={handleShow}>
						+
					</Button>
				</div>
				<Button variant='dark' type='submit' className='mt-5 mb-2' style={{ width: "100%" }}>
					Submit
				</Button>
			</Form>

			{/* <!-- Modal --> */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Keys</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddKeys_modal />
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer> */}
			</Modal>
		</div>
	);
}

export default App;

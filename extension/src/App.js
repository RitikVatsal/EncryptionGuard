import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
var CryptoJS = require("crypto-js");

function App() {
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
		console.log(event.target.user_intput_text.value);
		const encrypted_text = encrypt(event.target.user_intput_text.value);
		console.log(encrypted_text);
		const decrypted_text = decrypt(encrypted_text);
		console.log(decrypted_text);
	};

	return (
		<div className='App mt-5'>
			<h1 className='title'>Encryption Guard</h1>
			<Form className='m-3' onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='user_intput_text'>
					<Form.Control style={{ minHeight: "60vh" }} placeholder='Enter your plaintext/ciphertext here' />
				</Form.Group>

				<Button variant='dark' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default App;

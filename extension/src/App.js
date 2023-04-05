import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
var CryptoJS = require("crypto-js");
import AddKeys_modal from "./Pages/AddKeys_modal";
import Select from "react-select";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CopyButton from "./Components/copyButton";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./Pages/Settings";

const popover = (
	<Popover id='popover-basic'>
		<Popover.Header as='h3'>Popover right</Popover.Header>
		<Popover.Body>
			And here's some <strong>amazing</strong> content. It's very engaging. right?
		</Popover.Body>
	</Popover>
);

const DEBUG = true;
function debug(parameterName, parameter) {
	if (DEBUG) console.log(parameterName + ": " + parameter);
}

function App() {
	const [addKeyModalVisible, setAddKeyModalVisible] = useState(false);
	const [keySelected, setKeySelected] = useState(null);
	const [keySelectionError, setKeySelectionError] = useState(false);
	const [detectionMode, setDetectionMode] = useState(1); // 1: auto, 2: encrypt, 4: decrypt, 3: auto (plaintext detected), 5: auto (ciphertext detected)
	const [validated, setValidated] = useState(false);
	const [coptVisible, setCopyVisible] = useState(false);
	const [status, setStatus] = useState("");
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [anyFormError, setAnyFormError] = useState(false); // for height of textbox

	const handleClose = () => setAddKeyModalVisible(false);
	const handleShow = () => setAddKeyModalVisible(true);

	function encrypt(pllaintext, key) {
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(pllaintext), key).toString();
		return ciphertext;
	}

	function decrypt(ciphertext, key) {
		var bytes = CryptoJS.AES.decrypt(ciphertext, key);
		var originalText = bytes.toString(CryptoJS.enc.Utf8);
		// slice to remove extra quotes at beginning and end
		return originalText.slice(1, -1);
	}

	const toggle_encrypt_or_decrypt = (text, key) => {
		if (detectionMode == 2) return encrypt(text, key);
		else if (detectionMode == 4) return decrypt(text, key);
		else if (is_text_plaintext(text)) {
			setDetectionMode(3);
			setStatus("Encrypted");
			return encrypt(text, key);
		} else {
			setDetectionMode(5);
			setStatus("Decrypted");
			return decrypt(text, key);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event);

		if (event.currentTarget.checkValidity() === false) {
			event.stopPropagation();
			setValidated(true);
			setAnyFormError(true);
		} else {
			if (keySelected == null) {
				setKeySelectionError(true);
				return;
			}
			setAnyFormError(false);
			setKeySelectionError(false);
			const text = event.target.user_input_text.value;
			debug("user input text", text);

			// change the text in the text area
			event.target.user_input_text.value = toggle_encrypt_or_decrypt(text, keySelected.value);
			debug("Transformed text", toggle_encrypt_or_decrypt(text, keySelected.value));
			setValidated(false);

			setCopyVisible(true);
		}
	};

	function is_text_plaintext(text) {
		// ciphertext doesnt contain spaces and has length greater than 15
		text = text.trim();
		return text.includes(" ") || text.length < 15 ? true : false;
	}

	const generateKeyOptions = () => {
		const keys = JSON.parse(localStorage.getItem("Keys"));
		let keyOptions = [];
		for (let website in keys) {
			let options = [];
			for (let key in keys[website]) options.push({ value: key, label: key });
			keyOptions.push({ label: website, options: options });
		}
		debug("key options", keyOptions);
		return keyOptions;
	};

	const handleSelectChange = (selectedOption) => {
		setKeySelected(selectedOption);
		setKeySelectionError(false);
		setStatus("");
		if (detectionMode % 2 == 1) setDetectionMode(1);
	};
	const formatGroupLabel = (data) => (
		<div className='groupStyles d-flex justify-content-between'>
			<span>{data.label}</span>
			<span className='groupBadgeStyles'>{data.options.length}</span>
		</div>
	);

	const handleInputChange = (event) => {
		// if value is empty, hide copy button
		if (event.target.value == "") {
			setCopyVisible(false);
			setAnyFormError(true);
		} else setAnyFormError(false);
		setStatus("");
		if (detectionMode % 2 == 1) setDetectionMode(1);
	};
	return (
		<div className='App mt-4'>
			<div className='d-flex justify-content-between mx-3'>
				<h1 className='title w-100'>Encryption Guard</h1>
				<AiFillSetting className='settings-icon' onClick={() => setSettingsVisible(!settingsVisible)} />
			</div>
			{settingsVisible ? (
				<Settings />
			) : (
				<Form noValidate validated={validated} className='m-3' onSubmit={handleSubmit} id='form'>
					<div style={{ position: "relative" }}>
						<FloatingLabel controlId='user_input_text' label={`Enter your ${detectionMode == 1 ? "plaintext/ciphertext" : detectionMode == 2 ? "plaintext" : "ciphertext"} here`} className='my-2'>
							<Form.Control required as='textarea' placeholder={`Enter your ${detectionMode == 1 ? "plaintext/ciphertext" : detectionMode == 2 ? "plaintext" : "ciphertext"} here`} style={{ minHeight: anyFormError ? "275px" : "300px" }} onChange={handleInputChange} />
							<Form.Control.Feedback type='invalid'>Please enter some text</Form.Control.Feedback>
						</FloatingLabel>
						{coptVisible && <CopyButton className='position-absolute top-0 end-0 mt-2 me-2' idOfElementToCopy='user_input_text' />}
					</div>

					<div className='d-flex mt-3'>
						<Select options={generateKeyOptions()} value={keySelected} onChange={handleSelectChange} formatGroupLabel={formatGroupLabel} className='w-100 me-2' placeholder={`Select the key ${detectionMode == 1 ? "" : detectionMode == 2 ? "to encrypt" : "to decrypt"}`} />
						<OverlayTrigger trigger='hover' placement='left' overlay={popover}>
							<Button variant='dark' onClick={handleShow}>
								+
							</Button>
						</OverlayTrigger>
					</div>
					{keySelectionError && <p className='text-danger'>Please select a key</p>}
					<Form.Group className='mb-2 mt-3' controlId='form_keyName'>
						<span>Detection Mode</span>
						<ButtonGroup className='mb-2 w-100'>
							<Button variant={detectionMode % 2 == 1 ? "dark" : "outline-dark"} className='w-25' onClick={() => setDetectionMode(1)}>
								Auto
							</Button>
							<Button variant={detectionMode == 2 ? "dark" : detectionMode == 3 ? "secondary" : "outline-dark"} className='w-25' onClick={() => setDetectionMode(2)}>
								Encrypt
							</Button>
							<Button variant={detectionMode == 4 ? "dark" : detectionMode == 5 ? "secondary" : "outline-dark"} className='w-25' onClick={() => setDetectionMode(4)}>
								Decrypt
							</Button>
						</ButtonGroup>
					</Form.Group>

					<button className='button rounded w-100 mt-2' type='submit' onClick={() => document.getElementById("form").dispatchEvent(new Event("submit"))}>
						<p className='btnText'>{status.length ? status : detectionMode == 2 ? "Encrypt" : detectionMode == 4 ? "Decrypt" : "Convert"}</p>
						<div className='btnTwo'>
							<p className='btnText2'>GO!</p>
						</div>
					</button>
				</Form>
			)}
			<Modal show={addKeyModalVisible} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Keys</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddKeys_modal />
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default App;

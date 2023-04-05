import CreatableSelect from "react-select/creatable";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { generatePassword } from "@nikitababko/password-generator";
import CopyButton from "../Components/copyButton";

function init_LocalStorage() {
	if (!localStorage.getItem("websiteOptions")) {
		localStorage.setItem("websiteOptions", JSON.stringify(["WhatsApp", "Telegram", "Discord"]));
	}
}
function createOption(label) {
	return {
		label,
		value: label,
	};
}
function set_defaultOptions() {
	let websiteOptions = JSON.parse(localStorage.getItem("websiteOptions"));

	for (let i = 0; i < websiteOptions.length; i++) {
		websiteOptions[i] = createOption(websiteOptions[i]);
	}
	return websiteOptions;
}
function AddKeys_modal() {
	init_LocalStorage();
	const [isLoading, setIsLoading] = useState(false);
	const [websiteOptions, setWebsiteOptions] = useState(set_defaultOptions());
	const [websiteValue, setWebsiteValue] = useState(null);
	const [savedKeys, setSavedKeys] = useState(false);
	const [validated, setValidated] = useState(false);
	const [websiteOptionError, setWebsiteOptionError] = useState(false);
	const [copy, setCopy] = useState(false);

	const update_LocalStorage = (value) => {
		let websiteOptions = JSON.parse(localStorage.getItem("websiteOptions"));
		websiteOptions.push(value);
		localStorage.setItem("websiteOptions", JSON.stringify(websiteOptions));
	};

	const handleCreate = (inputValue) => {
		setIsLoading(true);
		setTimeout(() => {
			const newOption = createOption(inputValue);
			setIsLoading(false);
			setWebsiteOptions((prev) => [...prev, newOption]);
			setWebsiteValue(newOption);
			update_LocalStorage(inputValue);
		}, 2000);
	};

	const handle_websiteOptionChange = (newValue) => {
		setWebsiteValue(newValue);
		setWebsiteOptionError(false);
	};

	const generateKey = () => {
		const keyLength = localStorage.getItem("DefaultKeyLength") ? localStorage.getItem("DefaultKeyLength") : 26;
		const password = generatePassword({ length: keyLength });
		console.log(password);
		document.getElementById("form_key").value = password;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!websiteValue || websiteValue.value == "") {
			setWebsiteOptionError(true);
			return;
		}

		if (event.currentTarget.checkValidity() === false) {
			event.stopPropagation();
			setValidated(true);
		} else {
			const entered_website = websiteValue.value;
			const entered_keyName = event.target.form_keyName.value;
			const entered_key = event.target.form_key.value;

			let Keys = JSON.parse(localStorage.getItem("Keys"));
			if (!Keys) Keys = {};
			if (!Keys[entered_website]) Keys[entered_website] = {};
			Keys[entered_website][entered_keyName] = entered_key;
			localStorage.setItem("Keys", JSON.stringify(Keys));

			setSavedKeys(true);
			setTimeout(() => {
				setSavedKeys(false);
			}, 3000);
			// reset form
			setValidated(false);
			event.target.form_keyName.value = "";
			event.target.form_key.value = "";
			setWebsiteValue(null);
		}
	};

	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				{/* Website Name - WhatsApp, Telegram etc. */}
				<Form.Group className='mb-3' controlId='form_website'>
					<Form.Label>Website</Form.Label>
					<CreatableSelect isClearable isDisabled={isLoading} isLoading={isLoading} onChange={handle_websiteOptionChange} onCreateOption={handleCreate} options={websiteOptions} value={websiteValue} />
					{websiteOptionError && <p className='text-danger'>Please select a website</p>}
				</Form.Group>

				{/* Key name - that users enters and use to identify particular key */}
				<Form.Group className='mb-3' controlId='form_keyName'>
					<Form.Label>Add a name to the key</Form.Label>
					<Form.Control required type='text' placeholder='...to identify this key (like recipient name)' />
					<Form.Control.Feedback type='invalid'>Please provide a name</Form.Control.Feedback>
				</Form.Group>

				{/* Key */}
				<Form.Group className='mb-3' controlId='form_key'>
					<div class='d-flex align-items-center justify-content-between'>
						<Form.Label className='me-3'>Key</Form.Label>
						<CopyButton idOfElementToCopy='form_key' />
					</div>
					<div class='d-flex justify-content-between w-100'>
						<Form.Control required id='form_key' type='text' placeholder='A Strong Key' />
						<Button variant='dark' onClick={generateKey} className='ms-1'>
							Generate
						</Button>
					</div>
					<Form.Control.Feedback type='invalid'>Please provide a valid key</Form.Control.Feedback>
				</Form.Group>

				{/* Submit button */}
				<Button variant='dark' type='submit' size='sm' className='mb-2 mt-5 w-100'>
					Store
				</Button>
				{savedKeys && <p className='text-success'>Key saved successfully</p>}
			</Form>
		</>
	);
}

export default AddKeys_modal;

import CreatableSelect from "react-select/creatable";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!websiteValue || websiteValue.value == "") {
			setWebsiteOptionError(true);
			return;
		}

		if (event.currentTarget.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);

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
	};

	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='form_website'>
					<Form.Label>Website</Form.Label>
					<CreatableSelect isClearable isDisabled={isLoading} isLoading={isLoading} onChange={handle_websiteOptionChange} onCreateOption={handleCreate} options={websiteOptions} value={websiteValue} />
					{websiteOptionError && <p className='text-danger'>Please select a website</p>}
				</Form.Group>
				<Form.Group className='mb-3' controlId='form_keyName'>
					<Form.Label>Add a name to the key</Form.Label>
					<Form.Control required type='text' placeholder='...to identify this key (like recipient name)' />
					<Form.Control.Feedback type='invalid'>Please provide a name</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className='mb-3' controlId='form_key'>
					<Form.Label>Key</Form.Label>
					<Form.Control required type='text' placeholder='We suggest pasting the key' />
					<Form.Control.Feedback type='invalid'>Please provide a valid key</Form.Control.Feedback>
				</Form.Group>
				<Button variant='dark' type='submit' className='my-2'>
					Store
				</Button>
				{savedKeys && <p className='text-success'>Key saved successfully</p>}
			</Form>
		</>
	);
}

export default AddKeys_modal;

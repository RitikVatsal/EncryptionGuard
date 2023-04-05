import React, { useEffect, useState } from "react";
// Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function GeneralSettings() {
	const [validated, setValidated] = useState(false);
	const [keyLengthError, setKeyLengthError] = useState(false);
	const [keyLength, setKeyLength] = useState(localStorage.getItem("DefaultKeyLength") ? localStorage.getItem("DefaultKeyLength") : 26);
	const [saveStatue, setSaveStatus] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (event.target.form_keyLength.value < 10 || event.target.form_keyLength.value > 35) {
			setKeyLengthError(true);
		}
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setValidated(true);
		} else {
			setKeyLengthError(false);
			localStorage.setItem("DefaultKeyLength", keyLength);

			// Set save status to true for 3 seconds
			setSaveStatus(true);
			useTimeout(() => {
				setSaveStatus(false);
			}, 3000);
		}
	};

	return (
		<Form noValidate validated={validated} className='m-3' onSubmit={handleSubmit}>
			<Form.Group className='mb-3' controlId='form_keyLength'>
				<div class='d-flex justify-content-between align-items-center'>
					<Form.Label style={{ margin: "auto 0" }}>Default Key generation length </Form.Label>
					<Form.Control required type='number' min='10' max='35' step='1' placeholder='Min: 10, Max: 35 (Default=26)' style={{ width: "100px" }} value={keyLength} onChange={(e) => setKeyLength(e.target.value)} />
				</div>
				{keyLengthError && <p className='text-danger'>Please enter a value between 10 and 35</p>}
			</Form.Group>

			<Button variant='dark' type='submit' size='sm' className='mb-2 mt-5 w-100'>
				Save
			</Button>
		</Form>
	);
}

export default GeneralSettings;

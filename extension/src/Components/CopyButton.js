import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BsClipboard, BsCheck2 } from "react-icons/bs";

function CopyButton(props) {
	const [copy, setCopy] = useState(false);
	const handleCopy = () => {
		const element = document.getElementById(props.idOfElementToCopy);
		navigator.clipboard.writeText(element.value);
		setCopy(true);
		setTimeout(() => {
			setCopy(false);
		}, 3000);
	};
	return (
		<div className={props.className}>
			<Button variant='light' size='sm' onClick={handleCopy} className='mb-2 ms-5 me-0 align-items-center' hidden={document.getElementById("form-key") && document.getElementById("form-key").value.length < 1}>
				{copy ? (
					<span className='text-success'>
						<BsCheck2 className='me-1' /> Copied
					</span>
				) : (
					<>
						<BsClipboard className='me-1' /> Copy
					</>
				)}
			</Button>
		</div>
	);
}

export default CopyButton;

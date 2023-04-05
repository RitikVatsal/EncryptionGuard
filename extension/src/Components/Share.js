import React from "react";
import Button from "react-bootstrap/Button";
import { MdWhatsapp } from "react-icons/md";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
function Share(url) {
	console.log("url", url);
	// function to url encode the text
	const urlEncode = (text) => {
		return encodeURIComponent(text);
	};
	const openInNewTab = (url) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};
	return (
		<div className='mb-2 mx-3'>
			<Button variant='outline-success' onClick={() => openInNewTab(`https://web.whatsapp.com/send/?text=${urlEncode(url)}`)}>
				<MdWhatsapp className='me-2' style={{ width: "25px", height: "25px" }} />
				Share on Whatsapp
			</Button>
		</div>
	);
}

export default Share;

import React from "react";
import Button from "react-bootstrap/Button";
import { MdWhatsapp } from "react-icons/md";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
function Share(props) {
	const openInNewTab = (url) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};
	return (
		<div className='mb-2 mx-3'>
			<Button variant='outline-success' onClick={() => openInNewTab(`https://web.whatsapp.com/send/?text=${encodeURIComponent(props.url)}`)}>
				<MdWhatsapp className='me-2' style={{ width: "25px", height: "25px" }} />
				Share on Whatsapp
			</Button>
		</div>
	);
}

export default Share;

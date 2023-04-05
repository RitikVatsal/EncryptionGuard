import React from "react";

import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
function Share(url) {
	console.log("url", url);

	return (
		<div className='my-5'>
			<div>
				{/* https://web.whatsapp.com/send/?phone=+918700114640&text=sample+text */}
				<a href={`https://web.whatsapp.com/send/?text=${url}`}>Share on Whatsapp</a>
			</div>
		</div>
	);
}

export default Share;

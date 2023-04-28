import React from "react";
import Button from "react-bootstrap/Button";
function About() {
	const openFullscreenVideo = () => {
		const url = chrome.runtime.getURL("./video.html");
		chrome.tabs.create({ url });
	};
	return (
		<>
			<h1>About Us</h1>
			<p className='mx-5 my-3 text-secondary text-justify' style={{ textAlign: "justify" }}>
				Encryption Guard is a browser extension that lets you encrypt your messages on demand with a simple click. You can share your encrypted messages via any instant messaging platforms without worrying about your privacy and security. Encryption Guard uses millitary grade AES encryption, a technology that encrypts your messages and no one else can decrypt it without you sharing the key with which you encrypted the message. Encryption Guard is easy to use, reliable, and free. <br />
				Our moto is <strong>"Your Messages • Your Privacy • Our Encryption"</strong>
				<br />
				Try it today and protect your online conversations.
			</p>

			<Button variant='outline-dark' onClick={openFullscreenVideo} className=' m-4 px-4'>
				<div className='d-flex justify-content-center align-items-center'>Introduction Video</div>
			</Button>
		</>
	);
}

export default About;

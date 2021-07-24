//Import Modules
import React from "react";

//Deconstructs the props coming into the component and uses them to create a URL
const Photo = ({ server, id, secret, title }) => {
	let url = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
	return (
		<li>
			<img src={url} alt={title} />
		</li>
	);
};

export default Photo;

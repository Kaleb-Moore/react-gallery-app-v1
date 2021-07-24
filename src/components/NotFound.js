//Import Modules
import React from "react";

// Not Found page for if the results of a search equal zero
function NotFound() {
	return (
		<li className="not-found">
			<h3>No Results Found</h3>
			<p>You search did not return any results. Please try again.</p>
		</li>
	);
}

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<div className="container alert-danger alert mt-5">
			<p>Page Not Found</p>
			Try this link <Link to="/">Posts</Link>
		</div>
	);
};

export default PageNotFound;

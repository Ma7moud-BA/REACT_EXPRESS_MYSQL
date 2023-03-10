const { verify } = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// we want to make only people who logged in to make a comment
// so we want to make a validation middleware to check if the person is has the correct jwt in their session storage

// so grap the tocken from the frontend then validate using the jwt verify functnion if its valid continue with the reques if not cut it off and return error

//this function will run before a request
const validateJwtToken = (req, res, next) => {
	const accessToken = req.header("accessToken");
	if (!accessToken)
		return res.status(409).json({ error: "User not logged In!" });
	try {
		const validToken = verify(accessToken, JWT_SECRET_KEY);
		//validToken holds the username and the id that is set to the make the tocken, so here we can add a parameter to the req to use it to submit the commint to the db
		req.user = validToken;
		if (validToken) {
			return next();
		}
	} catch (err) {
		return res.json({ error: err });
	}
};
module.exports = { validateJwtToken };

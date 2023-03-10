const { Users } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { sign } = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const addUser = async (req, res) => {
	//make sure to hash the password before storing it in the db
	//to do this destructure the object
	const { username, password } = req.body;
	const user = await Users.findOne({ where: { username: username } });
	if (user) return res.status(409).json("name already taken");
	bcrypt.hash(password, 10).then((hash) => {
		Users.create({
			username: username,
			password: hash,
		});
		res.status(200).json("user added successfully");
	});
};
const login = async (req, res) => {
	const { username, password } = req.body;
	const user = await Users.findOne({ where: { username: username } });
	if (!user) return res.status(409).json("user not found");
	//bcrypt.compare compares the password with the hashed password in the db, the match arg holds true or false depending if the passwords matches or not

	bcrypt.compare(password, user.password).then((match) => {
		if (!match) return res.json("wrong password!");

		//we want to generate a token whenever the user logged in, this token will hold information about the user, then we want to return this token to store it in the session storage
		//a better way is to store it in the cookies
		//jwt will hash the data
		const accessToekn = sign(
			{ username: user.username, id: user.id },
			JWT_SECRET_KEY
		);
		res.json(accessToekn);
	});
};
const getProfile = async (req, res) => {
	const userId = req.params.id;
	const user = await Users.findByPk(userId, {
		attributes: { exclude: ["password"] },
	});
	if (!user) return res.status(404).json("profile not found");
	res.status(200).json(user);
};

module.exports = { addUser, login, getProfile };

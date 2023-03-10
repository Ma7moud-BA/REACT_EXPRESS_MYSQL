const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const APP_PORT = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
//Routes
const postRoute = require("./routes/posts.js");
app.use("/posts", postRoute);

const commentsRoute = require("./routes/comments.js");
app.use("/comments", commentsRoute);

const usersRoute = require("./routes/users.js");
app.use("/auth", usersRoute);

// require all the tables from the models folder
const db = require("./models");
//this will make sure that the tables exists in the database if not made them
db.sequelize.sync().then(() => {
	app.listen(APP_PORT, () => {
		console.log("app running ");
	});
});

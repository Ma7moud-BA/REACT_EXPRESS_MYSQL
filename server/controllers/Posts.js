const { Posts } = require("../models");

const getPosts = async (req, res) => {
	const listOfPosts = await Posts.findAll();
	res.json(listOfPosts);
};

const getPost = async (req, res) => {
	//Posts.findByPk means find by primary key
	const listOfPosts = await Posts.findByPk(req.params.id);
	res.json(listOfPosts);
};
const getPostByUserId = async (req, res) => {
	const id = req.params.byuserid;
	const listOfPosts = await Posts.findAll({ where: { UserId: id } });
	res.json(listOfPosts);
};
const addPost = async (req, res) => {
	// the client will send the data in a json format, so its going to be an object, containing three different properties
	// the body will hold the incoming data from the client
	//Posts.create is a sequelize funciton to insert somehitng to the posts table
	//important note use asyn function whenere you want to use a sequelize funciont
	const post = req.body;
	const username = req.user.username;
	post.username = username;
	post.UserId = req.user.id;
	//attach the username to the post before sending it back to the client using the jwt validation
	await Posts.create(post);
	res.json(post);
};
const deletePost = async (req, res) => {
	const PostIdToDelete = req.params.PostId;

	await Posts.destroy({
		where: {
			id: PostIdToDelete,
		},
	});
	res.json("Post deleted");
};

module.exports = { getPosts, addPost, getPost, deletePost, getPostByUserId };

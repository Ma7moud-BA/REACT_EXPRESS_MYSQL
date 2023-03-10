const { Comments } = require("../models");
const getCommentsFromPostId = async (req, res) => {
	//Posts.findByPk means find by primary key
	const postId = req.params.id;
	// this will go the the comments table and grap all the comments where the post id matches
	// the PostId column in the comments table is made from the association made in the models/Posts.js
	const listOfComments = await Comments.findAll({ where: { PostId: postId } });
	res.json(listOfComments);
};
const addComment = async (req, res) => {
	const comment = req.body;
	//adding the username to the comment before submitting it to the db,req.user is a custome parameter made in the Authmiddleware
	const username = req.user.username;
	comment.username = username;

	await Comments.create(comment);
	res.json(comment);
};
const deleteComment = async (req, res) => {
	//usually in a delete request the client pass an id and you delete the post with that id
	const commentId = req.params.commentId;
	await Comments.destroy({
		where: {
			id: commentId,
		},
	});
	res.json("comment deleted");
};

module.exports = { getCommentsFromPostId, addComment, deleteComment };

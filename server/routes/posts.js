const express = require("express");
const router = express.Router();
const {
	getPosts,
	addPost,
	getPost,

	deletePost,
	getPostByUserId,
} = require("../controllers/Posts.js");
const { validateJwtToken } = require("../middlewares/AuthMiddleware.js");

router.get("/", getPosts);
router.post("/", validateJwtToken, addPost);
router.get("/:id", getPost);
router.get("/byuser/:byuserid", getPostByUserId);
router.delete("/:PostId", validateJwtToken, deletePost);

module.exports = router;

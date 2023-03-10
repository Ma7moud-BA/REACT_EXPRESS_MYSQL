const express = require("express");
const router = express.Router();
const { validateJwtToken } = require("../middlewares/AuthMiddleware.js");

const {
	getCommentsFromPostId,
	addComment,
	deleteComment,
} = require("../controllers/Comments.js");

router.get("/:id", getCommentsFromPostId);
router.post("/:id", validateJwtToken, addComment);
router.delete("/:commentId", validateJwtToken, deleteComment);
module.exports = router;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
const SinglePost = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const postId = useParams().id;
	const [post, setPost] = useState([]);
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	useEffect(() => {
		const fetchPostsAndComments = async () => {
			try {
				const post = await axios.get(`http://localhost:8001/posts/${postId}`);
				setPost(post.data);
			} catch (err) {
				console.log(err);
			}
		};
		const fetchComments = async () => {
			try {
				const comments = await axios.get(
					`http://localhost:8001/comments/${postId}`
				);
				setComments(comments.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchPostsAndComments();
		fetchComments();
	}, []);

	const handleOnChangeCommnet = (e) => {
		setCommentText(e.target.value);
	};
	const handleSubmitCommment = async (e) => {
		e.preventDefault();
		const commentInput = document.getElementById("commentInput");
		if (commentText) {
			try {
				const res = await axios.post(
					`http://localhost:8001/comments/:${postId}`,
					{
						commentBody: commentText,
						PostId: postId,
					},
					{
						headers: { accessToken: localStorage.getItem("accessToken") },
					}
				);

				commentInput.value = "";
			} catch (err) {
				console.log(err);
			}
			const fetchComments = async () => {
				try {
					const comments = await axios.get(
						`http://localhost:8001/comments/${postId}`
					);
					setComments(comments.data);
				} catch (err) {
					console.log(err);
				}
			};
			fetchComments();
		}
	};
	const handledeleteComment = async (id) => {
		await axios.delete(`http://localhost:8001/comments/${id}`, {
			headers: { accessToken: localStorage.getItem("accessToken") },
		});
		//this will remove the comment from the page without fetching the data one more time
		setComments(
			comments.filter((comment) => {
				return comment.id != id;
			})
		);
	};

	const handleDeletePost = async (id) => {
		await axios.delete(`http://localhost:8001/posts/${id}`, {
			headers: { accessToken: localStorage.getItem("accessToken") },
		});
		navigate("/");
	};
	return (
		post && (
			<div className="container ">
				<div
					key={post.id}
					className="card my-5 "
					onClick={() => {
						navigate(`/${post.id}`);
					}}
				>
					<div className="card-body">
						<h1 className="card-title bg-primary p-2 fs-3 ">{post.title}</h1>
						<p className="card-text p-2">{post.postText}</p>
						<p className="card-text bg-primary p-2">by {post.username}</p>
						{user.username === post.username && (
							<button
								className="btn btn-danger"
								onClick={() => {
									handleDeletePost(post.id);
								}}
							>
								Delete Post
							</button>
						)}
					</div>
				</div>
				<div className="container bg-dark text-light p-2">
					<form className="py-3 rounded-2">
						<input
							id="commentInput"
							onChange={handleOnChangeCommnet}
							type="text"
							className="form-control py-2  "
							placeholder="comment..."
						/>
						<button
							className="btn btn-danger my-4"
							onClick={handleSubmitCommment}
						>
							Add Comment
						</button>
					</form>
					<div>
						{comments && (
							<div>
								{comments.map((comment) => {
									return (
										<div
											key={comment.id}
											className="border my-2 p-4 d-flex gap-4"
										>
											<div className="my-auto ">
												by{" "}
												<span className="text-primary">{comment.username}</span>
											</div>
											<div>
												<div>{comment.commentBody}</div>
												<span className="text-info ">{comment.createdAt}</span>
											</div>
											{/* only disply the delete button if you are the owner of the comment */}
											{user.username === comment.username && (
												<button
													className="btn btn-danger ms-auto"
													onClick={() => {
														handledeleteComment(comment.id);
													}}
												>
													Delete
												</button>
											)}
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		)
	);
};

export default SinglePost;

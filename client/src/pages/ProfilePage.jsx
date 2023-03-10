import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
	const [userInfo, setUserInfo] = useState({});
	const [userPosts, setUserPosts] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		try {
			const getUserInfo = async (id) => {
				const userInfo = await axios.get(
					`http://localhost:8001/auth/profile/${id}`
				);
				setUserInfo(userInfo.data);
			};
			const getUserPosts = async (id) => {
				const userPosts = await axios.get(
					`http://localhost:8001/posts/byuser/${id}`
				);

				setUserPosts(userPosts.data);
			};
			getUserPosts(id);
			getUserInfo(id);
		} catch (err) {
			console.log(err);
		}
	}, []);
	return (
		<div className="container">
			<h2 className="mt-5 bg-dark text-danger p-2">
				Username: {userInfo.username}
			</h2>
			<h2 className="mt-5 bg-dark text-danger p-4">Posts</h2>
			{userPosts &&
				userPosts.map((post) => {
					return (
						<div
							key={post.id}
							className="card my-5  "
							onClick={() => {
								navigate(`/${post.id}`);
							}}
						>
							<div className="card-body">
								<h1 className="card-title bg-primary fs-3 ">{post.title}</h1>
								<p className="card-text">{post.postText}</p>
								<p className="card-text bg-primary">by {post.username}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ProfilePage;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import tumbleweed from "../images/tumbleweed.png";
const Home = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		//you can use if(!user.isLoggedIn) but when refreshing the page the state is not chaned yet so it will redirect us to the login page every time we refresh, so we check by the localstorage
		if (!localStorage.getItem("accessToken")) {
			navigate("/login");
		} else {
			const fetchPosts = async () => {
				try {
					const posts = await axios.get("http://localhost:8001/posts");
					setPosts(posts.data);
				} catch (err) {
					console.log(err);
				}
			};
			fetchPosts();
		}
	}, []);

	if (posts.length > 0) {
		return (
			<div className="container text-center  p-3  vh-100  ">
				{posts.map((post) => {
					return (
						<div key={post.id} className="card my-5 ">
							<div className="card-body ">
								<h1
									className="card-title bg-primary fs-3 "
									onClick={() => {
										navigate(`/${post.id}`);
									}}
								>
									{post.title}
								</h1>
								<p className="card-text">{post.postText}</p>
								<p className="card-text bg-primary">
									by{" "}
									<Link to={`/profile/${post.UserId}`}>
										<span className="text-warning fw-bold">
											{post.username}
										</span>
									</Link>
								</p>
							</div>
						</div>
					);
				})}
			</div>
		);
	} else {
		return (
			<div className="container text-center mt-5 ">
				<img src={tumbleweed} style={{ width: "300px" }} />
				<p className="alert alert-danger mt-2">
					No Posts Yet! <Link to="/create-post"> Create a Post</Link>
				</p>
			</div>
		);
	}
};

export default Home;

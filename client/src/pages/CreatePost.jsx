import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
const CreatePost = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("accessToken")) {
			navigate("/login");
		}
	}, []);
	const [inputs, setInputs] = useState({
		title: "",
		postText: "",
		username: "",
	});
	const handleOnChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8001/posts", inputs, {
				headers: { accessToken: localStorage.getItem("accessToken") },
			});
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<form className="container p-3 bg-dark text-danger">
			<div className="mb-3">
				<label className="form-label">Post Title</label>
				<input
					type="text"
					name="title"
					className="form-control"
					onChange={handleOnChange}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Post Text</label>
				<input
					type="text"
					name="postText"
					className="form-control"
					onChange={handleOnChange}
				/>
			</div>

			<button type="submit" className="btn btn-primary" onClick={handleSubmit}>
				Submit
			</button>
		</form>
	);
};

export default CreatePost;

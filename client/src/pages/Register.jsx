import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();
	const [err, setErr] = useState("");
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const handleOnChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleRegister = async (e) => {
		e.preventDefault();
		if (inputs.username !== "") {
			if (inputs.password !== "") {
				try {
					await axios.post("http://localhost:8001/auth/", inputs);
					navigate("/");
				} catch (err) {
					console.log(err);
					setErr(err.response.data);
				}
			} else {
				setErr("Password is required");
			}
		} else {
			setErr("Username is required");
		}
	};
	return (
		<div className="container vh-100 d-flex align-items-center justify-content-center text-primary ">
			<form className="text-start w-75 p-5 border-primary border-4  border ">
				<h1 className="text-center text-dark">Register</h1>

				<label className="form-label">Username</label>
				<input
					name="username"
					type="text "
					className="form-control"
					onChange={handleOnChange}
				/>
				<label className="form-label">Password</label>
				<input
					name="password"
					type="text "
					className="form-control"
					onChange={handleOnChange}
				/>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary mt-4"
					onClick={handleRegister}
				/>
				{err && <p className="text-warning">{err} !</p>}
				<p>
					Already registered? <Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;

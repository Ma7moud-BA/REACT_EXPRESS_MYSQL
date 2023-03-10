import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const Login = () => {
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [err, setErr] = useState("");
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const handleOnChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		if (inputs.username !== "") {
			if (inputs.password !== "") {
				try {
					const res = await axios.post(
						"http://localhost:8001/auth/login",
						inputs
					);
					localStorage.setItem("accessToken", res.data);
					setUser({ ...inputs, isLoggedIn: true });
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
				<h1 className="text-center text-dark">Login</h1>

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
					value="Login"
					className="btn btn-primary mt-4"
					onClick={handleLogin}
				/>
				{err && <p className="text-warning">{err} !</p>}
				<p>
					Don't have an account ? <Link to="/register">Register</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;

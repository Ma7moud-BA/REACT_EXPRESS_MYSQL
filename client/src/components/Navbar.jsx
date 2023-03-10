import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(AuthContext);

	const handleLogOut = () => {
		localStorage.removeItem("accessToken");
		setUser((prev) => ({ ...prev, isLoggedIn: false }));
		navigate("/login");
	};
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand">Posts</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link active">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/create-post" className="nav-link active">
								Create A Post
							</Link>
						</li>
						{user.isLoggedIn ? (
							<>
								<p className="my-auto"> {user.username}</p>
								<button
									className="btn btn-primary ms-2 "
									onClick={handleLogOut}
								>
									Logout
								</button>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link to="/login" className="nav-link active">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/register" className="nav-link active">
										register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: "",
		password: "",
		isLoggedIn: false,
	});
	useEffect(() => {
		if (!localStorage.getItem("accessToken")) {
			setUser((prev) => ({ ...prev, isLoggedIn: false }));
		} else {
			setUser((prev) => ({ ...prev, isLoggedIn: true }));
		}
	}, []);
	return (
		<AuthContext.Provider value={{ user: user, setUser: setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

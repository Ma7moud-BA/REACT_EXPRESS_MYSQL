import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/create-post",
				element: <CreatePost />,
			},
			{
				path: "/:id",
				element: <SinglePost />,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/profile/:id",
				element: <ProfilePage></ProfilePage>,
			},
		],
	},

	{
		path: "*",
		element: <PageNotFound />,
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;

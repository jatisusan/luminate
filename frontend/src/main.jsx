import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	RouterProvider,
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import PostPage from "./pages/PostPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BlogeditorPage from "./pages/BlogeditorPage.jsx";
import BlogUpdatePage from "./pages/BlogUpdatePage.jsx";
import { HelmetProvider } from "react-helmet-async";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserListPage from "./pages/admin/UserListPage.jsx";
import PostListPage from "./pages/admin/PostListPage.jsx";
import CommentListPage from "./pages/admin/CommentListPage.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<HomePage />} />
			<Route path="page/:pageNumber" element={<HomePage />} />
			<Route path="category/:category" element={<HomePage />} />
			<Route
				path="category/:category/page/:pageNumber"
				element={<HomePage />}
			/>
			<Route path="search/:keyword" element={<HomePage />} />
			<Route path="search/:keyword/page/:pageNumber" element={<HomePage />} />
			<Route path="post/:id" element={<PostPage />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="register" element={<RegisterPage />} />
			<Route path="profile" element={<ProfilePage />} />
			<Route path="blogeditor" element={<BlogeditorPage />} />
			<Route path="post/:id/edit" element={<BlogUpdatePage />} />

			<Route path="" element={<AdminRoute />}>
				<Route path="/admin/dashboard" element={<Dashboard />} />
				<Route path="/admin/users" element={<UserListPage />} />
				<Route path="/admin/posts" element={<PostListPage />} />
				<Route path="/admin/comments" element={<CommentListPage />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<HelmetProvider>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</HelmetProvider>
);

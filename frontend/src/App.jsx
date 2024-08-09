import { Col, Container, Row } from "react-bootstrap";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Header />
			<Container >
				<Outlet />
			</Container>
			<Footer />
			<ToastContainer />
		</>
	);
}

export default App;

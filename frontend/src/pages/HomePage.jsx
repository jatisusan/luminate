import Blogs from "../components/Blogs";
import {
	Row,
	Col,
	Container,
	Button,
	Form,
	FormControl,
} from "react-bootstrap";
import { useGetPostsQuery } from "../slices/postSlice";
import { useParams, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Message from "../components/Message";

function HomePage() {
	const { category, keyword } = useParams();

	const {
		data: posts,
		isLoading,
		error,
	} = useGetPostsQuery({ category, keyword });

	return isLoading ? (
		<h2>Loading....</h2>
	) : (
		<>
			<Row className="mx-4">
				<Col sm="12" md="6" lg="8">
					<Container className="mt-3 ms-2">
						{keyword ? (
							<h3>Search results for "{keyword}"</h3>
						) : category ? (
							<h3>{category}</h3>
						) : (
							<h3>Latest</h3>
						)}
					</Container>
					{posts.length > 0 ? (
						posts.map((post) => <Blogs post={post} key={post._id} />)
					) : (
						<Message>No posts found</Message>
					)}
				</Col>

				<Col>
					<SearchBar />
					<h5 className="my-4 ms-3">Stories from all interests</h5>
					<Container>
						{[
							"Technology",
							"Health",
							"Travel",
							"Finance",
							"Programming",
							"Entertainment",
						].map((cat) => (
							<Button
								as={Link}
								variant={cat == category ? "dark" : "outline-dark"}
								to={`/category/${cat}`}
								className="m-1"
								key={cat}
							>
								{cat}
							</Button>
						))}
					</Container>
				</Col>
			</Row>
		</>
	);
}

export default HomePage;

import Blogs from "../components/Blogs";
import {
	Row,
	Col,
	Container,
	Button,
	Form,
	FormControl,
	Card,
} from "react-bootstrap";
import { useGetPostsQuery, useGetTopPostsQuery } from "../slices/postSlice";
import { useParams, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Message from "../components/Message";
import Post from "../../../backend/models/post.model";

function HomePage() {
	const { category, keyword } = useParams();

	const {
		data: posts,
		isLoading,
		error,
	} = useGetPostsQuery({ category, keyword });

	const {
		data: topPosts,
		isLoading: topPostsLoading,
		error: topPostsError,
	} = useGetTopPostsQuery();

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
							"Sports",
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

						<Container className="my-4">
							<h5 className="ms-1 border-bottom pb-2">Top Liked</h5>
						{topPostsLoading ? (
							<Message>Loading....</Message>
						) : topPostsError ? (
							<Message>{topPostsError.data.error}</Message>
						) : (
							topPosts.map((post) => (
								<Card key={post._id} className="p-2 my-4">
									<Card.Img src={post.image} />

									<Card.Body>
										<Card.Title>
											<Link to={`/post/${post._id}`}>{post.title}</Link>
										</Card.Title>
										
									</Card.Body>
									<Card.Footer >
											<h4>{post.likes.length} Likes</h4>
										</Card.Footer>
								</Card>
							))
						)}
					</Container>
				</Col>
			</Row>
		</>
	);
}

export default HomePage;

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
import { BsFire } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import Paginate from "../components/Paginate";
import Spinner from "react-bootstrap/Spinner"
import PostLoading from "../components/PostLoading";
import Meta from "../components/Meta";


function HomePage() {
	const { category, keyword, pageNumber } = useParams();

	const { data, isLoading, error } = useGetPostsQuery({
		category,
		keyword,
		pageNumber,
	});

	const {
		data: topPosts,
		isLoading: topPostsLoading,
		error: topPostsError,
	} = useGetTopPostsQuery();

	return  (
		<>
			<Meta />
			<Container>
			<Row className="mx-2">
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
						{
							isLoading ? <PostLoading num={6}/> : 
							(data.posts.length > 0 ? (
						data.posts.map((post) => <Blogs post={post} key={post._id} />)
					) : (
						<Message>No posts found</Message>
					))}
					{!isLoading && (<Paginate
						page={data.page}
						pages={data.pages}
						category={category ? category : ""}
						keyword={keyword ? keyword : ""}
					/>)}
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
							"Education",
								"Sports",
								"Life",
							
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
						<div className="ms-1 border-bottom pb-2">
							<BsFire style={{ color: "rgb(255, 90, 0)" }} className="me-2" />
							<span className="fs-5 fw-bold">Top Liked</span>
						</div>

						{topPostsLoading ? (
							<Spinner animation="border" variant="warning" className="mt-3 ms-4"/>
						) : topPostsError ? (
							<Message>{topPostsError.data.error}</Message>
						) : (
							topPosts.map((post) => (
								<Card key={post._id} className="p-2 mb-5 mt-4">
									<Card.Img src={post.image} />

									<Card.Body>
										<Card.Title>
											<Link to={`/post/${post._id}`}>{post.title}</Link>
										</Card.Title>
									</Card.Body>
									<Card.Footer>
										<FcLike className="me-2" />
										{post.likes.length} Likes
									</Card.Footer>
								</Card>
							))
						)}
					</Container>
				</Col>
				</Row>
				</Container>
		</>
	);
}

export default HomePage;

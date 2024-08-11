import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function Blogs({ post }) {
	
	return (
		<Container>
			<Card className="my-4 p-3">
				<Row>
					<Col>
						
						
						<Card.Body>
							<Card.Text className="post-title">
								<Link to={`/post/${post._id}`}>
									<h5>{post.title}</h5>
								</Link>
							</Card.Text>

							<Card.Text className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></Card.Text>
							<Row>
								<Col lg="8">
									<Button variant="outline-primary" size="sm">
										{post.category}
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Col>

					<Col lg="4">
						<Card.Img src={post.image} className="card-img" />
					</Col>
				</Row>
			</Card>
		</Container>
	);
}

export default Blogs;

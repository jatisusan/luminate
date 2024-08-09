import {
	Container,
	Image,
	ListGroup,
	Row,
	Col,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { useDislikePostMutation, useGetPostQuery, useLikePostMutation } from "../slices/postSlice";
import { FaCircleUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import {
	useAddCommentMutation,
	useGetCommentsQuery,
} from "../slices/commentSlice";
import Comment from "../components/Comment";
import { toast } from "react-toastify";
import { GoHeart,  GoHeartFill } from "react-icons/go";
import { useSelector } from "react-redux";

function PostPage() {
	const { id } = useParams();

	const {
		data: post,
		isLoading: postLoading,
		error: postError,
	} = useGetPostQuery(id);

	const {
		data: comments,
		isLoading: commentsLoading,
		error: commentsError,
	} = useGetCommentsQuery(id);

	const [addComment, { isLoading: addCommentLoading }] =
		useAddCommentMutation();

	const [comment, setComment] = useState();
	
	const addCommentHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await addComment({id, content: comment }).unwrap();
			toast.success(resp.message);
		} catch (err) {
			toast.error(err.data.error);
		}
	}

	const {userInfo} = useSelector(state => state.auth)
	const [isLiked, setIsLiked] = useState(false);

	const [likePost, { isLoading: likeLoading }] = useLikePostMutation();
	const [dislikePost, { isLoading: dislikeLoading }] = useDislikePostMutation();


	const likeHandler = async () => {
		try {
			if (isLiked) {
				let resp = await dislikePost(id).unwrap();
				toast.success(resp.message);
			} else {
				let resp = await likePost(id).unwrap();
				toast.success(resp.message);
			}
			setIsLiked(!isLiked);
		} catch (err) {
			toast.error(err.data.error);
		}
	}

	useEffect(() => {
		if (!postLoading && userInfo) {
			let user = post.likes.find((like) => like.username == userInfo.username);
			if (user) {
				setIsLiked(true);
			}
		}
		
			
		
		
	}, [post])


	
	return (
		<>
			{postLoading ? (
				<h1>Loading.....</h1>
			) : (
				<Row className="justify-content-md-center">
					<Col md="8">
						<Container>
							<ListGroup className="my-2" variant="flush">
								<ListGroup.Item>
									<Image src={post.image} className="post-img my-2" />
								</ListGroup.Item>

								<ListGroup.Item className=" mt-3">
									<h1>{post.title}</h1>
								</ListGroup.Item>

								<ListGroup.Item className="py-4">
									<Row>
										<Col sm={1}>
											<FaCircleUser size={25} />
										</Col>
										<Col md={7}>
											<strong>{post.author.username}</strong>
											<p>{post.author.email}</p>
										</Col>
										<Col md={4}>
											Posted on: {post.createdAt.substring(0, 10)}
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<p className="postpage-p my-3">{post.content} </p>
								</ListGroup.Item>
									<ListGroup.Item className="text-end ">
										<Button size="lg" variant="Link" onClick={likeHandler}>
											{
												isLiked ? <GoHeartFill style={{color: "red"}}/> : <GoHeart />
											}
										</Button>
										{post.likes.length} Likes
									</ListGroup.Item>
									<ListGroup.Item></ListGroup.Item>
									
									
							</ListGroup>
						</Container>

						<Container>
							
								{commentsLoading ? <h4>Loading comments</h4> : (
									<h4>{comments.length} Comments</h4>
								)}
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Form onSubmit={addCommentHandler}>
										<Row className="my-4 align-items-top">
											<Col xs={1}>
												<FaUserCircle size={25} className="me-2" />
											</Col>
											<Col >
												<Form.Control
														as="textarea"
														placeholder="Add comment"
														onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Col>
											<Col xs={2}>
												<Button variant="warning" type="submit">
													<IoMdSend />
												</Button>
											</Col>
										</Row>
									</Form>
								</ListGroup.Item>
								{commentsLoading ? (
									<h2>Loading Comments</h2>
								) : (
									comments.map((comment) => <Comment comment={comment} key={comment._id} />)
								)}
							</ListGroup>
						</Container>
					</Col>
				</Row>
			)}
		</>
	);
}

export default PostPage;

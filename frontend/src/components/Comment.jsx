import { useState } from "react";
import {
	Row,
	Col,
	ListGroup,
	Button,
	FormControl,
	Form,
	Toast,
} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAddReplyMutation } from "../slices/commentSlice";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const Comment = ({ comment }) => {
	const [showReplies, setShowReplies] = useState(false);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [reply, setReply] = useState();
	const [addReply, { isLoading: addReplyLoading }] = useAddReplyMutation();

	const addReplyHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await addReply({
				postId: comment.post,
				commentId: comment._id,
				content: reply,
			}).unwrap();
			toast.success(resp.message);
		} catch (err) {
			toast.error(err.data.error);
		}
	};

	return (
		<ListGroup.Item>
			<Row>
			<div id="commentdate" className=" text-secondary text-end fw-light">
						{comment.createdAt.substring(0, 10)}
					</div>
			</Row>
			<Row className="mt-2">
				<Col xs={2} sm={1}>
					<FaUserCircle size={25} className="me-2" />
				</Col>

				<Col>
					<div>
						<span>@{comment.author.username}</span>
						<p className="mt-2 text-secondary">{comment.content}</p>
					</div>
					<Button
						variant="Link"
						size="sm"
						className="fw-bold fst-italic"
						onClick={() => setShowReplyForm(!showReplyForm)}
						hidden={showReplyForm}
					>
						Reply
					</Button>
					{showReplyForm && (
						<Form onSubmit={addReplyHandler}>
							<Row>
								<Col>
									<FormControl
										as="textarea"
										placeholder="Write a reply"
										value={reply}
										onChange={(e) => setReply(e.target.value)}
									/>
								</Col>
								<Col xs={2}>
									<Button
										variant="Link"
										size="sm"
										onClick={() => setShowReplyForm(!showReplyForm)}
									>
										<MdClose />
									</Button>
								</Col>
							</Row>
							<Button
								type="submit"
								size="sm"
								variant="warning"
								className="my-3"
							>
								Send
							</Button>
						</Form>
					)}
					{comment.replies.length > 0 && (
						<>
							<Button
								variant="Link"
								className="text-primary"
								onClick={() => setShowReplies(!showReplies)}
							>
								{showReplies ? (
									<IoIosArrowUp className="me-2" />
								) : (
									<IoIosArrowDown className="me-2" />
								)}
								{comment.replies.length}
								{comment.replies.length == 1 ? " reply" : " replies"}
							</Button>
						</>
					)}
					{showReplies && comment.replies && (
						<ListGroup className="ms-4 mt-3" variant="flush">
							{comment.replies.map((reply) => (
								<Comment key={reply._id} comment={reply} />
							))}
						</ListGroup>
					)}
				</Col>
				
			</Row>
		</ListGroup.Item>
	);
};

export default Comment;

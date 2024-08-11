import { useState, useEffect } from "react";
import {
	Form,
	Row,
	Col,
	FormGroup,
	Button,
	Image,
	Card,
	ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	useUpdateProfileMutation,
	useUploadPfpMutation,
} from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDeletePostMutation, useGetMyPostsQuery } from "../slices/postSlice";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";


const ProfilePage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPsd, setConfirmPsd] = useState("");
	const [image, setImage] = useState("");

	const { userInfo } = useSelector((state) => state.auth);
	useEffect(() => {
		if (userInfo) {
			setUsername(userInfo.username);
			setEmail(userInfo.email);
		}
	}, [userInfo]);

	const [updateProfile, { isLoading }] = useUpdateProfileMutation();
	const dispatch = useDispatch();
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (password != confirmPsd) {
				toast.error("Password not matched!");
			} else {
				let resp = await updateProfile({
					username,
					email,
					password,
					pfp: image,
				}).unwrap();
				toast.success(resp.message);
				dispatch(setCredentials(resp.user));
			}
		} catch (err) {
			toast.error(err.data.error);
		}
	};

	const [uploadPfp, { isLoading: uploadPfpLoading }] = useUploadPfpMutation();
	const imageUploadHandler = async (e) => {
		try {
			let formData = new FormData();
			formData.append("image", e.target.files[0]);
			let resp = await uploadPfp(formData).unwrap();
			setImage(resp.filePath);
			toast.success(resp.message);
		} catch (err) {
			toast.error(err.data.error);
		}
	};

	const [showForm, setShowForm] = useState(false);

	const {
		data: myposts,
		isLoading: mypostsLoading,
		error: mypostsError,
	} = useGetMyPostsQuery();

	const [deletePost, { isLoading: deletePostLoading }] = useDeletePostMutation();
	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			try {
				let resp = await deletePost(id).unwrap();
				toast.success(resp.message);
			} catch (err) {
				toast.error(err.data.error);
			}
		}
	}

	return (
		<>
			<Row className="d-flex justify-content-center text-center">
				<Col xs={12} md={3} className="mt-4 ms-3">
					<Image src={userInfo.pfp} className="profile-pfp" alt="Pfp"/>
				</Col>

				<Col xs={12} md={3} className="mt-4 ms-3">
					<h4>@{userInfo.username}</h4>
					<p>{userInfo.email}</p>

					<Button variant="warning" onClick={() => setShowForm(!showForm)}>
						Edit Profile
					</Button>
				</Col>

				<Col xs={12} md={3} className="mt-4 ms-3">
					{mypostsLoading ? (
						<Message>Loading</Message>
					) : mypostsError ? (
						<Message variant="danger">{mypostsError.data.error}</Message>
					) : (
						<div>
							<h4>{myposts.length}</h4>
							<p>Posts</p>
						</div>
					)}
				</Col>
			</Row>

			{showForm && (
				<Row className="d-flex justify-content-center mt-5">
					<Col md={5} className="border p-5 rounded">
						<h3>Profile</h3>

						<Form onSubmit={submitHandler}>
							<FormGroup className="my-4" controlId="image">
								<Form.Label>Profile Picture</Form.Label>
								<Form.Control type="file" onChange={imageUploadHandler} />
							</FormGroup>

							<FormGroup className="my-4" controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</FormGroup>

							<FormGroup className="my-4" controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormGroup>

							<FormGroup className="my-4" controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormGroup>

							<FormGroup className="my-4" controlId="confirmPsd">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm Password"
									value={confirmPsd}
									onChange={(e) => setConfirmPsd(e.target.value)}
								/>
							</FormGroup>

							<div>
								<Button type="submit" className="my-4" variant="warning">
									Update
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			)}

			<Row className="d-flex justify-content-center mt-5 px-3">
				<Col md={9}>
					<h4>My Posts</h4>

					{mypostsLoading ? (
						<Message>Loading</Message>
					) : mypostsError ? (
						<Message variant="danger">{mypostsError.data.error}</Message>
					) : myposts.length > 0 ? (
						myposts.map((post) => (
							<Card className="my-4 p-3" key={post._id}>
								<Row>
									<Col>
										<Card.Body>
											<Card.Text className="post-title">
												<Link to={`/post/${post._id}`}>
													<strong>{post.title}</strong>
												</Link>
											</Card.Text>

											<Card.Text className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}>
												
											</Card.Text>
											<Row>
												<Col lg="8">
													<Button as={Link} to={`/post/${post._id}/edit`} variant="outline-dark" size="sm">
														Edit
													</Button>
													<Button variant="outline-danger" size="sm" className="ms-3" onClick={() => deleteHandler(post._id)}>
														<FaTrash/>
													</Button>
												</Col>
											</Row>
										</Card.Body>
									</Col>

									<Col sm="4">
										<Card.Img src={post.image} className="card-img" />
									</Col>
								</Row>
							</Card>
						))
					) : (
						<Message>No posts</Message>
					)}
				</Col>
			</Row>
		</>
	);
};

export default ProfilePage;

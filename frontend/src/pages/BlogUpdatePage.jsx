import {
	Container,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	FormLabel,
} from "react-bootstrap";
import {
	useGetPostQuery,
	useUpdatePostMutation,
	useUploadPostImageMutation,
} from "../slices/postSlice";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

const BlogUpdatePage = () => {
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [image, setImage] = useState();
	const [category, setCategory] = useState();
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: post,
		isLoading: postLoading,
		error: postError,
	} = useGetPostQuery(id);

	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setCategory(post.category);
			setContent(post.content);
		}
	}, [post]);

	const [uploadPostImage, { isLoading: uploadPostImageLoading }] =
		useUploadPostImageMutation();
	const imageUploadHandler = async (e) => {
		try {
			let formData = new FormData();
			formData.append("image", e.target.files[0]);
			let resp = await uploadPostImage(formData).unwrap();
			setImage(resp.filePath);
			toast.success(resp.message);
		} catch (err) {
			toast.error(err.data.error);
		}
	};

	const handleContentChange = (value) => {
		setContent(value);
	};

	const [updatePost, { isLoading: updatePostLoading }] = useUpdatePostMutation();
	const submitHandler = async (e) => {
		e.preventDefault();
	try {
		let resp = await updatePost({id, title, content, image, category}).unwrap();
		toast.success(resp.message);
		navigate(`/post/${resp.post._id}`);
	} catch (err) {
		toast.error(err.data.error);
	}
	};
	
	return (
		<>
			<Container className="my-3 ">
				<h2 className="my-4">Edit Blog</h2>

				<Row>
					<Col md={8}>
						<Form onSubmit={submitHandler}>
							<FormGroup className="my-3" controlId="title">
								<FormLabel>Title</FormLabel>
								<Form.Control
									type="text"
									value={title}
									placeholder="Post Title"
									onChange={(e) => setTitle(e.target.value)}
								/>
							</FormGroup>

							<FormGroup className="my-3" controlId="category">
								<FormLabel>Category</FormLabel>
								<Form.Control
									as="select"
									value={category}
									placeholder="Category"
									onChange={(e) => setCategory(e.target.value)}
								>
									<option>None</option>
									<option>Technology</option>
									<option>Health</option>
									<option>Programming</option>
									<option>Entertainment</option>
									<option>Travel</option>
									<option>Sports</option>
									<option>Finance</option>
									<option>Education</option>
									<option>Life</option>
								</Form.Control>
							</FormGroup>

							<FormGroup className="my-3" controlId="image">
								<FormLabel>Image</FormLabel>
								<Form.Control type="file" onChange={imageUploadHandler} />
							</FormGroup>

							<FormGroup className="my-3" controlId="content">
								<FormLabel>Content</FormLabel>
								<div className="quill-editor-container">
									<ReactQuill
										value={content}
										onChange={handleContentChange}
										placeholder="Write your blog content...."
										theme="snow"
									/>
								</div>
							</FormGroup>

							<Button type="submit">Update</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BlogUpdatePage;

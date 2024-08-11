import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
	Container,
	Form,
	FormGroup,
	FormLabel,
	Row,
	Col,
  Button,
} from "react-bootstrap";
import { useCreatePostMutation, useUploadPostImageMutation } from "../slices/postSlice";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";

const BlogeditorPage = () => {
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const [uploadPostImage, { isLoading: uploadPostImageLoading }] = useUploadPostImageMutation();
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
  }
  
  const [createPost, { isLoading: createPostLoading }] = useCreatePostMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await createPost({ title, category, content, image }).unwrap();
      toast.success(resp.message);
      navigate(`/post/${resp.post._id}`)

    } catch (err) {
      toast.error(err.data.error);
    }
  }
  
  
	return (
		<>
			<Container className="my-3 ">
				<h2 className="my-4">Create a new blog post</h2>

				<Row>
					<Col md={8}>
						<Form onSubmit={submitHandler}>
							<FormGroup className="my-3" controlId="title">
								<FormLabel>Title</FormLabel>
								<Form.Control
									type="text"
									value={title}
                  placeholder="Post Title"
                  onChange={e => setTitle(e.target.value)}
								/>
							</FormGroup>

							<FormGroup className="my-3" controlId="category">
								<FormLabel>Category</FormLabel>
								<Form.Control
									type="text"
									value={category}
                  placeholder="Category"
                  onChange={e => setCategory(e.target.value)}
								/>
							</FormGroup>

							<FormGroup className="my-3" controlId="image">
								<FormLabel>Image</FormLabel>
								<Form.Control type="file" onChange={imageUploadHandler}/>
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
              
              <Button type="submit">Post</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BlogeditorPage;

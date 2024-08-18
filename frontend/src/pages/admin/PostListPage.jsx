import { Table, Row, Container, Button } from "react-bootstrap";
import { useDeletePostMutation, useGetAllPostsQuery } from "../../slices/postSlice";
import Spinner from "react-bootstrap/Spinner";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const PostListPage = () => {
	const { data: posts, isLoading, error } = useGetAllPostsQuery();
	const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();

	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure you want to delete post?')) {
			try {
				let resp = await deletePost(id).unwrap();
				toast.success(resp.message);
			} catch (err) {
				toast.error(err.data.error);
			}
		}
	}

	return isLoading ? (
		<Row className="d-flex justify-content-center mt-4 gap-2">
			<Spinner animation="grow" variant="warning" />
			<Spinner animation="grow" variant="warning" />
			<Spinner animation="grow" variant="warning" />
		</Row>
	) : (
		<Container className="mt-3">
			<Table responsive hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>Title</th>
						<th>Author</th>
              <th>Posted On</th>
              <th></th>
					</tr>
				</thead>

				<tbody>
					{posts.map((post) => (
						<tr key={post._id}>
							<td>{post._id}</td>
							<td>{post.title}</td>
							<td>{post.author.username}</td>
              <td>{post.createdAt.substring(0, 10)}</td>
              <td>
                <Button size="sm" variant="danger" onClick={() => deleteHandler(post._id)}>
                  <FaTrash/>
                </Button>
              </td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default PostListPage;

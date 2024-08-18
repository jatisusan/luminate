import { Button, Container, Image, Table } from "react-bootstrap";
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/userApiSlice";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const UserListPage = () => {
	const { data: users, isLoading, error } = useGetUsersQuery();

	const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure you want to delete user?')) {
			try {
				let resp = await deleteUser(id).unwrap();
				toast.success(resp.message);
			} catch (err) {
				toast.error(err.data.error);
			}
		}
	}

	return isLoading ? (
		<h3>Loading...</h3>
	) : (
			<Container className="mt-3">
		<Table responsive hover>
			<thead>
				<tr>
					<th>Pfp</th>
					<th>Id</th>
					<th>Username</th>
					<th>Email</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				{users.map((user) => (
					<tr key={user._id}>
						<td>
							<Image src={user.pfp} className="pfp-icon" />
						</td>
						<td>{user._id}</td>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>
							<Button variant="danger" size="sm" onClick={() => deleteHandler(user._id)}>
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

export default UserListPage;

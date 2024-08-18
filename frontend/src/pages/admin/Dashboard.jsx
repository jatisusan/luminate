import React from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	Row,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import Spinner from "react-bootstrap/Spinner";
import { useGetAllPostsQuery, useGetPostsQuery } from "../../slices/postSlice";
import { useGetAllCommentsQuery } from "../../slices/commentSlice";


const Dashboard = () => {

  const { data: users, isLoading: usersLoading, error: usersError } = useGetUsersQuery();
  const { data: posts, isLoading: postsLoading, error: postsError } = useGetAllPostsQuery();
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useGetAllCommentsQuery();


	return (
    <>
      {
        !usersLoading && !postsLoading && !commentsLoading ? (
          <Container>
          <Row className="my-4">
            <Col md={4}>
              <Card className="dash-card p-4 text-center my-4">
                <Card.Title>
                  <FaUser size={100} />
                </Card.Title>
                <h4 className="mt-4">Total Users</h4>
                    <Card.Text style={{ fontSize: "4rem" }}>{users.length}</Card.Text>
                <Button as={Link} to="/admin/users" variant="warning">Manage</Button>
              </Card>
            </Col>
  
            <Col md={4}>
              <Card className="dash-card p-4 text-center my-4">
                <Card.Title>
                  <FaFileAlt size={100} />
                </Card.Title>
                <h4 className="mt-4">Total Posts</h4>
                    <Card.Text style={{ fontSize: "4rem" }}>{posts.length}</Card.Text>
                <Button as={Link} to="/admin/posts" variant="warning">Manage</Button>
              </Card>
            </Col>
  
            <Col md={4}>
              <Card className="dash-card p-4 text-center my-4">
                <Card.Title>
                  <FaComment size={100} />
                </Card.Title>
                <h4 className="mt-4">Total Comments</h4>
                  <Card.Text style={{ fontSize: "4rem" }}>{comments.length}</Card.Text>
                <Button as={Link} to="/admin/comments" variant="warning">Manage</Button>
              </Card>
            </Col>
          </Row>
        </Container>
        ) : (
          <Row className="d-flex justify-content-center mt-4 gap-2">
					<Spinner animation="grow" variant="warning" />
					<Spinner animation="grow" variant="warning" />
					<Spinner animation="grow" variant="warning" />
				</Row>
        )
    }
			
		</>
	);
};

export default Dashboard;

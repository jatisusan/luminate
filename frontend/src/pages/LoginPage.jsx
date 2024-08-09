import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Card,
	FormGroup,
	FormLabel,
	FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/'

	const [login, { isLoading }] = useLoginMutation();

	const { userInfo } = useSelector(state => state.auth);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await login({ email, password }).unwrap();
			toast.success(resp.message);
			console.log(resp.user);
			dispatch(setCredentials(resp.user));
		} catch (err) {
			console.log(err)
			toast.error(err.data.error);
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	return (
		<>
			<FormContainer>
				<Form onSubmit={submitHandler}>
					<FormGroup controlId="email" className="my-3">
						<FormLabel>Email</FormLabel>
						<FormControl
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId="password" className="my-3">
						<FormLabel>Password</FormLabel>
						<FormControl
							type="password"
							value={password}
							placeholder="Enter password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormGroup>

					<Button variant="warning" type="submit" className="my-3">
						Log In
					</Button>
				</Form>

				<Row className="py-3">
					<Col>
						<span className="me-3">Don't have an account?</span>
						<Link to="/register">Register</Link>
					</Col>
				</Row>
			</FormContainer>
		</>
	);
}

export default LoginPage;

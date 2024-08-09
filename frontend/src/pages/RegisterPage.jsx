import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { useSignupMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/'

	const [signup, { isLoading }] = useSignupMutation();

	const { userInfo } = useSelector((state) => state.auth);
	
	const submitHandler = async(e) => {
		e.preventDefault();
		try {

			let resp = await signup({ username, email, password }).unwrap();
			toast.success(resp.message);
			dispatch(setCredentials(resp.user));
		} catch (err) {
			
			toast.error(err.data.error);
		}
	}

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [userInfo, navigate, redirect]);

	return (
		<FormContainer>
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="username" className="my-3">
					<FormLabel>Username</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</FormGroup>

				<FormGroup controlId="email" className="my-3">
					<FormLabel>Email</FormLabel>
					<FormControl
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormGroup>

				<FormGroup controlId="password" className="my-3">
					<FormLabel>Password</FormLabel>
					<FormControl
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>

				<Button type="submit" variant="warning" className="my-3">SignIn</Button>
			</Form>
		</FormContainer>
	);
};

export default RegisterPage;

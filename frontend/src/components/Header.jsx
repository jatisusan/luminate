import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPenNib } from "react-icons/fa";
import { useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUserLogoutMutation } from "../slices/userApiSlice";

function Header() {
	const { userInfo } = useSelector((state) => state.auth);
	const [userLogout, { isLoading }] = useUserLogoutMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			let resp = await userLogout().unwrap();
			toast.success(resp.message);
			dispatch(logout());
			navigate("/login");
		} catch (err) {
			toast.error(err.data.error);
		}
	};

	return (
		<header>
			<Navbar variant="dark" bg="dark">
				<Container>
					<NavLink to="/" className="navbar-brand">
						<Image src="/images/logo.jpg" className="brand-logo me-2" />
						Luminate
					</NavLink>
					<Nav>
						<NavLink to="/login?redirect=/blogeditor" className="nav-link me-4">
							<FaPenNib className="me-1" />
							Write
						</NavLink>

						{userInfo ? (
							<>
								<NavDropdown title={userInfo.username}>
									<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<>
								<NavLink to="/login" className="nav-link">
									<FaUser className="me-1" />
									Login
								</NavLink>
							</>
						)}
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;

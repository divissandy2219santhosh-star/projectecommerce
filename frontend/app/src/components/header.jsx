import React from 'react'
import { Navbar, Nav, NavDropdown, Form, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  const [user,setuser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setuser(JSON.parse(userInfo));
    }
  }, []);
  const loginHandler = () => {
    navigate('/login');
  };
  const signupHandler = () => {
    navigate('/signup');
  };
  const profileHandler = () => {
    navigate('/profile');
  };
  
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    SpeechSynthesisUtterance('Logged out successfully');
    window.location.href = '/login'; // Redirect to login page
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>Navbar</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/features">
              <Nav.Link>Features</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/pricing">
              <Nav.Link>Pricing</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Dropdown" id="nav-dropdown">
              <LinkContainer to="/login">
                <NavDropdown.Item>Login</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/signup">
                <NavDropdown.Item>Signup</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item>Logout</NavDropdown.Item>
              <NavDropdown.Divider />
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
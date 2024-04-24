import { Link as RouterLink } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../Navigation/Navigation.css'
import logo from '../../components/images/logo.png';

const Navigation = () => {
  return (
    <Navbar variant="dark" className = "sticky-top">
      <Container>
        <Navbar.Brand as={RouterLink} to="/">
          <img
            src={logo}
            width="225"
            height="30"
            className="d-inline-block align-top"
            alt="MoviePro Logo"
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={RouterLink} to="/register">Register</Nav.Link>
          <Nav.Link as={RouterLink} to="/login">Login</Nav.Link>
          <Nav.Link as={RouterLink} to="/profile">Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
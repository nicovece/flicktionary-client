import { Navbar, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Row>
      <Navbar
        expand='lg'
        bg='dark'
        variant='dark'
        data-bs-theme='dark'
        className='mb-5 p-4'
      >
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <h1 className='fs-4'>F L I C K T I O N A R Y</h1>
            <h2 className='fs-6'>A dictionary for flicks</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {!user && (
                <>
                  <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to='/signup'>
                    Signup
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Nav.Link as={Link} to='/'>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to='/profile'>
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};

import { Navbar, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, pathname }) => {
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
            <Nav className='ms-auto gap-3'>
              {!user && (
                <>
                  <Nav.Link
                    as={Link}
                    to='/login'
                    className={pathname === '/login' ? 'current' : ''}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to='/signup'
                    className={pathname === '/signup' ? 'current' : ''}
                  >
                    Signup
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Nav.Link
                    as={Link}
                    to='/'
                    className={pathname === '/' ? 'current' : ''}
                  >
                    Home
                  </Nav.Link>
                  {/* <Nav.Link
                    as={Link}
                    to='/search'
                    className={pathname === '/search' ? 'current' : ''}
                  >
                    Search
                  </Nav.Link> */}
                  <Nav.Link
                    as={Link}
                    to='/profile'
                    className={pathname === '/profile' ? 'current' : ''}
                  >
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

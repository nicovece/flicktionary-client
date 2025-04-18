import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = ({ user, onLoggedOut, pathname }) => {
  return (
    <footer className='py-4 mt-5 border-top border-secondary'>
      <Container fluid>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col
                  xs={12}
                  md={6}
                  className='d-flex gap-3 mb-4 mb-md-0 flex-column flex-md-row'
                >
                  <h6 className='text-info'>{new Date().getFullYear()}</h6>
                  <h6 className='text-info'>F L I C K T I O N A R Y</h6>
                  <h6 className='text-info'>A dictionary for flicks</h6>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className='d-flex gap-3 flex-column flex-md-row justify-content-end'
                >
                  <Nav className='gap-3 justify-content-end flex-column flex-md-row'>
                    {!user && (
                      <>
                        <Link
                          as={Link}
                          to='/login'
                          className={pathname === '/login' ? 'current' : ''}
                        >
                          Login
                        </Link>
                        <Link
                          as={Link}
                          to='/signup'
                          className={pathname === '/signup' ? 'current' : ''}
                        >
                          Signup
                        </Link>
                      </>
                    )}
                    {user && (
                      <>
                        <Link
                          as={Link}
                          to='/'
                          className={pathname === '/' ? 'current' : ''}
                        >
                          Home
                        </Link>
                        {/* <Link
                          as={Link}
                          to='/search'
                          className={pathname === '/search' ? 'current' : ''}
                        >
                          Search
                        </Link> */}
                        <Link
                          as={Link}
                          to='/profile'
                          className={pathname === '/profile' ? 'current' : ''}
                        >
                          Profile
                        </Link>
                        <Link onClick={onLoggedOut}>Logout</Link>
                      </>
                    )}
                  </Nav>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

import { useState, useEffect } from 'react';
import { MovieCard } from '../moovie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { Row, Col, Navbar, Container } from 'react-bootstrap';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// MainViewContent component that uses useLocation
const MainView = () => {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  // movies to be displayed
  const [movies, setMovies] = useState([]);

  // user
  const [user, setUser] = useState(storedUser ? storedUser : null);
  // token
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sort'); // Gets the value of ?sort=something

  useEffect(() => {
    if (!token) return;
    fetch('https://flicktionary.onrender.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('movies from api:', data);
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          director: movie.Director,
          genre: movie.Genre,
          image: movie.ImagePath,
          featured: movie.Featured,
          actors: movie.Actors,
        }));
        // console.log('movies from api:', moviesFromApi);

        setMovies(moviesFromApi);
      });
  }, [token]);

  // Log the current location whenever it changes
  useEffect(() => {
    console.log('Current location:', location);
  }, [location]);

  if (location.pathname.startsWith('/movies/')) {
    // You're on a movie page
  }

  return (
    <>
      <Container fluid>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            localStorage.clear();
          }}
        />
      </Container>
      <Container>
        <Row
          className={
            location.pathname.startsWith('/movies/') ||
            location.pathname === '/profile'
              ? 'justify-content-center'
              : ''
          }
        >
          <Routes>
            <Route
              path='/signup'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path='/login'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path='/profile'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : (
                    <ProfileView
                      user={user}
                      movies={movies}
                      onLoggedOut={() => {
                        setUser(null);
                        localStorage.clear();
                      }}
                    />
                  )}
                </>
              }
            />
            <Route
              path='/'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className='mb-4' key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path='/movies/:movieId'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <MovieView movies={movies} />
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </>
  );
};

export default MainView;

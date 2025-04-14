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
  // user's favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // user
  const [user, setUser] = useState(storedUser ? storedUser : null);
  // token
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sort'); // Gets the value of ?sort=something

  // Fetch movies from API
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

  // Fetch user's favorite movies from user object
  useEffect(() => {
    if (!user || !token) return;

    fetch(`https://flicktionary.onrender.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log('user data:', userData);
        if (userData.FavoriteMovies) {
          setFavoriteMovies(userData.FavoriteMovies);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [user, token]);

  // Function to toggle favorite status
  const toggleFavorite = (movieId) => {
    if (!user || !token) return;

    console.log('Toggling favorite for movie ID:', movieId);
    console.log('Current favorite movies:', favoriteMovies);

    const isFavorite = favoriteMovies.includes(movieId);
    console.log('Is favorite?', isFavorite);

    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favoriteMovies.filter((id) => id !== movieId);
    } else {
      // Add to favorites
      updatedFavorites = [...favoriteMovies, movieId];
    }

    console.log('Updated favorites:', updatedFavorites);

    // First, update the local state to provide immediate feedback
    setFavoriteMovies(updatedFavorites);

    // Update the user in localStorage
    const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Then, update the server
    // Create a copy of the user object with updated favorites
    const updatedUserData = {
      Username: user.Username,
      Password: user.Password,
      Email: user.Email,
      Birthday: user.Birthday,
      FavoriteMovies: updatedFavorites,
    };

    console.log('Sending update request with data:', updatedUserData);

    // Update user's favorite movies in the database
    fetch(`https://flicktionary.onrender.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => {
        console.log('Response status:', response.status);

        if (response.ok) {
          console.log('Successfully updated favorites on server');
        } else {
          // Log the error status
          console.log(
            'Failed to update favorites on server. Status:',
            response.status
          );

          // Try to get the error message from the response
          return response.text().then((text) => {
            console.log('Error response text:', text);
            try {
              // Try to parse the response as JSON if possible
              const errorData = JSON.parse(text);
              console.log('Error data:', errorData);
            } catch (e) {
              // If it's not JSON, just log the text
              console.log('Error response is not JSON:', text);
            }
          });
        }
      })
      .catch((error) => {
        // Log the actual error object
        console.log('Error updating favorites on server:', error);

        // Revert the local state if the server update fails
        setFavoriteMovies(favoriteMovies);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      });
  };

  // Check if a movie is in favorites
  const isMovieFavorite = (movieId) => {
    return favoriteMovies.includes(movieId);
  };

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
                      favoriteMovies={favoriteMovies}
                      onToggleFavorite={toggleFavorite}
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
                          <MovieCard
                            movie={movie}
                            isFavorite={isMovieFavorite(movie.id)}
                            onToggleFavorite={toggleFavorite}
                          />
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
                    <MovieView
                      movies={movies}
                      isFavorite={isMovieFavorite(
                        movies.find(
                          (m) => m.id === location.pathname.split('/')[2]
                        )?.id
                      )}
                      onToggleFavorite={toggleFavorite}
                    />
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

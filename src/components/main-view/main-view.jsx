import { useState, useEffect } from 'react';
import { MovieCard } from '../moovie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { SearchResultsView } from '../searchresults-view/searchresults-view';
import { Footer } from '../footer/footer';
import { Row, Col, Container } from 'react-bootstrap';
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
          director: movie.Director.Name,
          genre: movie.Genre.Name,
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
    if (!user || !token) {
      console.error('Cannot toggle favorite: user or token is missing');
      return;
    }

    console.log('Toggling favorite for movie ID:', movieId);
    console.log('Current favorite movies:', favoriteMovies);
    console.log('Current user:', user);

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

    // Use the correct endpoint structure for adding/removing favorite movies
    const endpoint = `https://flicktionary.onrender.com/users/${user.Username}/movies/${movieId}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    console.log('Sending request to:', endpoint);
    console.log('Request method:', method);
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Update user's favorite movies in the database
    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        console.log('Response status:', response.status);
        console.log(
          'Response headers:',
          Object.fromEntries(response.headers.entries())
        );

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (response.ok) {
          console.log('Successfully updated favorites on server');
          try {
            const responseData = JSON.parse(responseText);
            console.log('Parsed response data:', responseData);

            // Update the state with the server response
            if (responseData.FavoriteMovies) {
              setFavoriteMovies(responseData.FavoriteMovies);
              const newUser = {
                ...user,
                FavoriteMovies: responseData.FavoriteMovies,
              };
              localStorage.setItem('user', JSON.stringify(newUser));
              setUser(newUser);
            }
          } catch (e) {
            console.log('Response is not JSON:', e);
          }
        } else {
          console.error('Failed to update favorites on server');
          console.error('Status:', response.status);
          console.error('Status text:', response.statusText);
          console.error('Response text:', responseText);

          // Revert the local state if the server update fails
          setFavoriteMovies(favoriteMovies);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error('Error updating favorites on server:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
        });

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

  return (
    <>
      <Container fluid>
        <NavigationBar
          user={user}
          pathname={location.pathname}
          onLoggedOut={() => {
            setUser(null);
            localStorage.clear();
          }}
        />
      </Container>
      <Container>
        <Row
          className={
            location.pathname !== '/'
              ? 'justify-content-center ' + location.pathname.slice(1)
              : 'justify-content-start'
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
                    <Col md={10} xl={8}>
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
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
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
                    <Navigate to='/login' />
                  ) : (
                    <SearchResultsView
                      user={user}
                      token={token}
                      onToggleFavorite={toggleFavorite}
                      isMovieFavorite={isMovieFavorite}
                    />
                  )}
                </>
              }
              // element={
              //   <>
              //     {!user ? (
              //       <Navigate to='/login' replace />
              //     ) : movies.length === 0 ? (
              //       <Col>The list is empty!</Col>
              //     ) : (
              //       <>
              //         {movies.map((movie) => (
              //           <Col className='mb-4' key={movie.id} md={6}>
              //             <MovieCard
              //               movie={movie}
              //               isFavorite={isMovieFavorite(movie.id)}
              //               onToggleFavorite={toggleFavorite}
              //             />
              //           </Col>
              //         ))}
              //       </>
              //     )}
              //   </>
              // }
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
            {/* <Route
              path='/search'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' />
                  ) : (
                    <SearchResultsView
                      user={user}
                      token={token}
                      onToggleFavorite={toggleFavorite}
                      isMovieFavorite={isMovieFavorite}
                    />
                  )}
                </>
              }
            /> */}
          </Routes>
        </Row>
      </Container>
      <Footer
        user={user}
        pathname={location.pathname}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />
    </>
  );
};

export default MainView;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const MovieView = ({ movies, isFavorite, onToggleFavorite }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteState, setFavoriteState] = useState(isFavorite);

  useEffect(() => {
    console.log('MovieView - movieId from params:', movieId);
    console.log('MovieView - available movies:', movies);

    if (!movieId || !movies || movies.length === 0) {
      setError('Movie ID or movies data is missing');
      setLoading(false);
      return;
    }

    const foundMovie = movies.find((m) => m.id === movieId);
    console.log('MovieView - found movie:', foundMovie);

    if (foundMovie) {
      setMovie(foundMovie);
      setError(null);
    } else {
      setError('Movie not found');
    }
    setLoading(false);
  }, [movieId, movies]);

  // Update favoriteState when isFavorite prop changes
  useEffect(() => {
    console.log('MovieView - isFavorite prop changed:', isFavorite);
    setFavoriteState(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = () => {
    console.log('MovieView - Toggling favorite for movie:', movie);
    console.log('MovieView - Current movie ID:', movieId);
    console.log('MovieView - Current favorite state:', favoriteState);

    if (!movieId) {
      console.error('MovieView - Cannot toggle favorite: movieId is missing');
      return;
    }

    // Update local state immediately for better UX
    setFavoriteState(!favoriteState);

    // Call the parent component's toggle function
    onToggleFavorite(movieId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Row className='justify-content-center'>
      <Col md={8}>
        <Card className='movie-details'>
          <Card.Img variant='top' src={movie.image} alt={movie.title} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <strong>Director:</strong> {movie.director}
            </Card.Text>
            <Card.Text>
              <strong>Genre:</strong> {movie.genre}
            </Card.Text>
            <Card.Text>
              <strong>Description:</strong> {movie.description}
            </Card.Text>
            <Card.Text>
              <strong>Actors:</strong>{' '}
              {Array.isArray(movie.actors)
                ? movie.actors.join(', ')
                : movie.actors}
            </Card.Text>
            <Button
              variant={favoriteState ? 'danger' : 'primary'}
              onClick={handleToggleFavorite}
            >
              {favoriteState ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      actors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]).isRequired,
    })
  ).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

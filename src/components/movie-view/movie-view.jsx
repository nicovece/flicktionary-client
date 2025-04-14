import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
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
    <Col md={8}>
      <Card className='card--movieview'>
        <Card.Header className='d-flex justify-content-between align-items-center'>
          <Link to='/'>
            <Button variant='outline-primary'>Back</Button>
          </Link>
          {onToggleFavorite && (
            <>
              <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                  <Tooltip
                    className={
                      isFavorite
                        ? 'favorite__tooltip favorite__tooltip--remove'
                        : 'favorite__tooltip favorite__tooltip--add'
                    }
                  >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Tooltip>
                }
              >
                <Button
                  className='border-0 bg-transparent favorite__button'
                  onClick={handleToggleFavorite}
                >
                  {isFavorite ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      // class='bi bi-heart-fill'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      // className='bi bi-heart'
                      viewBox='0 0 16 16'
                    >
                      <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15' />
                    </svg>
                  )}
                  <span className='visually-hidden'>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </span>
                </Button>
              </OverlayTrigger>
            </>
          )}
        </Card.Header>
        <Card.Body>
          <Row className='justify-content-center'>
            <Col md={4}>
              <Card.Img
                variant='top'
                src={movie.image}
                alt={movie.title}
                className='mb-5 mb-md-0 card--movieview__image'
              />
            </Col>
            <Col md={8}>
              <Card.Title className='card--movieview__title h1'>
                <h1>{movie.title}</h1>
              </Card.Title>
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
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
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

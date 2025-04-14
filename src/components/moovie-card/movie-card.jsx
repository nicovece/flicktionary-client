import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event propagation

    if (onToggleFavorite && movie && movie.id) {
      console.log('MovieCard: Toggling favorite for movie:', movie.id);
      console.log('Movie details:', movie);
      onToggleFavorite(movie.id);
    } else {
      console.log('Cannot toggle favorite: missing data', {
        hasToggleFunction: !!onToggleFavorite,
        hasMovie: !!movie,
        movieId: movie?.id,
      });
    }
  };

  return (
    <Card className='h-100 p-3 d-flex flex-column flex-md-row align-items-center border border-secondary card--movie'>
      <Card.Img variant='top' src={movie.image} className='w-50 w-md-25' />
      <Card.Body>
        <Card.Title className='card__title text-light'>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </Card.Title>
        {onToggleFavorite && (
          <Button
            variant={isFavorite ? 'danger' : 'outline-danger'}
            className='mt-2'
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

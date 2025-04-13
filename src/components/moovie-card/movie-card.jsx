import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <Card className='h-100 p-3 d-flex flex-column flex-md-row align-items-center border border-secondary'>
        <Card.Img variant='top' src={movie.image} className='w-50 w-md-25' />
        <Card.Body>
          <Card.Title className='card__title text-light'>
            {movie.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    // <div
    //   className='card'
    //   onClick={() => {
    //     onMovieClick(movie);
    //   }}
    // >
    //   <h3 className='card__title'>{movie.title}</h3>
    //   <img className='card__image' src={movie.image} alt={movie.title} />
    // </div>
    <Card
      className='h-100 p-3 d-flex flex-column flex-md-row align-items-center border border-secondary'
      onClick={() => onMovieClick(movie)}
    >
      <Card.Img variant='top' src={movie.image} className='w-50 w-md-25' />
      <Card.Body>
        <Card.Title className='card__title text-light'>
          {movie.title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

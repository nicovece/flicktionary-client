import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className='card'
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <h3 className='card__title'>{movie.title}</h3>
      <img className='card__image' src={movie.image} alt={movie.title} />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

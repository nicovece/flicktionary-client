import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className='movie__view'>
      <div className='movie__view__header'>
        <button
          onClick={onBackClick}
          className='main_button main_button--small'
        >
          Back
        </button>
      </div>
      <div id={`movie--${movie.id}`} className={`movie--${movie.id}`}>
        <h1>{movie.title}</h1>
        {movie.image && <img src={movie.image} alt={movie.title} />}
        <p>{movie.description}</p>
        <p>Genre: {movie.genre.Name}</p>
        <p>Director: {movie.director.Name}</p>
        <p>Actors: {movie.actors}</p>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

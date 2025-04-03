export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <h3 className='card__title'>
        {movie.Title} {movie.Featured && <small>Featured</small>}
      </h3>
    </div>
  );
};

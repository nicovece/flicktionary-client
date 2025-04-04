const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <button onClick={onBackClick}>Back</button>
      <h1>{movie.Title}</h1>
      {movie.Featured && <p>Featured</p>}
      <img
        className='movie-view__image'
        src={movie.ImagePath}
        alt={movie.Title}
      />
      <p>Director: {movie.Director.Name}</p>
      <p>Description: {movie.Description}</p>
      <p>Genre: {movie.Genre.Name}</p>
      <p>Actors: {movie.Actors.join(', ')}</p>
    </div>
  );
};

export default MovieView;

import { useState, useEffect } from 'react';
import { MovieCard } from '../moovie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// MainView component
const MainView = () => {
  // movies to be displayed
  const [movies, setMovies] = useState([]);
  // selected movie to be displayed
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://flicktionary.onrender.com/movies')
      .then((response) => response.json())
      .then((data) => {
        console.log('books from api:', data);
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          director: movie.Director,
          genre: movie.Genre,
          image: movie.ImagePath,
          featured: movie.Featured,
          actors: movie.Actors,
        }));
        // console.log('movies from api:', moviesFromApi);

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.genre.Name === selectedMovie.genre.Name &&
        movie.id !== selectedMovie.id
    );
    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
        />
        {similarMovies.length > 0 && (
          <div className='cards__list__wrapper'>
            <h3>Similar Movies</h3>
            <div className='cards__list'>
              {similarMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className='flicktionary-app'>
      <header>
        <h1>F L I C K T I O N A R Y</h1>
        <h2>A dictionary for flicks</h2>
      </header>
      <div className='cards__list'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={setSelectedMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default MainView;

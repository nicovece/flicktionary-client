import { useState } from 'react';
import MovieCard from '../moovie-card/movie-card';
import MovieView from '../movie-view/movie-view';
// MainView component
const MainView = () => {
  // const [movies, setMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className='flicktionary-app'>
      <h1>Flicktionary</h1>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={setSelectedMovie}
        />
      ))}
    </div>
  );
};

export default MainView;

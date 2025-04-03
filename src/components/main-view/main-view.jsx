import { useState } from 'react';
import { MovieCard } from '../moovie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// MainView component
export const MainView = () => {
  // const [movies, setMovies] = useState([]);
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'The Shawshank Redemption',
      Description:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      Genre: {
        Name: 'Drama',
        Description:
          'Stories focused on realistic characters dealing with emotional themes and interpersonal conflicts.',
      },
      Director: {
        Name: 'Frank Darabont',
        Bio: 'An American film director, screenwriter and producer, known for acclaimed film adaptations of Stephen King novels.',
        Birth: '1959-01-28',
        Death: null,
      },
      Actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
      Featured: true,
    },
    {
      id: 2,
      Title: 'Inception',
      Description:
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      Genre: {
        Name: 'Science Fiction',
        Description:
          'Speculative fiction dealing with imaginative concepts like futuristic settings, advanced technology, and time travel.',
      },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'A British-American film director known for his complex narratives, practical effects, and large-format filmmaking.',
        Birth: '1970-07-30',
        Death: null,
      },
      Actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
      Featured: true,
    },
    {
      id: 3,
      Title: 'Pulp Fiction',
      Description:
        'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      Genre: {
        Name: 'Crime',
        Description:
          'Focuses on the lives of criminals, law enforcement, and the intricate details of criminal acts and investigations.',
      },
      Director: {
        Name: 'Quentin Tarantino',
        Bio: 'An American filmmaker known for his stylized violence, non-linear storylines, and pop-culture references.',
        Birth: '1963-03-27',
        Death: null,
      },
      Actors: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
      Featured: false,
    },
    {
      id: 4,
      Title: 'Spirited Away',
      Description:
        "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
      Genre: {
        Name: 'Animation',
        Description:
          'Utilizes techniques where images are manipulated to appear as moving images, encompassing various styles and genres.',
      },
      Director: {
        Name: 'Hayao Miyazaki',
        Bio: 'A Japanese animator, filmmaker, and manga artist. Co-founder of Studio Ghibli, acclaimed for his imaginative and visually stunning animated features.',
        Birth: '1941-01-05',
        Death: null,
      },
      Actors: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'], // Japanese voice actors
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png',
      Featured: true,
    },
    {
      id: 5,
      Title: 'Parasite',
      Description:
        'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
      Genre: {
        Name: 'Thriller',
        Description:
          'Evokes excitement and suspense in the audience, often involving high stakes, mystery, and a race against time.',
      },
      Director: {
        Name: 'Bong Joon-ho',
        Bio: 'A South Korean film director and screenwriter known for his genre-bending films that often feature social themes, dark humor, and sudden tonal shifts.',
        Birth: '1969-09-14',
        Death: null,
      },
      Actors: ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png',
      Featured: true,
    },
    {
      id: 6,
      Title: 'The Matrix',
      Description:
        'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      Genre: {
        Name: 'Science Fiction',
        Description:
          'Speculative fiction dealing with imaginative concepts like futuristic settings, advanced technology, and alternative realities.',
      },
      Director: {
        Name: 'Lana Wachowski & Lilly Wachowski',
        Bio: 'American film and television directors, writers, and producers known for visually stunning and philosophically complex works.',
        Birth: '1965-06-21 & 1967-12-29',
        Death: null,
      },
      Actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
      Featured: false,
    },
    {
      id: 7,
      Title: 'Forrest Gump',
      Description:
        'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
      Genre: {
        Name: 'Comedy-Drama',
        Description:
          'Blends humorous elements with serious, often poignant subject matter.',
      },
      Director: {
        Name: 'Robert Zemeckis',
        Bio: 'An American filmmaker known for his pioneering work in visual effects, often blending genres like comedy, drama, and adventure.',
        Birth: '1951-05-14',
        Death: null,
      },
      Actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
      Featured: false,
    },
    {
      id: 8,
      Title: 'The Lord of the Rings: The Fellowship of the Ring',
      Description:
        'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      Genre: {
        Name: 'Fantasy',
        Description:
          'Features elements of magic, supernatural events, mythology, folklore, or exotic fantasy worlds.',
      },
      Director: {
        Name: 'Peter Jackson',
        Bio: 'A New Zealand film director, producer, and screenwriter best known for directing the epic Lord of the Rings and The Hobbit trilogies.',
        Birth: '1961-10-31',
        Death: null,
      },
      Actors: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',
      Featured: true,
    },
    {
      id: 9,
      Title: 'Gladiator',
      Description:
        'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
      Genre: {
        Name: 'Action',
        Description:
          'Characterized by sequences involving physical feats, combat, chases, and explosions.',
      },
      Director: {
        Name: 'Ridley Scott',
        Bio: 'An English film director and producer known for his atmospheric, visually striking films across genres like science fiction, historical epics, and crime.',
        Birth: '1937-11-30',
        Death: null,
      },
      Actors: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png',
      Featured: false,
    },
    {
      id: 10,
      Title: 'Mad Max: Fury Road',
      Description:
        'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
      Genre: {
        Name: 'Action',
        Description:
          'Characterized by sequences involving physical feats, combat, chases, and explosions, often in a high-octane setting.',
      },
      Director: {
        Name: 'George Miller',
        Bio: 'An Australian film director, producer, screenwriter, and former physician, best known for creating the Mad Max franchise.',
        Birth: '1945-03-03',
        Death: null,
      },
      Actors: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg',
      Featured: true,
    },
  ]);

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

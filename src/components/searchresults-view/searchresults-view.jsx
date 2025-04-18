import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  Tab,
  Tabs,
  Accordion,
} from 'react-bootstrap';
import { MovieCard } from '../moovie-card/movie-card';
import PropTypes from 'prop-types';
import './searchresults-view.scss';

export const SearchResultsView = ({
  user,
  token,
  onToggleFavorite,
  isMovieFavorite,
}) => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({
    q: '',
    title: '',
    genre: '',
    director: '',
    actor: '',
    featured: '',
  });
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    genres: [],
    directors: [],
    actors: [],
  });
  const location = useLocation();

  // Fetch options for dropdowns
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          'https://flicktionary.onrender.com/movies',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }

        const data = await response.json();

        // Extract unique values for each category
        const genres = [
          ...new Set(data.map((movie) => movie.Genre.Name)),
        ].sort();
        const directors = [
          ...new Set(data.map((movie) => movie.Director.Name)),
        ].sort();
        const actors = [
          ...new Set(data.flatMap((movie) => movie.Actors)),
        ].sort();

        setOptions({
          genres,
          directors,
          actors,
        });
      } catch (err) {
        console.error('Error fetching options:', err);
        setError('Failed to load filter options');
      }
    };

    if (token) {
      fetchOptions();
    }
  }, [token]);

  // Debounce function to limit API calls
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const performSearch = async (params) => {
    try {
      // Create URL with query parameters
      const queryString = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryString.append(key, value);
      });

      const url = `https://flicktionary.onrender.com/search?${queryString.toString()}`;
      console.log('Searching with URL:', url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      console.log('Search results:', data);

      const moviesFromApi = data.map((movie) => ({
        id: movie._id,
        title: movie.Title,
        description: movie.Description,
        director: movie.Director.Name,
        genre: movie.Genre.Name,
        image: movie.ImagePath,
        featured: movie.Featured,
        actors: movie.Actors,
      }));

      setMovies(moviesFromApi);
      setError(null);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching for movies');
      setMovies([]);
    }
  };

  // Create a debounced version of performSearch
  const debouncedSearch = useCallback(
    debounce((params) => performSearch(params), 500),
    [token]
  );

  useEffect(() => {
    // Get search parameters from URL
    const params = new URLSearchParams(location.search);
    const searchQuery = {
      q: params.get('q') || '',
      title: params.get('title') || '',
      genre: params.get('genre') || '',
      director: params.get('director') || '',
      actor: params.get('actor') || '',
      featured: params.get('featured') || '',
    };
    setSearchParams(searchQuery);
    performSearch(searchQuery);
  }, [location]);

  // Effect to trigger search when searchParams change
  useEffect(() => {
    debouncedSearch(searchParams);
  }, [searchParams, debouncedSearch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchParams); // Immediate search on form submit
  };

  const handleReset = () => {
    const emptyParams = {
      q: '',
      title: '',
      genre: '',
      director: '',
      actor: '',
      featured: '',
    };
    setSearchParams(emptyParams);
    performSearch(emptyParams);
  };
  const [key, setKey] = useState('global');
  return (
    <Col>
      <Row className='mb-5 pb-5 justify-content-center '>
        <Col>
          <Form onSubmit={handleSearch} className='mb-4'>
            <Row className='justify-content-center my-md-3 g-4'>
              <Col xs={12} md={10} lg={6} className='mb-0'>
                <Form.Group className='mb-3- py-4-'>
                  <Form.Label className='text-info visually-hidden'>
                    Global Search
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='q'
                    value={searchParams.q}
                    onChange={handleInputChange}
                    placeholder='Search movies...'
                    className='border-primary'
                    size='lg'
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={2} lg={2} className='mb-5'>
                <Button
                  variant='primary'
                  type='submit'
                  size='lg'
                  className='w-100'
                >
                  Search
                </Button>
              </Col>
            </Row>
            <Row className='mb-5 pb-5 g-4 justify-content-center align-items-end'>
              <Col xs={12} md={3}>
                {/* <Form.Group className='mb-3 py-4'>
                  <Form.Label className='text-info'>Title</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    value={searchParams.title}
                    onChange={handleInputChange}
                    placeholder='Search by title...'
                    className='border-primary'
                    size='lg'
                  />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label className='text-info'>Filter by Genre</Form.Label>
                  <Form.Select
                    name='genre'
                    value={searchParams.genre}
                    onChange={handleInputChange}
                    className='border-primary'
                    size='lg'
                  >
                    <option value=''>All Genres</option>
                    {options.genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group>
                  <Form.Label className='text-info'>
                    Filter by Director
                  </Form.Label>
                  <Form.Select
                    name='director'
                    value={searchParams.director}
                    onChange={handleInputChange}
                    className='border-primary'
                    size='lg'
                  >
                    <option value=''>All Directors</option>
                    {options.directors.map((director) => (
                      <option key={director} value={director}>
                        {director}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group>
                  <Form.Label className='text-info'>Filter by Actor</Form.Label>
                  <Form.Select
                    name='actor'
                    value={searchParams.actor}
                    onChange={handleInputChange}
                    className='border-primary'
                    size='lg'
                  >
                    <option value=''>All Actors</option>
                    {options.actors.map((actor) => (
                      <option key={actor} value={actor}>
                        {actor}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={1}>
                <Button
                  variant='outline-primary'
                  onClick={handleReset}
                  size='lg'
                  className='flex-shrink-1'
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        {error && (
          <Col xs={12}>
            <div className='alert alert-danger' role='alert'>
              <h4>{error}</h4>
            </div>
          </Col>
        )}
        <Col xs={12}>
          <Row>
            {movies.map((movie) => (
              <Col key={movie.id} xs={12} md={6} className='mb-4'>
                <MovieCard
                  movie={movie}
                  isFavorite={isMovieFavorite(movie.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

SearchResultsView.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  onToggleFavorite: PropTypes.func.isRequired,
  isMovieFavorite: PropTypes.func.isRequired,
};

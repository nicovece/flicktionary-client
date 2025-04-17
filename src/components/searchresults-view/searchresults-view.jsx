import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MovieCard } from '../moovie-card/movie-card';
import PropTypes from 'prop-types';

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
  const location = useLocation();

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

  return (
    <Container>
      <h2 className='text-light mb-4'>Search Movies</h2>

      <Form onSubmit={handleSearch} className='mb-4'>
        <Row>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label className='text-light'>General Search</Form.Label>
              <Form.Control
                type='text'
                name='q'
                value={searchParams.q}
                onChange={handleInputChange}
                placeholder='Search across all fields...'
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label className='text-light'>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value={searchParams.title}
                onChange={handleInputChange}
                placeholder='Search by title...'
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label className='text-light'>Genre</Form.Label>
              <Form.Control
                type='text'
                name='genre'
                value={searchParams.genre}
                onChange={handleInputChange}
                placeholder='Search by genre...'
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label className='text-light'>Director</Form.Label>
              <Form.Control
                type='text'
                name='director'
                value={searchParams.director}
                onChange={handleInputChange}
                placeholder='Search by director...'
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label className='text-light'>Actor</Form.Label>
              <Form.Control
                type='text'
                name='actor'
                value={searchParams.actor}
                onChange={handleInputChange}
                placeholder='Search by actor...'
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label className='text-light'>Featured</Form.Label>
              <Form.Select
                name='featured'
                value={searchParams.featured}
                onChange={handleInputChange}
              >
                <option value=''>All Movies</option>
                <option value='true'>Featured Only</option>
                <option value='false'>Non-Featured Only</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant='primary' type='submit'>
          Search
        </Button>
      </Form>

      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}

      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className='mb-4'>
            <MovieCard
              movie={movie}
              isFavorite={isMovieFavorite(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

SearchResultsView.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  onToggleFavorite: PropTypes.func.isRequired,
  isMovieFavorite: PropTypes.func.isRequired,
};

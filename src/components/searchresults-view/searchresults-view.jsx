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
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={6} className='my-3 pb-4 '>
          <h3 className='mb-0'>Search Movies</h3>
        </Col>
      </Row>
      <Row className='mb-5 pb-5 justify-content-center'>
        <Col xs={12} md={10} lg={6} className='mb-5'>
          <Form onSubmit={handleSearch} className='mb-4'>
            <Row>
              <Col>
                <Tabs
                  id='controlled-tab-example'
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className='mb-3'
                  justify
                >
                  <Tab eventKey='global' title='Global search'>
                    <Form.Group className='mb-3 py-4'>
                      <Form.Label className='text-info visually-hidden'>
                        Global Search
                      </Form.Label>
                      <Form.Control
                        type='text'
                        name='q'
                        value={searchParams.q}
                        onChange={handleInputChange}
                        placeholder='Search across all fields...'
                        className='border-primary'
                        size='lg'
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='contact' title='or by:' disabled>
                    Tab content for Contact
                  </Tab>
                  <Tab eventKey='title' title='Title'>
                    <Form.Group className='mb-3 py-4'>
                      <Form.Label className='text-info visually-hidden'>
                        Title
                      </Form.Label>
                      <Form.Control
                        type='text'
                        name='title'
                        value={searchParams.title}
                        onChange={handleInputChange}
                        placeholder='Search by title...'
                        className='border-primary'
                        size='lg'
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='genre' title='Genre'>
                    <Form.Group className='mb-3 py-4'>
                      <Form.Label className='text-info visually-hidden'>
                        Genre
                      </Form.Label>
                      <Form.Control
                        type='text'
                        name='genre'
                        value={searchParams.genre}
                        onChange={handleInputChange}
                        placeholder='Search by genre...'
                        className='border-primary'
                        size='lg'
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='director' title='Director'>
                    <Form.Group className='mb-3 py-4'>
                      <Form.Label className='text-info visually-hidden'>
                        Director
                      </Form.Label>
                      <Form.Control
                        type='text'
                        name='director'
                        value={searchParams.director}
                        onChange={handleInputChange}
                        placeholder='Search by director...'
                        className='border-primary'
                        size='lg'
                      />
                    </Form.Group>
                  </Tab>
                  <Tab eventKey='actor' title='Actor'>
                    <Form.Group className='mb-3 py-4'>
                      <Form.Label className='text-info visually-hidden'>
                        Actor
                      </Form.Label>
                      <Form.Control
                        type='text'
                        name='actor'
                        value={searchParams.actor}
                        onChange={handleInputChange}
                        placeholder='Search by actor...'
                        className='border-primary'
                        size='lg'
                      />
                    </Form.Group>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
            <Row className='mb-5 pb-5 justify-content-center'>
              <Col md={6}>
                <ButtonGroup className='d-flex justify-content-center w-100'>
                  <Button
                    variant='primary'
                    type='submit'
                    size='lg'
                    className='w-75'
                  >
                    Search
                  </Button>
                  <Button
                    variant='outline-primary'
                    onClick={handleReset}
                    size='lg'
                    className='flex-shrink-1'
                  >
                    Reset
                  </Button>
                </ButtonGroup>
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

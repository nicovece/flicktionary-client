import PropTypes from 'prop-types';
import { Row, Col, Navbar, Container } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Col
      md={8}
      className='movie__view'
      id={`movie--${movie.id}`}
      className={`movie--${movie.id} mb-5`}
    >
      <Row className='justify-content-center'>
        <Col className='col-12'>
          <div className='movie__view__header'>
            <button
              onClick={onBackClick}
              className='main_button main_button--small'
            >
              Back
            </button>
          </div>
        </Col>
        <Col md={4} className='d-flex mb-5 mb-md-0'>
          {movie.image && (
            <img
              src={movie.image}
              alt={movie.title}
              className='w-100 movie__view__image'
            />
          )}
        </Col>
        <Col md={8} className='col-10 mb-5 mb-md-0'>
          <h1>{movie.title}</h1>

          <p>{movie.description}</p>
          <p>Genre: {movie.genre.Name}</p>
          <p>Director: {movie.director.Name}</p>
          <p>Actors: {movie.actors}</p>
        </Col>
      </Row>
    </Col>
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

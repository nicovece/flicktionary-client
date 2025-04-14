import { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Container,
  Button,
  Modal,
} from 'react-bootstrap';
import { MovieCard } from '../moovie-card/movie-card';
import { useNavigate } from 'react-router-dom';

export const ProfileView = ({ user, movies, onLoggedOut }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    dateOfBirth: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!user) return;

    // Fetch user information
    fetch(`https://flicktionary.onrender.com/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((users) => {
        const currentUser = users.find((u) => u.Username === user.Username);
        setUserInfo(currentUser);
        setFormData({
          username: currentUser.Username,
          password: '',
          email: currentUser.Email,
          dateOfBirth: currentUser.Birthday
            ? new Date(currentUser.Birthday).toISOString().split('T')[0]
            : '',
        });
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user information');
      });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const updateData = {
      Username: formData.username,
      Email: formData.email,
      Birthday: formData.dateOfBirth,
    };

    // Only include password if it's being changed
    if (formData.password) {
      updateData.Password = formData.password;
    }

    fetch(`https://flicktionary.onrender.com/users/${userInfo.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUserInfo(updatedUser);
        setSuccess('Profile updated successfully');
        // Clear password field after successful update
        setFormData((prev) => ({ ...prev, password: '' }));
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setError('Failed to update profile');
      });
  };

  const handleDeregister = () => {
    if (
      !window.confirm(
        'Are you sure you want to deregister? This action cannot be undone.'
      )
    ) {
      return;
    }

    fetch(`https://flicktionary.onrender.com/users/${userInfo.Username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to deregister');
        }
        onLoggedOut();
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error deregistering:', error);
        setError('Failed to deregister');
      });
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const favoriteMovies = movies.filter(
    (movie) =>
      userInfo.FavoriteMovies && userInfo.FavoriteMovies.includes(movie.id)
  );

  return (
    <Row className='justify-content-center'>
      <Col md={8}>
        <Button variant='primary' onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className='mb-4'>
              <Card.Header as='h3'>Profile Information</Card.Header>
              <Card.Body>
                {error && <div className='alert alert-danger'>{error}</div>}
                {success && (
                  <div className='alert alert-success'>{success}</div>
                )}

                <Form onSubmit={handleUpdateProfile}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      name='username'
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder='Leave blank to keep current password'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type='date'
                      name='dateOfBirth'
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='me-2'>
                    Update Profile
                  </Button>
                  <Button
                    variant='danger'
                    type='button'
                    onClick={handleDeregister}
                  >
                    Deregister
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Card>
          <Card.Header as='h3'>Favorite Movies</Card.Header>
          <Card.Body>
            {favoriteMovies.length === 0 ? (
              <p>No favorite movies yet.</p>
            ) : (
              <Row>
                {favoriteMovies.map((movie) => (
                  <Col key={movie.id} md={4} className='mb-4'>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

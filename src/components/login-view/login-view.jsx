import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://flicktionary.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
    console.log('Login response: ', data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className='d-flex justify-content-between align-items-center border-bottom border-secondary mb-4 pb-3'>
        <h4 className='mb-0'>Login</h4>
        <span>
          <i className='me-4'>or</i>
          <Link to='/signup'>
            <Button variant='outline-primary'>Signup</Button>
          </Link>
        </span>
      </div>
      <Form.Group controlId='formUsername' className='mb-4'>
        <Form.Label className='text-info'>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='3'
          className='border-primary'
        />
      </Form.Group>

      <Form.Group controlId='formPassword' className='mb-4'>
        <Form.Label className='text-info'>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border-primary'
        />
      </Form.Group>
      <Button variant='primary' type='submit' className='btn-lg'>
        Submit
      </Button>
    </Form>
  );
};

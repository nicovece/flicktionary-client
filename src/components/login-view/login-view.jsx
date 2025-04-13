import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='3'
        />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
    // <div className='login_view'>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Username:
    //       <input
    //         type='text'
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //         placeholder='Username'
    //       />
    //     </label>
    //     <label>
    //       Password:
    //       <input
    //         type='password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         placeholder='Password'
    //       />
    //     </label>
    //     <button className='main_button' type='submit'>
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
};

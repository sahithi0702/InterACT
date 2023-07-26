import React, { useState } from 'react';
import './Login.css'
import { useNavigate} from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/Home');
      } else {
        const error = await response.json();
        alert('Enter Correct Details');
        console.log('Login failed:', error.message);
      }
    } catch (error) {
      alert('Error occurred during Login');
      console.error('Error occurred during login:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };
  const handleAdmin=()=>{
    navigate('/Admin')
  }

  return (
    <div className="RegistrationPage">
      <fieldset className="RegistrationPage-fieldset">
        <legend style={{ color: 'black' }}>Login Here..!!</legend>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              style={{
                fontWeight: 'bold',
                marginRight: '10px',
                display: 'block',
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{
                marginBottom: '10px',
                padding: '5px',
                border: 'none',
                borderBottom: '1px solid black',
                width: '100%',
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{
                fontWeight: 'bold',
                marginRight: '10px',
                display: 'block',
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{
                marginBottom: '10px',
                padding: '5px',
                border: 'none',
                borderBottom: '1px solid black',
                width: '100%',
              }}
              required
            />
          </div>
          <button
            type="submit"
            className='btn text-light btn-dark'
          >
            Login
          </button>
        </form>
        <div className='text-center'>
        <p style={{color:'black'}}>
          Don't have an account? {'  '}
          <button className='btn btn-dark text-light' onClick={handleRegister}>Register</button>
        </p>
        </div>
        <button className='btn btn-dark text-info' onClick={handleAdmin}>Click Here for Admin Login</button> 
      </fieldset>
    </div>
  );
}

export default Login;

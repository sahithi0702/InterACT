import React, { useState } from 'react';
import './Admin.css';
import { useNavigate,Link } from 'react-router-dom';
function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to a protected route on successful login
        navigate('/Adminhome');
        // <Link to='/Userhome'>Abcd</Link>
      } else {
        const error = await response.json();
        console.log(email)
        console.log(password)
        alert('Enter correct Details', error.message);
        console.log('Login failed:', error.message);
      }
    } catch (error) {
      alert('Error occurred during login:', error);
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className="RegistrationPage">
      <fieldset className="RegistrationPage-fieldset">
        <legend style={{ color: 'black' }}>Admin Login Here..!!</legend>
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
            className='btn btn-dark text-light'
          >
            Login
          </button>
        </form>
        
      </fieldset>
    </div>
  );
}

export default Admin;

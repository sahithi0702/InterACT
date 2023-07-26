import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age,setAge]=useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object with the registration data
    const registrationData = {
      name: name,
      email: email,
      password: password,
      age:age
    };

    try {
      // Send a POST request to the backend server with the registration data
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        // Registration successful, do something with the response
        console.log('Registration successful');
        navigate('/Home');
      } else {
        // Registration failed, handle the error
        alert('Registration Failed :',response.statusText);
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      alert('Error:', error);
      console.error('Error:', error);
    }
  };

  return (
    <div className="RegistrationPage">
    <fieldset className="RegistrationPage-fieldset">
      <legend style={{color: "black"}}>Register Here..!!</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" style={{fontWeight: "bold", marginRight: "10px", display: "block"}}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{marginBottom: "10px", padding: "5px", border: "none", borderBottom: "1px solid black", width: "100%"}}
            required
          />
        </div>
        <div>
          <label htmlFor="email" style={{fontWeight: "bold", marginRight: "10px", display: "block"}}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{marginBottom: "10px", padding: "5px", border: "none", borderBottom: "1px solid black", width: "100%"}}
            required
          />
        </div>
        <div>
          <label htmlFor="password" style={{fontWeight: "bold", marginRight: "10px", display: "block"}}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{marginBottom: "10px", padding: "5px", border: "none", borderBottom: "1px solid black", width: "100%"}}
            required
          />
        </div>
        <div>
          <label htmlFor="age" style={{fontWeight: "bold", marginRight: "10px", display: "block"}}>Age</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            style={{marginBottom: "10px", padding: "5px", border: "none", borderBottom: "1px solid black", width: "100%"}}
            required
          />
        </div>
        <div></div>
        <button type="submit" className='btn btn-dark text-light'>
          Register
        </button>
      </form>
    </fieldset>
  </div>
  );
}
export default Register;

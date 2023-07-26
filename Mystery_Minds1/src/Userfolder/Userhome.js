import {Link} from 'react-router-dom'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Userhome(){
  const navigate=useNavigate()

  const handleLogout = () => {
    // Make API call to clear session data on the server
    fetch('/api/logout', { method: 'GET' })
      .then(response => { 
        navigate('/')
      })
      .catch(error => {
        console.error('Failed to logout:', error);
      });
  };

    return(
        <div >

        <nav className="navbar bg-dark">
          <div className="container-fluid  ">
            <div className="navbar-header">
              <h3 className='text-primary'>Mystery Minds</h3>
            </div>
            <ul className="nav ">
              <li><Link className="nav-link"to="/Home">Home</Link></li>
              <li><Link className="nav-link" to="/Availabletests">AvailableTests</Link></li>
              <li><Link className="nav-link" to="/Leaderboard">Leaderboard</Link></li>
              <li><Link className="nav-link"  onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </nav>
      
    </div>
    )
}
export default Userhome;
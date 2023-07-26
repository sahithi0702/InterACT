import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clue8.css';
import Scoredisplay from './Scoredisplay';

function Clue8() {
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState('');
  let a = 'Clue8';
  let navigate = useNavigate();

  const handleHintClick = () => {
    setShowHint(true);
  };
 
  const clickedonsubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/clue8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, a, showHint }),
      });
        const error = await response.json();
      if (response.ok) {
        navigate('/Clue9');
      }else if(error.message==='loggedout'){
        alert("Session Timed-Out Please Login...!")
      } 
      else {
        window.location.reload();
        if (error.message === 'Chances Over Please go back') {
          alert('Wrong Answer, Remaining Chances are Zero!');
          navigate('/AvailableTests');
        } else {
          alert('Wrong Answer, Try Again');
          console.log('Wrong Answer, Try Again....', error.message);
        }
      }
    } catch (error) {
      alert('Error occurred during Login');
      console.error('Error occurred during login:', error);
    }
  };
  const clickedonrestart=async()=>{
    try {
      const response = await fetch('/api/restart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/Availabletests');
      } 
    }catch (error) {
      alert('Error occurred during Login');
      console.error('Error occurred during login:', error);
    }
  }
  return (
    <div>
      <Scoredisplay/>
    <div className="b8">
      <div>
        <div className="col-md-12">
          <div>
            <div className="text-center">
              <h1 style={{ textAlign: 'center', color: 'yellow' }}>
                LEVEL-8 In The Dark{' '}
                <img
                  src="https://cdn.pixabay.com/photo/2013/07/13/11/42/star-158502__340.png"
                  onClick={clickedonsubmit}
                  alt="Star"
                />
              </h1>
            </div>
            <h2 style={{ color: 'white', marginTop: '20px' }}>
              As the lost individual found themselves in darkness, they looked up into the sky and spotted many stars. They marveled at the twinkling lights that seemed to guide their way. The stars formed constellations that told stories of ancient myths and legends. Find the solution from the above sentence to unlock the next clue and continue the journey towards solving the puzzle.
            </h2>
            <div className="buttons-container">
              <button className="btn btn-primary reset-button m-3" onClick={clickedonrestart} style={{ marginTop: '10px' }}>
                Restart
              </button>
              <button className="btn btn-danger hint-button m-3" onClick={handleHintClick} style={{ marginTop: '20px' }}>
                Check out Hint
              </button>
              {showHint && (
                <div className="hint-message" style={{ color: 'yellow', textAlign: 'center', marginTop: '20px' }}>
                  <h3 className='bg-light'>*Find for the Star to Move to Next Clue*</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Clue8;

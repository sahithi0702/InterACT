import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clue5.css';
import Scoredisplay from './Scoredisplay';
function Clue5() {
  const [showImage, setShowImage] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState('');
  let a = 'Clue5';
  let navigate = useNavigate();

  const handleLinkClick = () => {
    setShowImage(true);
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  const clickedonsubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/clue5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, a, showHint }),
      });

      if (response.ok) {
        navigate('/Clue6');
      } else {
        window.location.reload();
        const error = await response.json();
        if (error.message === 'Chances Over Please go back') {
          alert('Wrong Answer , Remaining Chances are Zero!');
          navigate('/AvailableTests');
        }else if(error.message==='loggedout'){
          alert("Session Timed-Out Please Login...!")
        } 
        else {
          alert('Wrong Answer Try Again');
          console.log('Wrong Answer Try Again....', error.message);
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
    <div className='b5'>
      
      <div className='container5'>
        <h1
          style={{
            textAlign: 'center',
            color: 'black',
          }}
        >
          LEVEL-5 Purchase and Clue Unveil
        </h1>
        <h2
          style={{
            color: 'white',
            paddingTop: '5px',
            fontFamily: 'Georgia, serif',
            paddingLeft: '15px',
            paddingLeft: '15px',
          }}
        >
          The child's mother asked him to bring a vegetable from the shop, and he was worried about forgetting. To remember, he cracked the vegetable using a clever trick based on a provided photo.
        </h2>
        <div
          className='input-container5'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column', /* Added to center buttons vertically */
          }}
        >
          <a href='#' onClick={handleLinkClick}>
            <button style={{ margin: '10px' }}>check-photo</button>
          </a>
          <input
            type='textfeild'
            style={{ marginLeft: '20px', height: '43px' }}
            placeholder='Enter your answer in lowercase'
            onChange={(event) => setInput(event.target.value)}
          />
          <div className='buttons5' style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={clickedonsubmit} className='btn btn-dark text-info m-2'>
              Submit
            </button>
            <button className='btn btn-dark text-info m-2' onClick={clickedonrestart}>Restart</button>
          </div>
          <button onClick={handleHintClick} className='btn btn-dark text-info m-2'>
            Hint
          </button>
        </div>
        {showHint && (
          <h3
            style={{
              color: 'darkblue',
              textAlign: 'center',
              marginLeft: '10px',
              paddingTop: '15px',
            }}
          >
            It's a root vegetable
            </h3>
        )}
        {showImage && (
          <div style={{ textAlign: 'center', paddingTop: '15px' }} className='w-50'>
            <img
              src='https://i.ytimg.com/vi/UJXHkseUKDc/maxresdefault.jpg'
              alt='vegetables'
              style={{ width: '80%', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Clue5;


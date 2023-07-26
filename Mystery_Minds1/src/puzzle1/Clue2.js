import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clue2.css';
import Scoredisplay from './Scoredisplay';


function Clue2() {
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState('');
  let a = 'Clue2';
  let navigate = useNavigate();
  const clickedonHint = () => {
    setShowHint(true);
  };
  const clickedonsubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/clue2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, a, showHint }),
      });

      if (response.ok) {
        navigate('/Clue3');
      } else {
        window.location.reload();
        const error = await response.json();
        if (error.message === 'Chances Over Please go back') {
          alert('Wrong Answer , Remaining Chances are Zero!');
          navigate('/AvailableTests');
        }
        else if(error.message==='loggedout'){
          alert("Session Timed-Out Please Login...!")
        } else {
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
    
    <div className='b2'>
     
      <div className='container'>
        <h1 style={{ textAlign: 'center', color: 'darkblue' }}>LEVEL-2 Riddle..Riddle..</h1>
        <h2 style={{ color: 'black', paddingTop: '15px', fontFamily: 'Georgia, serif', paddingLeft: '15px', paddingLeft: '35px' }}>
        <span>Story : </span>The boy met his friend while going to the shop. When asked about his friend's destination, the friend responded with a riddle that would reveal, Which shop he was going to.
        </h2>
        <h2 style={{ color: '#4B0082', paddingTop: '5px', fontFamily: 'Georgia, serif', paddingLeft: '15px', paddingLeft: '35px' }}>
         <b>"I show you the world in motion; I show you both the real and the fake. Your eyes are there for me to please."</b> 
        </h2>
        <div className='text-center' >
            <input type='textarea' style={{ marginLeft: '20px', width: '400px', height: '43px' }} placeholder='Enter your answer in lowercase' onChange={(event) => setInput(event.target.value)} />
            <br />
            <br />
            <div>
              <button type='submit' className='btn btn-dark text-info m-2' onClick={clickedonsubmit}>
                Submit
              </button>
              <button type='reset' className='btn btn-dark text-info m-2' onClick={clickedonrestart}>
                Restart
              </button>
            </div>
            <button  className='btn btn-dark text-info m-2' onClick={clickedonHint}>
              Hint
            </button>
            {showHint && (<div><h1 style={{ color: 'darkblue', textAlign: 'center', marginLeft: '10px', paddingTop: '15px' }}>I provide u an entertainment</h1> </div>)}
        </div>
        
      </div>
    </div>
    </div>
  );
  }
  export default Clue2;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Crowsound from '../Images/Crow Sound.mp3';
import './Clue4.css'
import Scoredisplay from './Scoredisplay';

function Clue4() {
    const [showHint, setShowHint] = useState(false);
    const [input, setInput] = useState('');
    let a = 'Clue4';
    let navigate = useNavigate();
    const handleHintClick = () => {
      setShowHint(true);
    };
  
    const clickedonsubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('/api/clue4', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input, a, showHint }),
        });
  
        if (response.ok) {
          navigate('/Clue5');
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
    <div >
        <Scoredisplay/>
    <div className='b4'>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundImage: "url('/path/to/background/image.jpg')" }}>
      <h1 className='text-dark'>LEVEL-4: "Hidden Clues in the Audio"</h1>
      <h2 className='text-light'>While coming out from the shop they saw a bird flying in the sky so friend asked to guess the name </h2>
      <h2 style={{ color:"darkblue" }}>what is the name of the bird?</h2>
      <div style={{ marginBottom: "20px" }}>
        <input id="answer" type="textbox" placeholder='Enter Your Answer in lowercase' style={{ height: "42px", marginLeft: "20px" }} onChange={(event) => setInput(event.target.value)} />
        <button onClick={clickedonsubmit} style={{ marginLeft: "20px" }}>Submit</button>
        <button style={{ marginLeft: "20px" }} onClick={clickedonrestart}>Restart</button>
        <button onClick={handleHintClick} style={{ marginLeft: "20px" }}>Hint</button>
      </div>
      {showHint && (
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ color:"black" }}>Bird which is in black colour</h1>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <audio src={Crowsound} controls></audio>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Clue4;
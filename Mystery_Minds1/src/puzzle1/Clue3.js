import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Video from '../Images/Video.mp4'
import './Clue3.css'
import Scoredisplay from './Scoredisplay';

function Clue3() {
    const [input, setInput] = useState('');
    let a = 'Clue3';
    let navigate = useNavigate();
    const [showHint, setShowHint] = useState(false);

  const handleHint = () => {
    setShowHint(true);
  };
  const clickedonsubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/clue3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, a, showHint }),
      });

      if (response.ok) {
        navigate('/Clue4');
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
    <div className='b3'>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundImage: "url('/path/to/background/image.jpg')" }}>
      <h1 className='text-dark'>LEVEL-3: "Hidden Clues in the Video"</h1>
      <h2 style={{ color:"white" }}><b className='text-dark'>Story : </b>So the boy and his friend went to the television shop and they have watched the Tom and jerry and his friend tested his observational skills by asking the simple question and the question he asked was</h2>
      <h2 style={{ color:"darkblue" }}>how many tests does jerry conducted to his student in the above episode?</h2>
      <div style={{ marginBottom: "20px" }}>
        <input id="answer" type="number" style={{ height: "42px", marginLeft: "20px" }} onChange={(event) => setInput(event.target.value)} />
        <button onClick={clickedonsubmit} style={{ marginLeft: "20px" }}>Submit</button>
        <button style={{ marginLeft: "20px" }} onClick={clickedonrestart}>Restart</button>
        <button onClick={handleHint} style={{ marginLeft: "20px" }}>Hint</button>
      </div>
      {showHint && (
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ color:"black" }}>Time Stamp- 1:55 to 4:25 </h1>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <video src={Video} style={{ width: "400px", height: "400px" }} controls></video>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Clue3;
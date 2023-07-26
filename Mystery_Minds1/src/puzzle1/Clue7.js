import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clue7.css';
import Scoredisplay from './Scoredisplay';

function Clue7() {
  const [showHint, setShowHint] = useState(false);

  const handleHintClick = () => {
    setShowHint(true);
  };
  const [input,setInput]=useState('');
  let a ='Clue7';
  let navigate=useNavigate();

  const clickedonsubmit=async(event)=>{
    event.preventDefault();
    try {
      const response = await fetch('/api/clue7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input,a,showHint}),
      });

      const error = await response.json();
      if (response.ok) {
        navigate('/Clue8');
      } 
      else if(error.message==='loggedout'){
        alert("Session Timed-Out Please Login...!")
      }
      else {
        window.location.reload();
        if (error.message==='Chances Over Please go back'){
          alert('Wrong Answer , Remaining Chances are Zero!');
          navigate('/AvailableTests')
        }
        else{
          alert('Wrong Answer Try Again');
        console.log('Wrong Answer Try Again....', error.message);
        }
        
      }
    } catch (error) {
      alert('Error occurred during Login');
      console.error('Error occurred during login:', error);
    }
  }

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
    <div className='b7'>
      <div className='container7'>
        <h1 style={{textAlign:"center",color:"darkblue"}}>LEVEL-7 Find direction</h1>
        <h2 style={{color:"darkgreen", paddingTop:"15px",fontFamily: "Georgia, serif" ,paddingLeft:"15px",paddingLeft:"35px"}}>The boy after cruzing through the forest he can't find the correct way back help him by solving the below question:</h2>
        <h2 style={{color:"#4B0082", paddingTop:"5px",fontFamily: "Georgia, serif" ,paddingLeft:"15px",paddingLeft:"35px"}}>If South-West becomes East, South-East becomes North and so on. What will North become?</h2>
        <div className="input-container">
          <input type="textarea" style={{marginLeft:"20px",width:"400px",height:"43px"}} placeholder="Enter your answer in lowercase" onChange={(event) => setInput(event.target.value)} />
          <br></br>
          <br></br>
          <button onClick={clickedonsubmit} style={{marginLeft:"10px",backgroundColor:"red"}}>Submit</button>
          <button  style={{marginLeft:"10px",backgroundColor:"red"}} onClick={clickedonrestart}>Restart</button>
          <button onClick={handleHintClick} style={{marginLeft:"10px",backgroundColor:"red"}}>Hint</button>
        </div>
        {showHint && <h1 style={{color:"darkblue", textAlign:"center", marginLeft:"10px",paddingTop:"15px"}}>Answer is hidden in question</h1>}
      </div>
    </div>
    </div>
  );
}

export default Clue7;
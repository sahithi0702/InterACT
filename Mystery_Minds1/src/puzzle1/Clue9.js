import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clue9.css';
import Scoredisplay from './Scoredisplay';
function Clue9() {
  const [showHint, setShowHint] = useState(false);
  const [input,setInput]=useState('');
  let a ='Clue9';
  let navigate=useNavigate()
  const handleHintClick = () => {
    setShowHint(true);
  };
  const clickedonsubmit=async(event)=>{
    event.preventDefault();
    try {
      const response = await fetch('/api/clue9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input,a,showHint}),
      });

      if (response.ok) {
        navigate('/Clue10');
      } 
      else {
        window.location.reload();
        const error = await response.json();
        if (error.message==='Chances Over Please go back'){
          alert('Wrong Answer , Remaining Chances are Zero!');
          navigate('/AvailableTests')
        }
        else if(error.message==='loggedout'){
          alert("Session Timed-Out Please Login...!")
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
    <div className='b9'>
      <div className='container'>
        <h1 className='bg-light text-success'>LEVEL-9 Find the relation..</h1>
        <h2 className='bg-light text-dark'>As the boy is going from the forest he lost his way so he saw a man. The man came near the boy and said i am your relative..and i will help you out only if you tell the answer of what iam to you?</h2>
        <h2 className='bg-light text-danger'>If your father is my father's brother, what is the relationship between you and me?</h2>
        <div className="input-container">
          <input type="textarea" style={{marginLeft:"20px",width:"400px",height:"43px"}} placeholder="Enter your answer in lowercase" onChange={(event) => setInput(event.target.value)} />
          <br></br>
          <br></br>
          <div className="button-container">
            <button onClick={clickedonsubmit} className='btn bg-dark text-info'>Submit</button>
            <button className='btn bg-dark text-info' onClick={clickedonrestart}>Restart</button>
            <button onClick={handleHintClick} className='btn bg-dark text-info'>Hint</button>
          </div>
        </div>
        {showHint && <h1 className='text-danger bg-light'>I am your cousin</h1>}
      </div>
    </div>
    </div>
  );
  
}

export default Clue9;
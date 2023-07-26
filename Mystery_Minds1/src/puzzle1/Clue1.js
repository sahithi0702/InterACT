import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Clue1.css';
import Scoredisplay from './Scoredisplay';
function Clue1() {
  const [showHint, setShowHint] = useState(false);
  const [input,setInput]=useState('');
  let a ='Clue1';
  let navigate=useNavigate();
  const handleHintClick = () => {
    setShowHint(true);
  };

  const clickedonsubmit=async(event)=>{
    event.preventDefault();
    try {
      const response = await fetch('/api/clue1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input,a,showHint}),
      });

      if (response.ok) {
        navigate('/Clue2');
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
    <div className="b1">
      <Scoredisplay/>
  <div className="clock1">
    <h1 className="text-center text-primary">LEVEL 1: FIND THE TIME</h1>
    <h2 className='text-right w-50 m-5 text-dark' style={{marginLeft: "auto", marginRight: "0"}}><span>Story : </span>A mother asked her son to go to the shop and buy some vegetables. The boy checked the time by looking at the clock before heading out.</h2>
    <h2 className='text-right w-50 m-5 text-success' style={{marginLeft: "auto", marginRight: "0"}}>
    Imagine a boy looking at a clock. If you were to view the clock from a mirror, 
    what time would be reflected in the mirror?
    </h2>

    <div className="main-container1">
      <div className="form-container1">
        <label className="label1 text-center">Enter the time between 1 to 12 :</label>
        <input
          type="text-box"
          className="input1 form-control"
          onChange={(event) => setInput(event.target.value)}
        />
        <div className="buttons-container1">
          <button className="btn text-info btn-dark m-2" onClick={clickedonsubmit}>
            Submit
          </button>
          <button className="btn text-info btn-dark m-2" onClick={clickedonrestart}>Restart</button>
        </div>
        <div className="text-center">
          <button
            className="btn btn-warning text-dark "
            onClick={handleHintClick}
          >
            Check out Hint
          </button>
        </div>
        {showHint && (
          <div className="hint-message1">
            <h3 className='text-danger'>*check the clock on the webpage to find the mirror time*</h3>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
}

export default Clue1;

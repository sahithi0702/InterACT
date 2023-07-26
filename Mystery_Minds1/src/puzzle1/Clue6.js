import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clue6.css';
import Scoredisplay from './Scoredisplay';
import image from '../Images/QR.png'


function Clue6() {
  const [input,setInput]=useState('');
  const [showHint, setShowHint] = useState(false);
  let a ='Clue6';
  let navigate=useNavigate();
  const handleHintClick = () => {
    setShowHint(true);
  };

  const clickedonsubmit=async(event)=>{
    event.preventDefault();
    try {
      const response = await fetch('/api/clue6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input,a,showHint}),
      });

      if (response.ok) {
        navigate('/Clue7');
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
    <div className='b6'> 
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1 style={{ textAlign: "center", color: "black" }}>LEVEL-6 FIND ANIMALS</h1>
              <h2 className='text-dark'>As he made his way back, he lost his path and found himself in a dense forest, he came across different animals. you'll need to dig deeper and search for hidden clue,Enter the number of Animals he saw during his journey.</h2>
              <input type="number" className="form-control" style={{ marginLeft: "auto", marginRight: "auto", marginTop:"10px", maxWidth: "300px"}} onChange={(event) => setInput(event.target.value)}></input>
              <br></br>
              <div className='d-flex justify-content-center'>
                <button className="btn btn-primary text-dark m-4" onClick={clickedonsubmit}>Submit</button>
                <button className="btn btn-primary text-dark m-4" onClick={clickedonrestart}>Restart</button>
              </div  >
              <div className='button6' style={{ textAlign: "center" }}>
              <button className="btn btn-dark text-light m-4" onClick={handleHintClick}>Hint</button>
              </div>
              {showHint && (
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                  <h3 className='text-dark bg-light'>Hint: Check the footer to get the next clue</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="foot text-center text-lg-start border border-white mt-xl-5 pt-4">
    
    <div className="container p-4">
     
      <div className="row">
        
        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h5 className="text-uppercase mb-4">OUR WORLD</h5>

          <ul className="list-unstyled mb-4">
            <li>
              <a href="#!" class="text-white">About us</a>
            </li>
            <li>
              <a href="#!" class="text-white">Collections</a>
            </li>
            <li>
              <a href="#!" class="text-white">Environmental philosophy</a>
            </li>
            <li>
              <a href="#!" class="text-white">Artist collaborations</a>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h5 className="text-uppercase mb-4">Assistance</h5>

          <ul className="list-unstyled">
            <li>
              <a href="#!" className="text-white">Contact us</a>
            </li>
            <li>
              <a href="#!" class="text-white">Size Guide</a>
            </li>
            <li>
              <a href="#!" class="text-white">Shipping Information</a>
            </li>
            <li>
              <a href="#!" class="text-white">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#!" class="text-white">Payment</a>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h5 className="text-uppercase mb-4">Careers</h5>

          <ul className="list-unstyled">
            <li>
              <a href="#!" class="text-white">Jobs</a>
            </li>
          </ul>
        </div>
       
        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 ">
          <h5 className="text-uppercase mb-4">Sign up to our newsletter</h5>
          <div className='align-center'>
          <img src={image} className='w-25 h-25'></img>
          </div>
        </div>
      
      </div>
   
    </div>

  </footer>
    </div>

  );
}

export default Clue6;


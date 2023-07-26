import { useNavigate } from 'react-router-dom';
import './Clue10.css';
import Scoredisplay from './Scoredisplay';

function Clue10() {
  let navigate=useNavigate();
const wentintohome=()=>{
  navigate('/AvailableTests')
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
    <div className='b10'>
      <h1 style={{color:"red",textAlign:"center"}}>Reached home..!!!</h1>
      <h2 className='bg-dark' style={{margin: "20px", textAlign: "center"}}>
        Well done on finishing the task! You have successfully cracked this incredible puzzle. 
        I'm excited to hear from you again for another thrilling adventure. You can find your scores 
        in the leaderboard section, conveniently located in the navigation bar of the page. 
      </h2>
      <button style={{margin: "20px auto", display: "block", backgroundColor:"blue"}} onClick={wentintohome}>Go into the home</button>
      <button style={{margin: "20px auto", display: "block", backgroundColor:"blue"}} onClick={clickedonrestart}>Restart Game</button>
    </div>
    </div>
  );
}

export default Clue10;

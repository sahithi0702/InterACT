import Userhome from './Userhome.js';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AvailableTests() {
    const navigate = useNavigate();
    const [data,setData]=useState(0)
    useEffect(() => {
        // Fetch user data from backend API
        axios.get('/api/changepage')
          .then(response => {
            setData(response.data);  
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }, []); 
    const OpenPuzzle=()=>{   
        switch(data){
            case 1 :
                navigate('/Clue1');
                break;
            case 2 :
                navigate('/Clue2');
                break;
            case 3 :
                navigate('/Clue3');
                break;
            case 4 :
                navigate('/Clue4');
                break;
            case 5 :
                navigate('/Clue5');
                break;
            case 6 :
                navigate('/Clue6');
                break;
            case 7 :
                navigate('/Clue7');
                break;
            case 8 :
                navigate('/Clue8');
                break;
            case 9 :
                navigate('/Clue9');
                break;
            case 10 :
                navigate('/Clue10');
                break;
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
            navigate('/Clue1');
          } 
        }catch (error) {
          alert('Error occurred during Login');
          console.error('Error occurred during login:', error);
        }
      }
    return (
        <div>
            <Userhome />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="card">
                            <img src="https://learn.g2.com/hubfs/G2CM_FI028_Learn_Article_Images-Hard_Skills_vs._Soft_Skills_Image1_V1a.png" className="card-img-top" alt="Forest Quest" />
                            <div className="card-body">
                                <h5 className="card-title">The Adventure Quest of a Curious Child</h5>
                                <p className="card-text">Join a young child on an adventure filled with puzzles and challenges. From deciphering mirror reflections to solving riddles,
                                 navigating lost directions, the child's curiosity and problem-solving skills are put to the test. Can you take him way back home? Join the child on this thrilling adventure to find out!</p>
                                 <div className='d-flex justify-content-around'>
                                <button className="btn btn-primary" onClick={OpenPuzzle}>Start/Continue Challenge</button>
                                <button className="btn btn-primary" onClick={clickedonrestart}>Restart Challenge</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AvailableTests;

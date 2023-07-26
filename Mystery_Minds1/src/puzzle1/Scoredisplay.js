import {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';


function Scoredisplay(){
    const [data, setData] = useState({});

  useEffect(() => {
    // Fetch user data from backend API
    axios.get('/api/scorestatus')
      .then(response => {
        setData(response.data);  
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

    return(
        <div>
            <div className=''>
            <div className="head d-flex justify-content-between container">
                <div>
                <h3 className="remain1 text-danger ">Chance Remain: {data.chancesremaining}</h3>
                </div>
                
                <div>
                <h3 className="Score1 text-primary">Score:{data.score}</h3>
                </div>
            </div>    
        </div>
        </div>
    )
}
export default Scoredisplay;
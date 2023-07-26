import Userhome from './Userhome.js';
import './Leaderboard.css'
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the leaderboard data from the backend API
        fetch('/api/leaderboard')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Session Timed-Out Login Again...');
                }
                return response.json();
            })
            .then(data => {
                setLeaderboard(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Userhome />
            <h1 className='text-primary'>Leaderboard </h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="leaderboard-table text-dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Chances Remaining</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                
                                <td>{user.chancesremaining}</td>
                                <td>{user.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Leaderboard;

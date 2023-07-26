import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Adminmainpage from './Adminmainpage';
// Register the required chart components
Chart.register(...registerables);

function TestAnalysis() {

  const [data, setData] = useState([]);
  const [barChartInstance, setBarChartInstance] = useState(null); // Add state for bar chart instance
  const [pieChartInstance, setPieChartInstance] = useState(null); // Add state for pie chart instance
  const [lineChartInstance, setLineChartInstance] = useState(null); // Add state for line chart instance

  useEffect(() => {
    // Fetch data from Flask API endpoint
    axios.get('/api/data')
      .then(response => {
        // Group data by age and calculate average score
        const groupedData = response.data.reduce((acc, item) => {
          if (acc[item.age]) {
            acc[item.age].totalScore += item.score;
            acc[item.age].count += 1;
          } else {
            acc[item.age] = { totalScore: item.score, count: 1 };
          }
          return acc;
        }, {});

        // Convert grouped data to an array of objects with age and average score
        const averagedData = Object.entries(groupedData).map(([age, { totalScore, count }]) => ({
          age: parseInt(age),
          score: totalScore / count
        }));

        setData(averagedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Create a bar chart when data is available
    if (data.length > 0) {
      // Destroy previous bar chart instance if exists
      if (barChartInstance) {
        barChartInstance.destroy();
      }

      const barChartCtx = document.getElementById('barChart').getContext('2d');
      const newBarChartInstance = new Chart(barChartCtx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.age),
          datasets: [{
            label: 'Score',
            data: data.map(item => item.score),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setBarChartInstance(newBarChartInstance); // Update bar chart instance state
    }
  }, [data]);

  useEffect(() => {
    // Create a pie chart when data is available
    if (data.length > 0) {
      // Destroy previous pie chart instance if exists
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }

      const pieChartCtx = document.getElementById('pieChart').getContext('2d');
      const newPieChartInstance = new Chart(pieChartCtx, {
        type: 'pie',
        data: {
          labels: data.map(item => item.age),
          datasets: [{
            label: 'Score',
            data: data.map(item => item.score),
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false, // Disable maintaining aspect ratio
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      });

      setPieChartInstance(newPieChartInstance); // Update pie chart instance state
    }
  }, [data]);

  useEffect(() => {
    // Create a line chart when data is available
    if (data.length > 0) {
      // Destroy previous line chart instance if exists
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }

      const lineChartCtx = document.getElementById('lineChart').getContext('2d');
      const newLineChartInstance = new Chart(lineChartCtx, {
        type: 'line',
        data: {
          labels: data.map(item => item.age),
          datasets: [{
            label: 'Score',
            data: data.map(item => item.score),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false, // Disable maintaining aspect ratio
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setLineChartInstance(newLineChartInstance); // Update line chart instance state
    }
  }, [data]);

  return (
    <div>
      <Adminmainpage />
      <div className="container">
        <h1 className='text-primary'>Test Analysis</h1>
        <div className="row m-5">
          <div className="col-md-4">
            <canvas id="barChart"></canvas>
          </div>
          <div className="col-md-4">
            <canvas id="pieChart"></canvas>
          </div>
          <div className="col-md-4">
            <canvas id="lineChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestAnalysis;

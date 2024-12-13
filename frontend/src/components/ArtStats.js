import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ArtStats({ articData, metData }) {
  // Histogram data
  const barData = {
    labels: ['Paintings', 'Sculptures', 'Photographs', 'Drawings', 'Other'],
    datasets: [
      {
        label: 'Art Institute of Chicago',
        data: [65, 45, 30, 25, 15],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Metropolitan Museum',
        data: [70, 40, 35, 20, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  // Pie chart data
  const pieData = {
    labels: ['Modern', 'Classical', 'Renaissance', 'Contemporary', 'Ancient'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="stats-container">
      <div className="chart-section">
        <h3>Artwork Categories Distribution</h3>
        <div style={{ width: '50%', margin: '0 auto' }}>
          <Bar 
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Artwork Categories by Museum'
                }
              }
            }}
          />
        </div>
      </div>

      <div className="chart-section">
        <h3>Art Period Distribution</h3>
        <div style={{ width: '50%', margin: '0 auto' }}>
          <Pie 
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: 'right',
                },
                title: {
                  display: true,
                  text: 'Distribution by Art Period'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ArtStats;

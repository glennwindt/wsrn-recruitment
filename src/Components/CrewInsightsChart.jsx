import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const CrewInsightsChart = ({ history }) => {
  if (!history || history.length === 0) return null;

  const labels = history.map(entry => new Date(entry.timestamp).toLocaleDateString());
  const performanceScores = history.map(entry => entry.performanceScore);
  const riskScores = history.map(entry => entry.riskScore);

  const data = {
    labels,
    datasets: [
      {
        label: 'Performance Score',
        data: performanceScores,
        borderColor: '#4caf50',
        fill: false
      },
      {
        label: 'Risk Score',
        data: riskScores,
        borderColor: '#f44336',
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>Historical Insights</h4>
      <Line data={data} options={options} />
    </div>
  );
};

export default CrewInsightsChart;


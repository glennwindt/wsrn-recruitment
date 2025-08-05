import React from 'react';
import { evaluateCrewMember } from '../ai/CrewInsightsEngine';
import { exportCrewInsightsToPDF } from '../utils/PDFExporter';
import { saveCrewInsights } from '../services/CrewInsightsService';
import CrewInsightsChart from './CrewInsightsChart';

import '../styles/CrewInsights.css';

const CrewInsightsPanel = ({ crew }) => {
  if (!crew) return null;

  const insights = evaluateCrewMember(crew);

  const handleExport = () => {
    exportCrewInsightsToPDF(crew, insights);
  };

  const handleSave = () => {
    saveCrewInsights(crew.crewId, insights);
    alert('Insights saved to backend.');
  };

  return (
    <div className="crew-insights">
      <h3>AI Insights</h3>
      <ul>
        <li><strong>Rehire Potential:</strong> {insights.rehirePotential ? '✅ Likely' : '❌ Unlikely'}</li>
        <li><strong>Performance Flag:</strong> {insights.performanceFlag ? '⚠️ Yes' : '✅ Clear'}</li>
        <li><strong>Risk Score:</strong> {insights.riskScore}/100</li>
        <li><strong>Recommendation:</strong> {insights.recommendation}</li>
      </ul>

      <button onClick={handleExport} style={{ marginRight: '0.5rem' }}>
        Export to PDF
      </button>
      <button onClick={handleSave}>
        Save to Backend
      </button>
    </div>
  );
};

export default CrewInsightsPanel;


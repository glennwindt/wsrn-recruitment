import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportCrewInsightsToPDF(crew, insights) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Crew AI Insights Report', 14, 20);

  doc.setFontSize(12);
  doc.text(`Crew Name: ${crew.name}`, 14, 30);
  doc.text(`Crew ID: ${crew.crewId}`, 14, 36);

  doc.autoTable({
    startY: 45,
    head: [['Metric', 'Value']],
    body: [
      ['Rehire Potential', insights.rehirePotential ? 'Likely' : 'Unlikely'],
      ['Performance Flag', insights.performanceFlag ? 'Yes' : 'Clear'],
      ['Risk Score', `${insights.riskScore}/100`],
      ['Recommendation', insights.recommendation]
    ]
  });

  doc.save(`CrewInsights_${crew.crewId}.pdf`);
}


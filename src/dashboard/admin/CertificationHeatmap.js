import React from "react";

const CertificationHeatmap = ({ certificationData = [] }) => {
  return (
    <div className="certification-heatmap">
      <h2>🔥 Certification Heatmap</h2>
      <p>See which institutions or students are actively progressing toward their certifications.</p>

      <div className="heatmap-grid">
        {certificationData.map((item, index) => (
          <div
            key={index}
            className="heatmap-cell"
            style={{
              backgroundColor: `rgba(34, 193, 195, ${item.completion / 100})`,
            }}
            title={`${item.name}: ${item.completion}% certified`}
          >
            <strong>{item.name}</strong>
            <div>{item.completion}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationHeatmap;


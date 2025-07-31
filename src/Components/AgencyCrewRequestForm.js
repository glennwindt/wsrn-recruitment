// src/components/AgencyCrewRequestForm.js

import React, { useState } from 'react';
import VesselSelector from './VesselSelector';
import { getShippingCompanyByVesselId } from '../services/shippingCompanyService';

export default function AgencyCrewRequestForm() {
  const [selectedVesselId, setSelectedVesselId] = useState('');
  const [company, setCompany] = useState(null);
  const [crewRoles, setCrewRoles] = useState('');
  const [boardingDate, setBoardingDate] = useState('');

  const handleVesselSelect = (vesselId) => {
    setSelectedVesselId(vesselId);
    const data = getShippingCompanyByVesselId(vesselId);
    setCompany(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestPayload = {
      vesselId: selectedVesselId,
      shippingCompany: company,
      roles: crewRoles,
      boardingDate
    };
    console.log('Crew Request:', requestPayload);
    alert('Crew Request Submitted!');
  };

  return (
    <form className="crew-request-form" onSubmit={handleSubmit}>
      <VesselSelector onSelect={handleVesselSelect} />

      {company && (
        <div className="shipping-company-details">
          <h4>{company.name}</h4>
          <p>Country: {company.country}</p>
          <p>Email: {company.contactEmail}</p>
          <p>Phone: {company.contactPhone}</p>
        </div>
      )}

      <label>Requested Crew Roles</label>
      <input
        type="text"
        value={crewRoles}
        onChange={(e) => setCrewRoles(e.target.value)}
        required
      />

      <label>Boarding Date</label>
      <input
        type="date"
        value={boardingDate}
        onChange={(e) => setBoardingDate(e.target.value)}
        required
      />

      <button type="submit">Submit Crew Request</button>
    </form>
  );
}


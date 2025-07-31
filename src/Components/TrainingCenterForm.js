import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TrainingCenterForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    managementContact: '',
    name: '',
    type: 'Cruise',
    location: '',
    status: 'pending',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="form-modal">
      <h3>{initialData ? 'Edit Training Center' : 'Add Training Center'}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name
          <input
            type="text"
            name="companyName"
            placeholder="e.g. Oceanic Enterprises"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Management Contact
          <input
            type="text"
            name="managementContact"
            placeholder="e.g. Director Silva"
            value={formData.managementContact}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Center Name
          <input
            type="text"
            name="name"
            placeholder="e.g. Lisbon Cruise Academy"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location
          <input
            type="text"
            name="location"
            placeholder="e.g. Carcavelos, Lisbon"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Type
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Cruise">Cruise</option>
            <option value="Inland">Inland</option>
            <option value="Offshore">Offshore</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="verified">Verified</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

TrainingCenterForm.propTypes = {
  initialData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

TrainingCenterForm.defaultProps = {
  initialData: null,
};

export default TrainingCenterForm;


import React, { useState, useEffect } from 'react';
import TrainingCenterForm from '../../components/TrainingCenterForm';

const TrainingCenterDashboard = () => {
  const [centers, setCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setCenters([
      {
        id: 1,
        companyName: 'Atlantic SeaSchool Ltd.',
        managementContact: 'Director João Pereira',
        name: 'Lisbon Maritime Academy',
        type: 'Cruise',
        location: 'Portugal',
        status: 'verified'
      },
      {
        id: 2,
        companyName: 'Rhine River School Group',
        managementContact: 'Mrs. Anna Müller, Program Head',
        name: 'Rhine River School',
        type: 'Inland',
        location: 'Germany',
        status: 'pending'
      },
    ]);
  }, []);

  // 🔍 Filters + Search
  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilter = (e) => setFilterType(e.target.value);

  const filteredCenters = centers.filter(center => {
    const matchType = filterType === 'All' || center.type === filterType;
    const matchQuery = center.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchQuery;
  });

  // ✅ Selection Logic
  const isAllSelected = selectedIds.length === filteredCenters.length && filteredCenters.length > 0;

  const handleSelectCenter = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      const allIds = filteredCenters.map(c => c.id);
      setSelectedIds(allIds);
    }
  };

  const handleOutreach = () => {
    const selectedCenters = centers.filter(c => selectedIds.includes(c.id));
    console.log('Preparing outreach to:', selectedCenters);
    // Next: trigger modal or outreach engine
  };

  // 🛠️ Modal Handlers
  const handleAddCenter = () => {
    setSelectedCenter(null);
    setIsModalOpen(true);
  };

  const handleEditCenter = (center) => {
    setSelectedCenter(center);
    setIsModalOpen(true);
  };

  const handleSaveCenter = (data) => {
    if (selectedCenter) {
      setCenters(prev =>
        prev.map(c => (c.id === selectedCenter.id ? { ...data, id: c.id } : c))
      );
    } else {
      const newId = Date.now();
      setCenters(prev => [...prev, { ...data, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleCancelForm = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <h2>Training Center Intelligence</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or keyword..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={filterType} onChange={handleFilter}>
          <option value="All">All Types</option>
          <option value="Cruise">Cruise</option>
          <option value="Inland">Inland</option>
          <option value="Offshore">Offshore</option>
        </select>
        <button onClick={handleAddCenter}>Add Training Center</button>
        {selectedIds.length > 0 && (
          <button onClick={handleOutreach}>
            Send Introduction to {selectedIds.length} Center{selectedIds.length > 1 ? 's' : ''}
          </button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th>Company</th>
            <th>Management</th>
            <th>Center Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCenters.map(center => (
            <tr key={center.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(center.id)}
                  onChange={() => handleSelectCenter(center.id)}
                />
              </td>
              <td>{center.companyName}</td>
              <td>{center.managementContact}</td>
              <td>{center.name}</td>
              <td>{center.type}</td>
              <td>{center.location}</td>
              <td>{center.status}</td>
              <td>
                <button onClick={() => handleEditCenter(center)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <TrainingCenterForm
          initialData={selectedCenter}
          onSave={handleSaveCenter}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default TrainingCenterDashboard;


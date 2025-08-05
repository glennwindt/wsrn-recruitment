import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase'; // adjust path if needed

const CrewHistorySearch = ({ crewList, onSelectCrew, onHistoryLoaded }) => {
  const [query, setQuery] = useState('');

  const filteredCrew = crewList.filter((crew) =>
    crew.fullName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCrew = async (crew) => {
    onSelectCrew(crew);

    try {
      const snapshot = await getDocs(collection(db, `crew/${crew.crewId}/history`));
      const history = snapshot.docs.map(doc => doc.data());
      onHistoryLoaded(history);
    } catch (error) {
      console.error('Error fetching crew history:', error);
      onHistoryLoaded([]); // fallback
    }
  };

  return (
    <div className="crew-search">
      <input
        type="text"
        placeholder="Search crew by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filteredCrew.map((crew) => (
          <li key={crew.crewId} onClick={() => handleSelectCrew(crew)}>
            {crew.fullName} ({crew.crewId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrewHistorySearch;


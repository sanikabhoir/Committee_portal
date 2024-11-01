import React, { useState, useEffect } from 'react';
import { getAll } from '../../services/committee.service';
import CommitteeModal from './CommitteeModal';

function CommitteeList() {
  const [committees, setCommittees] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCommittees();
  }, []);

  const fetchCommittees = async () => {
    try {
      const response = await getAll();
      setCommittees(response.data);
    } catch (err) {
      setError('Failed to fetch committees');
    }
  };

  return (
    <div className="committee-list">
      <h2>Committees</h2>
      {error && <p className="error">{error}</p>}
      <div className="committees-grid">
        {committees.map((committee) => (
          <div 
            key={committee.id} 
            className="committee-card"
            onClick={() => setSelectedCommittee(committee)}
          >
            <h3>{committee.name}</h3>
            <p>{committee.description}</p>
          </div>
        ))}
      </div>
      {selectedCommittee && (
        <CommitteeModal 
          committee={selectedCommittee} 
          onClose={() => setSelectedCommittee(null)}
        />
      )}
    </div>
  );
}

export default CommitteeList;
import React, { useEffect, useState } from 'react';
import './index.css';
import ApiHandler from '../../services/ApiHandler';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    severities: string;
    types: string;
    fromDate: string;
    toDate: string;
  }) => void;
}

type Option = {
  id: number;
  type: string;
};

const SideBar: React.FC<SidebarProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [isSticky, setIsSticky] = useState(false);

  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [severities, setSeverities] = useState<Option[]>([]);
  const [incidentTypes, setIncidentTypes] = useState<Option[]>([]);

  useEffect(() => {
    const fetchSeverities = async () => {
      try {
        const response = await ApiHandler().getSeverities();
        if (response) setSeverities(response);
      } catch (error) {
        console.log('Error fetching severities:', error);
      }
    };

    const fetchDisasterTypes = async () => {
      try {
        const response = await ApiHandler().getIncidentType();
        if (response) setIncidentTypes(response);
      } catch (error) {
        console.log('Error fetching incident types:', error);
      }
    };

    fetchSeverities();
    fetchDisasterTypes();
  }, []);

  const toggleSelection = (
    value: string,
    currentArray: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArray(currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value]);
  };

  const clearFilters = () => {
    setSelectedSeverities([]);
    setSelectedTypes([]);
    setFromDate('');
    setToDate('');
    onApplyFilters({
      severities: '',
      types: '',
      fromDate: '',
      toDate: ''
    });
  };

  const applyFilters = () => {
    onApplyFilters({
      severities: selectedSeverities.join(','),
      types: selectedTypes.join(','),
      fromDate,
      toDate
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 78);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} ${isSticky ? 'sticky' : ''}`}>
      <div className="sidebar-header">
        <h3>Filters</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="sidebar-content">
        <div className="filter-section">
          <h4>Severity</h4>
          {severities.map(sev => (
            <label key={sev.id}>
              <input
                type="checkbox"
                checked={selectedSeverities.includes(sev.type)}
                onChange={() => toggleSelection(sev.type, selectedSeverities, setSelectedSeverities)}
              />
              {sev.type}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4>Incident Type</h4>
          {incidentTypes.map(type => (
            <label key={type.id}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(type.type)}
                onChange={() => toggleSelection(type.type, selectedTypes, setSelectedTypes)}
              />
              {type.type}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4>Date Range</h4>
          <label>
            From: <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </label>
          <label>
            To: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
          </label>
        </div>

        <div className="filter-buttons">
          <button className="apply-btn" onClick={applyFilters}>Apply Filters</button>
          <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import React, { useEffect, useState } from 'react';
import './index.css';
import IncidentMap from '../IncidentMap';
import ApiHandler from '../../services/ApiHandler';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addIncident } from '../../store/incidentSlice';
import { useDispatch } from 'react-redux';

interface Props {
  onClose: () => void;
}

type Severity = {
  id: number;
  type: string;
};

const IncidentFormModal: React.FC<Props> = ({ onClose }) => {
      const dispatch = useDispatch();

  const [severity, setSeverities] = useState<Severity[]>([]);
  const [disaster, setDisasterType] = useState<Severity[]>([]);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [reporterName, setReporterName] = useState('');
  const [incidentTypeId, setIncidentTypeId] = useState('');
  const [severityId, setSeverityId] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

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
        if (response) setDisasterType(response);
      } catch (error) {
        console.log('Error fetching disaster types:', error);
      }
    };

    fetchSeverities();
    fetchDisasterTypes();
  }, []);

  const handleSubmit = async () => {
    if (
      !reporterName ||
      !incidentTypeId ||
      !severityId ||
      !description ||
      !latitude ||
      !longitude
    ) {
      setError(true);
      return;
    }

    setError(false);
    const incidentData = {
      incidentType: incidentTypeId,
      severity: severityId,
      description,
      latitude,
      longitude,
      reporterName,
    };

    try {
      await ApiHandler().submitIncident(incidentData);
      const incidentTypeName = disaster.find(d => d.id.toString() === incidentTypeId)?.type || '';
const severityName = severity.find(s => s.id.toString() === severityId)?.type || '';
const newIncident = {
  ...incidentData,
   incidentType: incidentTypeName, 
  severity: severityName, 
id: Math.floor(Math.random() * 1000000).toString(),  timestamp: new Date().toISOString(),     
};

dispatch(addIncident(newIncident));


    onClose();
  
    } catch (error) {
      console.log('Submission error:', error);
      toast.error('Failed to submit incident');
    }
  };

  return (
    <div className="modal-overlay">
      <ToastContainer />
      <div className="modal-content">
        <h2 className="header">Submit Incident</h2>
        <div className="cross" onClick={onClose}>X</div>

        {error && (
          <div style={{ backgroundColor: 'red', color: 'white', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
            Please fill all the required fields
          </div>
        )}

        <div className="ReporterContainer">
          <label className="labelStyle" htmlFor="reporterName">Reporter Name</label>
          <input
            className="inputStyle"
            id="reporterName"
            type="text"
            placeholder="Enter Reporter Name"
            required
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
          />
        </div>

        <div className="dropDownContainer">
          <select
            className="inputStyle2"
            id="incidentType"
            required
            value={incidentTypeId}
            onChange={(e) => setIncidentTypeId(e.target.value)}
          >
            <option value="">Select incident type</option>
            {disaster.map((item) => (
              <option key={item.id} value={item.id.toString()}>
                {item.type}
              </option>
            ))}
          </select>

          <select
            className="inputStyle2"
            id="severity"
            required
            value={severityId}
            onChange={(e) => setSeverityId(e.target.value)}
          >
            <option value="">Select severity type</option>
            {severity.map((item) => (
              <option key={item.id} value={item.id.toString()}>
                {item.type}
              </option>
            ))}
          </select>
        </div>

        <div className="MapContainer">
          <IncidentMap
            incidents={[]}
            onMapClick={(latlng) => {
              setLongitude(latlng[1]);
              setLatitude(latlng[0]);
            }}
          />
          <div className="MapRightContainer">
            <h4>Click the Map to set Location</h4>
            <div>Latitude - {latitude}</div>
            <div>Longitude - {longitude}</div>
          </div>
        </div>

        <div className="ReporterContainer">
          <label className="labelStyle" htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description about incident..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="buttonContainer">
          <button className="submitButton" type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancelButton" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default IncidentFormModal;

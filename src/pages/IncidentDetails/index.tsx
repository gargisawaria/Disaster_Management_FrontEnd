import { useParams } from 'react-router-dom';
import IncidentMap from '../../components/IncidentMap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './index.css';

const IncidentDetails = () => {
  const { id } = useParams(); // id is rowIndex, passed from Home.tsx
  const incidents = useSelector((state: RootState) => state.incident.incidents);

  const incident = id && incidents[parseInt(id)];

  if (!incident) {
    return <div className="mainContainer">Incident not found</div>;
  }

  return (
    <div className='mainContainer'>
      <div className='leftContainer'>
        <h1>{incident.incidentType}</h1>
        <div className='DetailCard'>
          <h3>Reporter Name: {incident.reporterName}</h3>
          <h3>Severity: {incident.severity}</h3>
          <h3>Latitude: {incident.latitude}</h3>
          <h3>Longitude: {incident.longitude}</h3>
          <h3>Timestamp: {new Date(incident.timestamp).toLocaleString()}</h3>
          <h3>Description: {incident.description}</h3>
        </div>
      </div>

      <IncidentMap incidents={[incident]} mapVar={true} />
    </div>
  );
};

export default IncidentDetails;

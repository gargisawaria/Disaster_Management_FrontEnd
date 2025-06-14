import React,{useState,useEffect} from 'react';
import './index.css';
import IncidentFormModal from '../../components/IncidentFormModal';
import IncidentMap from '../../components/IncidentMap';
import { AgGridReact } from 'ag-grid-react'; 
import { ColDef } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';
import { Filter } from "lucide-react";
import SideBar from '../../components/Sidebar';
import ApiHandler from '../../services/ApiHandler';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setIncidents } from '../../store/incidentSlice';
import { RootState } from '../../store';
import {
 
  themeQuartz,
} from "ag-grid-community";
const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

useEffect(() => {
  const fetchIncidents = async () => {
    try {
      const data = await ApiHandler().getIncidents(); 
      dispatch(setIncidents(data));
    } catch (err) {
      console.error('Error loading incidents', err);
    } finally {
      setLoading(false);  // hide loader whether success or fail
    }
  };

  fetchIncidents();
}, [dispatch]);

   
  const incidents = useSelector((state: RootState) => state.incident.incidents);
  console.log(incidents);
interface CarData {
  incidentType: any;
 severity: any;
  reporterName: any;
  latitude: any;
  longitude:any;
  time:any;
}
const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
const rowData: CarData[] = incidents.map((incident: any) => ({
  incidentType: incident.incidentType,
  severity: incident.severity,
  reporterName: incident.reporterName,
  latitude: incident.latitude,
  longitude: incident.longitude,
  time: incident.timestamp,
}));

const [colDefs] = useState<ColDef[]>([
  { field: 'incidentType', flex: 1, headerClass: 'ag-center-header' ,cellClass: 'ag-start-cell'},
  { field: 'severity', flex: 1, headerClass: 'ag-center-header',cellClass: 'ag-start-cell' },
  { field: 'reporterName', flex: 1, headerClass: 'ag-center-header' ,cellClass: 'ag-start-cell'},
  { field: 'latitude', flex: 1, headerClass: 'ag-center-header',cellClass: 'ag-start-cell' },
  { field: 'longitude', flex: 1, headerClass: 'ag-center-header' ,cellClass: 'ag-start-cell'},
  { field: 'time', flex: 1, headerClass: 'ag-center-header',cellClass: 'ag-start-cell' },
]);
const theme = themeQuartz.withParams({
  backgroundColor: "rgb(235, 240, 255)",              
  foregroundColor: "rgb(30, 30, 110)",                 
  headerTextColor: "rgb(220, 230, 255)",               
  headerBackgroundColor: "rgb(50, 50, 174)",           
  oddRowBackgroundColor: "rgba(50, 50, 174, 0.05)",    
  headerColumnResizeHandleColor: "rgb(80, 80, 200)",   
});
if (loading) {
  return (
    <div className="loader-container">
      <img src="/Flooding-animated.gif" alt="Loading..." 
          style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
    </div>
  );
}
  return (
    <>
    <div 
     className={`home-page ${sidebarOpen ? 'shifted' : ''}`}
    >
     
       <IncidentMap incidents={incidents} />
       <div className='bottomHeader'> 
       <h2>Incident Details</h2>
       <div className="filter-icon"  onClick={() => setSidebarOpen(true)}>
  <Filter size={24} />
</div>

<SideBar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  onApplyFilters={async (filters) => {
 const data = await ApiHandler().getIncidents(filters); // With filters
  dispatch(setIncidents(data));  }}
/>     
       </div>
          <div  className='tableContainer'>
<div
  style={{ width: '100%', height: '500px' }}
  className="ag-theme-quartz"
>        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          theme={theme}
           onRowClicked={(event) => {
    const incidentId = event.rowIndex;
 navigate(`/incident/${incidentId}`);
  }}
        />
      </div>
    </div>
     <div className="Add-icon" onClick={() => setShowModal(true)}>+</div>
    </div>
    {showModal && <IncidentFormModal onClose={() => setShowModal(false)} />}
       
</>
  );
};

export default Home;

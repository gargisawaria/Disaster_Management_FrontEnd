// store/incidentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Incident {
  id: string;
  incidentType: string;
  severity: string;
  description: string;
  latitude: number;
  longitude: number;
  reporterName: string;
  timestamp: string;
}

interface IncidentState {
  incidents: Incident[];
}

const initialState: IncidentState = {
  incidents: [],
};

const incidentSlice = createSlice({
  name: 'incident',
  initialState,
  reducers: {
    setIncidents: (state:any, action: PayloadAction<Incident[]>) => {
      state.incidents = action.payload;
    },
    addIncident: (state:any, action: PayloadAction<Incident>) => {
      state.incidents.push(action.payload);
    },
  },
});


export const { setIncidents, addIncident } = incidentSlice.actions;
export default incidentSlice.reducer;

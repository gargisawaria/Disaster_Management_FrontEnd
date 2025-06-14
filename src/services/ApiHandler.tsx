import axios from 'axios';

const ApiHandler = () => {
  const baseUrl = 'http://localhost:3000';

  const getSeverities = async () => {
    try {
      const response = await axios.get(`${baseUrl}/severities`);
      return response.data;
    } catch (error) {
      console.error('Error fetching severities:', error);
      throw error;
    }
  };

    const getIncidentType = async () => {
    try {
      const response = await axios.get(`${baseUrl}/disastertypes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching disastertypes:', error);
      throw error;
    }
  };
//       const getIncidents = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/incidents`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching incidents:', error);
//       throw error;
//     }
//   };
type IncidentFilters = {
  severities?: string;
  types?: string;
  fromDate?: string;
  toDate?: string;
};
 const getIncidents = async (filters: IncidentFilters = {}) => {
  try {
    const response = await axios.get(`${baseUrl}/incidents`, {
      params: {
        severities: filters.severities,
        incidentTypes: filters.types,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching incidents:', error);
    throw new Error('Failed to fetch incidents');
  }
};

      const submitIncident = async (incidentData:any) => {
    try {
    const response = await axios.post(`${baseUrl}/incidents`, incidentData);
          return response.data;
    } catch (error) {
      console.error('Error fetching disastertypes:', error);
      throw error;
    }
  };
  return {
    getSeverities,
    getIncidentType,
    submitIncident,
    getIncidents
  };
};

export default ApiHandler;

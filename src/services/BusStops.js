import axios from 'axios';

const API_URL = "http://localhost:3000/";


const BusStopService = {
    getBusStopCount: () => {
      return axios
        .get(`${API_URL}api/paxed/blue/busstops/count`)
        .then(response => response.data)
        .catch(error => {
          console.error('Error fetching blue bus stop count:', error);
          throw error;
        });
    }
  };
  
  export default BusStopService;
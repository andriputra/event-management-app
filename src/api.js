import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(config => {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  if (token) {
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});

// Update fetchEvents to accept optional parameters
export const fetchEvents = (category = '', date = '') => {
  // Create a params object
  const params = {};
  if (category && category !== 'All') {
    params.category = category;
  }
  if (date) {
    params.date = date;
  }
  
  // Pass the params object to axios
  return api.get('/events', { params });
};

// Function to create a new event
export const createEvent = (event) => api.post('/events', event);

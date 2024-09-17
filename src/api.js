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

export const fetchEvents = () => api.get('/events');
export const createEvent = (event) => api.post('/events', event);

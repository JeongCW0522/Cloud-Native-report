import axios from 'axios';

export const axiosUserInstance = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosLinkInstance = axios.create({
  baseURL: '/api/links',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

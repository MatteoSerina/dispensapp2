import axios from 'axios';

const baseUrl = 'localhost:3100/api/';

const apiClient = axios.create({
    baseURL: baseUrl,
  });

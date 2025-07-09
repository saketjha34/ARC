
import axios from 'axios';
import { TimeDelayRequest, TimeDelayResponse } from '@/types/timeDelay';
import { ActualCostRequest, ActualCostResponse } from '@/types/actualCost';

// Get API URL from localStorage or use the working API URL
const getApiBaseUrl = () => {
  const storedUrl = localStorage.getItem('api_base_url');
  return storedUrl || 'https://arc-ho5f.onrender.com/';
};

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response received successfully');
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const predictTimeDelay = async (data: TimeDelayRequest): Promise<TimeDelayResponse> => {
  try {
    console.log('Sending request:', data);
    const response = await apiClient.post<TimeDelayResponse>('/predict_time_delay', data);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Time delay prediction error:', error);
    throw new Error('Failed to predict time delay. Please check your inputs and try again.');
  }
};

export const predictActualCost = async (data: ActualCostRequest): Promise<ActualCostResponse> => {
  try {
    console.log('Sending request:', data);
    const response = await apiClient.post<ActualCostResponse>('/predict_actual_cost', data);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Actual cost prediction error:', error);
    throw new Error('Failed to predict actual cost. Please check your inputs and try again.');
  }
};

// Helper function to update API URL
export const updateApiUrl = (url: string) => {
  localStorage.setItem('api_base_url', url);
  window.location.reload(); // Reload to use new URL
};

export default apiClient;
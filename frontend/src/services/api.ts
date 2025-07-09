import axios from 'axios';
import type { TimeDelayPredictionInput, ActualCostPredictionInput, TimeDelayResponse, ActualCostResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const apiService = {
  async healthCheck() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  async predictTimeDelay(data: TimeDelayPredictionInput): Promise<TimeDelayResponse> {
    try {
      const response = await api.post('/predict_time_delay', data);
      return response.data;
    } catch (error) {
      console.error('Time delay prediction failed:', error);
      throw error;
    }
  },

  async predictActualCost(data: ActualCostPredictionInput): Promise<ActualCostResponse> {
    try {
      const response = await api.post('/predict_actual_cost', data);
      return response.data;
    } catch (error) {
      console.error('Cost prediction failed:', error);
      throw error;
    }
  },
};
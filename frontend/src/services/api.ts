import axios from 'axios';
import type { TimeDelayPredictionInput, ActualCostPredictionInput, TimeDelayResponse, ActualCostResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  async healthCheck() {
    const response = await api.get('/');
    return response.data;
  },

  async predictTimeDelay(data: TimeDelayPredictionInput): Promise<TimeDelayResponse> {
    const response = await api.post('/predict_time_delay', data);
    return response.data;
  },

  async predictActualCost(data: ActualCostPredictionInput): Promise<ActualCostResponse> {
    const response = await api.post('/predict_actual_cost', data);
    return response.data;
  },
};
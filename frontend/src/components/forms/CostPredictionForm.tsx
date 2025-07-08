import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrencyDollarIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Alert } from '../ui/Alert';
import { apiService } from '../../services/api';
import { ActualCostPredictionInput, ActualCostResponse } from '../../types/api';

interface FormData {
  Project_Type: string;
  Planned_Cost: number;
  Planned_Duration: number;
  Load_Bearing_Capacity: number;
  Temperature: number;
  Humidity: number;
  Weather_Condition: string;
  Air_Quality_Index: number;
  Energy_Consumption: number;
  Material_Usage: number;
  Labor_Hours: number;
  Accident_Count: number;
}

const projectTypes = ['Tunnel', 'Dam', 'Building', 'Road', 'Bridge'];
const weatherConditions = ['Snowy', 'Cloudy', 'Sunny', 'Rainy', 'Stormy'];

export const CostPredictionForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ActualCostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      Project_Type: 'Tunnel',
      Planned_Cost: 12260784,
      Planned_Duration: 699,
      Load_Bearing_Capacity: 471.2,
      Temperature: 18.54,
      Humidity: 49.88,
      Weather_Condition: 'Snowy',
      Air_Quality_Index: 210,
      Energy_Consumption: 25202.99,
      Material_Usage: 244.84,
      Labor_Hours: 6602,
      Accident_Count: 8,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload: ActualCostPredictionInput = {
        Project_Type: [data.Project_Type],
        Planned_Cost: [data.Planned_Cost],
        Planned_Duration: [data.Planned_Duration],
        Load_Bearing_Capacity: [data.Load_Bearing_Capacity],
        Temperature: [data.Temperature],
        Humidity: [data.Humidity],
        Weather_Condition: [data.Weather_Condition],
        Air_Quality_Index: [data.Air_Quality_Index],
        Energy_Consumption: [data.Energy_Consumption],
        Material_Usage: [data.Material_Usage],
        Labor_Hours: [data.Labor_Hours],
        Accident_Count: [data.Accident_Count],
      };

      const response = await apiService.predictActualCost(payload);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to predict actual cost');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setError(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-construction-100 rounded-lg">
          <CurrencyDollarIcon className="w-6 h-6 text-construction-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Cost Prediction</h2>
          <p className="text-sm text-gray-600">Estimate actual construction project costs</p>
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} onClose={() => setError(null)} />
        </div>
      )}

      {result && (
        <div className="mb-6 p-4 bg-construction-50 border border-construction-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <BuildingOffice2Icon className="w-5 h-5 text-construction-600" />
            <span className="font-medium text-construction-800">Prediction Result</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-construction-900">
            {formatCurrency(result["Predicted Actual Cost of Project (USD)"][0])}
          </p>
          <p className="text-sm text-construction-700">Estimated actual project cost</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Type
            </label>
            <select
              {...register('Project_Type', { required: 'Project type is required' })}
              className="input-field"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.Project_Type && (
              <p className="mt-1 text-sm text-red-600">{errors.Project_Type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Planned Cost (USD)
            </label>
            <input
              type="number"
              {...register('Planned_Cost', { 
                required: 'Planned cost is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.Planned_Cost && (
              <p className="mt-1 text-sm text-red-600">{errors.Planned_Cost.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Planned Duration (days)
            </label>
            <input
              type="number"
              {...register('Planned_Duration', { 
                required: 'Planned duration is required',
                min: { value: 1, message: 'Must be at least 1 day' }
              })}
              className="input-field"
            />
            {errors.Planned_Duration && (
              <p className="mt-1 text-sm text-red-600">{errors.Planned_Duration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Load Bearing Capacity (tons)
            </label>
            <input
              type="number"
              step="any"
              {...register('Load_Bearing_Capacity', { 
                required: 'Load bearing capacity is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.Load_Bearing_Capacity && (
              <p className="mt-1 text-sm text-red-600">{errors.Load_Bearing_Capacity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature (°C)
            </label>
            <input
              type="number"
              step="any"
              {...register('Temperature', { required: 'Temperature is required' })}
              className="input-field"
            />
            {errors.Temperature && (
              <p className="mt-1 text-sm text-red-600">{errors.Temperature.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Humidity (%)
            </label>
            <input
              type="number"
              step="any"
              {...register('Humidity', { 
                required: 'Humidity is required',
                min: { value: 0, message: 'Must be between 0 and 100' },
                max: { value: 100, message: 'Must be between 0 and 100' }
              })}
              className="input-field"
            />
            {errors.Humidity && (
              <p className="mt-1 text-sm text-red-600">{errors.Humidity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weather Condition
            </label>
            <select
              {...register('Weather_Condition', { required: 'Weather condition is required' })}
              className="input-field"
            >
              {weatherConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            {errors.Weather_Condition && (
              <p className="mt-1 text-sm text-red-600">{errors.Weather_Condition.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Air Quality Index
            </label>
            <input
              type="number"
              {...register('Air_Quality_Index', { 
                required: 'Air Quality Index is required',
                min: { value: 0, message: 'Must be positive' },
                max: { value: 500, message: 'AQI typically ranges from 0 to 500' }
              })}
              className="input-field"
            />
            {errors.Air_Quality_Index && (
              <p className="mt-1 text-sm text-red-600">{errors.Air_Quality_Index.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Energy Consumption (kWh)
            </label>
            <input
              type="number"
              step="any"
              {...register('Energy_Consumption', { 
                required: 'Energy consumption is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.Energy_Consumption && (
              <p className="mt-1 text-sm text-red-600">{errors.Energy_Consumption.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material Usage (metric tons)
            </label>
            <input
              type="number"
              step="any"
              {...register('Material_Usage', { 
                required: 'Material usage is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.Material_Usage && (
              <p className="mt-1 text-sm text-red-600">{errors.Material_Usage.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Labor Hours
            </label>
            <input
              type="number"
              {...register('Labor_Hours', { 
                required: 'Labor hours is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.Labor_Hours && (
              <p className="mt-1 text-sm text-red-600">{errors.Labor_Hours.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accident Count
            </label>
            <input
              type="number"
              {...register('Accident_Count', { 
                required: 'Accident count is required',
                min: { value: 0, message: 'Must be non-negative' }
              })}
              className="input-field"
            />
            {errors.Accident_Count && (
              <p className="mt-1 text-sm text-red-600">{errors.Accident_Count.message}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Predicting...</span>
              </>
            ) : (
              <>
                <CurrencyDollarIcon className="w-4 h-4" />
                <span>Predict Cost</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};
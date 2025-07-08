import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClockIcon, TruckIcon } from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Alert } from '../ui/Alert';
import { apiService } from '../../services/api';
import type { TimeDelayPredictionInput, TimeDelayResponse } from '../../types/api';

interface FormData {
  timestamp: string;
  vehicle_gps_latitude: number;
  vehicle_gps_longitude: number;
  fuel_consumption_rate: number;
  eta_variation_hours: number;
  traffic_congestion_level: number;
  warehouse_inventory_level: number;
  loading_unloading_time: number;
  handling_equipment_availability: number;
  order_fulfillment_status: number;
  weather_condition_severity: number;
  port_congestion_level: number;
  shipping_costs: number;
  supplier_reliability_score: number;
  lead_time_days: number;
  historical_demand: number;
  iot_temperature: number;
  cargo_condition_status: number;
  route_risk_level: number;
  customs_clearance_time: number;
  driver_behavior_score: number;
  fatigue_monitoring_score: number;
}

export const TimeDelayForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TimeDelayResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      timestamp: new Date().toISOString().slice(0, 16),
      vehicle_gps_latitude: 40.375568,
      vehicle_gps_longitude: 77.014318,
      fuel_consumption_rate: 5.136512,
      eta_variation_hours: 4.998009,
      traffic_congestion_level: 5.927586,
      warehouse_inventory_level: 985.716862,
      loading_unloading_time: 4.951392,
      handling_equipment_availability: 0.481294,
      order_fulfillment_status: 0.761166,
      weather_condition_severity: 0.359066,
      port_congestion_level: 0.289160,
      shipping_costs: 10.503853,
      supplier_reliability_score: 0.986064,
      lead_time_days: 2.128009,
      historical_demand: 100.772854,
      iot_temperature: 18.3,
      cargo_condition_status: 0.777263,
      route_risk_level: 1.182116,
      customs_clearance_time: 0.502006,
      driver_behavior_score: 0.033843,
      fatigue_monitoring_score: 0.978599,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload: TimeDelayPredictionInput = {
        timestamp: [data.timestamp],
        vehicle_gps_latitude: [data.vehicle_gps_latitude],
        vehicle_gps_longitude: [data.vehicle_gps_longitude],
        fuel_consumption_rate: [data.fuel_consumption_rate],
        eta_variation_hours: [data.eta_variation_hours],
        traffic_congestion_level: [data.traffic_congestion_level],
        warehouse_inventory_level: [data.warehouse_inventory_level],
        loading_unloading_time: [data.loading_unloading_time],
        handling_equipment_availability: [data.handling_equipment_availability],
        order_fulfillment_status: [data.order_fulfillment_status],
        weather_condition_severity: [data.weather_condition_severity],
        port_congestion_level: [data.port_congestion_level],
        shipping_costs: [data.shipping_costs],
        supplier_reliability_score: [data.supplier_reliability_score],
        lead_time_days: [data.lead_time_days],
        historical_demand: [data.historical_demand],
        iot_temperature: [data.iot_temperature],
        cargo_condition_status: [data.cargo_condition_status],
        route_risk_level: [data.route_risk_level],
        customs_clearance_time: [data.customs_clearance_time],
        driver_behavior_score: [data.driver_behavior_score],
        fatigue_monitoring_score: [data.fatigue_monitoring_score],
      };

      const response = await apiService.predictTimeDelay(payload);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to predict time delay');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setError(null);
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          <ClockIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Time Delay Prediction</h2>
          <p className="text-sm text-gray-600">Predict transportation delays using logistics data</p>
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} onClose={() => setError(null)} />
        </div>
      )}

      {result && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <TruckIcon className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Prediction Result</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-green-900">
            {result["Time Delay (In Hours)"][0].toFixed(2)} hours
          </p>
          <p className="text-sm text-green-700">Expected delay for this shipment</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timestamp
            </label>
            <input
              type="datetime-local"
              {...register('timestamp', { required: 'Timestamp is required' })}
              className="input-field"
            />
            {errors.timestamp && (
              <p className="mt-1 text-sm text-red-600">{errors.timestamp.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Latitude
            </label>
            <input
              type="number"
              step="any"
              {...register('vehicle_gps_latitude', { 
                required: 'Latitude is required',
                min: { value: -90, message: 'Latitude must be between -90 and 90' },
                max: { value: 90, message: 'Latitude must be between -90 and 90' }
              })}
              className="input-field"
            />
            {errors.vehicle_gps_latitude && (
              <p className="mt-1 text-sm text-red-600">{errors.vehicle_gps_latitude.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Longitude
            </label>
            <input
              type="number"
              step="any"
              {...register('vehicle_gps_longitude', { 
                required: 'Longitude is required',
                min: { value: -180, message: 'Longitude must be between -180 and 180' },
                max: { value: 180, message: 'Longitude must be between -180 and 180' }
              })}
              className="input-field"
            />
            {errors.vehicle_gps_longitude && (
              <p className="mt-1 text-sm text-red-600">{errors.vehicle_gps_longitude.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Consumption Rate (L/h)
            </label>
            <input
              type="number"
              step="any"
              {...register('fuel_consumption_rate', { 
                required: 'Fuel consumption rate is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.fuel_consumption_rate && (
              <p className="mt-1 text-sm text-red-600">{errors.fuel_consumption_rate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ETA Variation (hours)
            </label>
            <input
              type="number"
              step="any"
              {...register('eta_variation_hours', { required: 'ETA variation is required' })}
              className="input-field"
            />
            {errors.eta_variation_hours && (
              <p className="mt-1 text-sm text-red-600">{errors.eta_variation_hours.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Traffic Congestion Level (0-10)
            </label>
            <input
              type="number"
              step="any"
              {...register('traffic_congestion_level', { 
                required: 'Traffic congestion level is required',
                min: { value: 0, message: 'Must be between 0 and 10' },
                max: { value: 10, message: 'Must be between 0 and 10' }
              })}
              className="input-field"
            />
            {errors.traffic_congestion_level && (
              <p className="mt-1 text-sm text-red-600">{errors.traffic_congestion_level.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Warehouse Inventory Level
            </label>
            <input
              type="number"
              step="any"
              {...register('warehouse_inventory_level', { 
                required: 'Warehouse inventory level is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.warehouse_inventory_level && (
              <p className="mt-1 text-sm text-red-600">{errors.warehouse_inventory_level.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loading/Unloading Time (hours)
            </label>
            <input
              type="number"
              step="any"
              {...register('loading_unloading_time', { 
                required: 'Loading/unloading time is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.loading_unloading_time && (
              <p className="mt-1 text-sm text-red-600">{errors.loading_unloading_time.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipment Availability (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('handling_equipment_availability', { 
                required: 'Equipment availability is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.handling_equipment_availability && (
              <p className="mt-1 text-sm text-red-600">{errors.handling_equipment_availability.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Fulfillment Status (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('order_fulfillment_status', { 
                required: 'Order fulfillment status is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.order_fulfillment_status && (
              <p className="mt-1 text-sm text-red-600">{errors.order_fulfillment_status.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weather Severity (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('weather_condition_severity', { 
                required: 'Weather condition severity is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.weather_condition_severity && (
              <p className="mt-1 text-sm text-red-600">{errors.weather_condition_severity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Port Congestion Level (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('port_congestion_level', { 
                required: 'Port congestion level is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.port_congestion_level && (
              <p className="mt-1 text-sm text-red-600">{errors.port_congestion_level.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Costs (USD)
            </label>
            <input
              type="number"
              step="any"
              {...register('shipping_costs', { 
                required: 'Shipping costs is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.shipping_costs && (
              <p className="mt-1 text-sm text-red-600">{errors.shipping_costs.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Reliability (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('supplier_reliability_score', { 
                required: 'Supplier reliability score is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.supplier_reliability_score && (
              <p className="mt-1 text-sm text-red-600">{errors.supplier_reliability_score.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead Time (days)
            </label>
            <input
              type="number"
              step="any"
              {...register('lead_time_days', { 
                required: 'Lead time is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.lead_time_days && (
              <p className="mt-1 text-sm text-red-600">{errors.lead_time_days.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Historical Demand
            </label>
            <input
              type="number"
              step="any"
              {...register('historical_demand', { 
                required: 'Historical demand is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.historical_demand && (
              <p className="mt-1 text-sm text-red-600">{errors.historical_demand.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IoT Temperature (°C)
            </label>
            <input
              type="number"
              step="any"
              {...register('iot_temperature', { required: 'IoT temperature is required' })}
              className="input-field"
            />
            {errors.iot_temperature && (
              <p className="mt-1 text-sm text-red-600">{errors.iot_temperature.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo Condition Status (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('cargo_condition_status', { 
                required: 'Cargo condition status is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.cargo_condition_status && (
              <p className="mt-1 text-sm text-red-600">{errors.cargo_condition_status.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Route Risk Level (0-10)
            </label>
            <input
              type="number"
              step="any"
              {...register('route_risk_level', { 
                required: 'Route risk level is required',
                min: { value: 0, message: 'Must be between 0 and 10' },
                max: { value: 10, message: 'Must be between 0 and 10' }
              })}
              className="input-field"
            />
            {errors.route_risk_level && (
              <p className="mt-1 text-sm text-red-600">{errors.route_risk_level.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customs Clearance Time (hours)
            </label>
            <input
              type="number"
              step="any"
              {...register('customs_clearance_time', { 
                required: 'Customs clearance time is required',
                min: { value: 0, message: 'Must be positive' }
              })}
              className="input-field"
            />
            {errors.customs_clearance_time && (
              <p className="mt-1 text-sm text-red-600">{errors.customs_clearance_time.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Driver Behavior Score (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('driver_behavior_score', { 
                required: 'Driver behavior score is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.driver_behavior_score && (
              <p className="mt-1 text-sm text-red-600">{errors.driver_behavior_score.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fatigue Monitoring Score (0-1)
            </label>
            <input
              type="number"
              step="any"
              {...register('fatigue_monitoring_score', { 
                required: 'Fatigue monitoring score is required',
                min: { value: 0, message: 'Must be between 0 and 1' },
                max: { value: 1, message: 'Must be between 0 and 1' }
              })}
              className="input-field"
            />
            {errors.fatigue_monitoring_score && (
              <p className="mt-1 text-sm text-red-600">{errors.fatigue_monitoring_score.message}</p>
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
                <ClockIcon className="w-4 h-4" />
                <span>Predict Delay</span>
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
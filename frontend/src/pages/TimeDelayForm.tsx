
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputField } from '@/components/InputField';
import { ResultCard } from '@/components/ResultCard';
import { predictTimeDelay } from '@/lib/api/client';
import { TimeDelayFormData, TimeDelayRequest } from '@/types/timeDelay';
import { Clock, Truck } from 'lucide-react';

export const TimeDelayForm: React.FC = () => {
  const defaultValues: TimeDelayFormData = {
    timestamp: new Date().toISOString().slice(0, 16),
    vehicle_gps_latitude: 40.7128,
    vehicle_gps_longitude: -74.0060,
    fuel_consumption_rate: 8.5,
    eta_variation_hours: 2.0,
    traffic_congestion_level: 5.0,
    warehouse_inventory_level: 75.0,
    loading_unloading_time: 1.5,
    handling_equipment_availability: 0.8,
    order_fulfillment_status: 0.9,
    weather_condition_severity: 3.0,
    port_congestion_level: 4.0,
    shipping_costs: 2500.0,
    supplier_reliability_score: 8.0,
    lead_time_days: 7.0,
    historical_demand: 1000.0,
    iot_temperature: 22.0,
    cargo_condition_status: 0.95,
    route_risk_level: 3.0,
    customs_clearance_time: 4.0,
    driver_behavior_score: 7.5,
    fatigue_monitoring_score: 8.0,
  };

  const [formData, setFormData] = useState<TimeDelayFormData>(defaultValues);

  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleClearForm = () => {
    setFormData(defaultValues);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Convert form data to API request format (arrays with single values)
      const requestData: TimeDelayRequest = Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key as keyof TimeDelayRequest] = [value] as any;
        return acc;
      }, {} as TimeDelayRequest);

      console.log('Sending request:', requestData);
      const response = await predictTimeDelay(requestData);
      setResult(response["Time Delay (In Hours)"][0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Time Delay Prediction</h1>
          </div>
          <p className="text-gray-600">Predict shipping delays using advanced ML algorithms</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputField
                      label="Timestamp"
                      name="timestamp"
                      type="datetime-local"
                      value={formData.timestamp}
                      onChange={handleInputChange}
                      required
                    />
                    <InputField
                      label="Vehicle GPS Latitude"
                      name="vehicle_gps_latitude"
                      type="number"
                      value={formData.vehicle_gps_latitude}
                      onChange={handleInputChange}
                      step="0.000001"
                      placeholder="e.g., 40.7128"
                      required
                    />
                    <InputField
                      label="Vehicle GPS Longitude"
                      name="vehicle_gps_longitude"
                      type="number"
                      value={formData.vehicle_gps_longitude}
                      onChange={handleInputChange}
                      step="0.000001"
                      placeholder="e.g., -74.0060"
                      required
                    />
                    <InputField
                      label="Fuel Consumption Rate"
                      name="fuel_consumption_rate"
                      type="number"
                      value={formData.fuel_consumption_rate}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="L/km"
                      required
                    />
                    <InputField
                      label="ETA Variation (Hours)"
                      name="eta_variation_hours"
                      type="number"
                      value={formData.eta_variation_hours}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                    />
                    <InputField
                      label="Traffic Congestion Level"
                      name="traffic_congestion_level"
                      type="number"
                      value={formData.traffic_congestion_level}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="0-10 scale"
                      required
                    />
                    <InputField
                      label="Warehouse Inventory Level"
                      name="warehouse_inventory_level"
                      type="number"
                      value={formData.warehouse_inventory_level}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                    />
                    <InputField
                      label="Loading/Unloading Time"
                      name="loading_unloading_time"
                      type="number"
                      value={formData.loading_unloading_time}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="Hours"
                      required
                    />
                    <InputField
                      label="Equipment Availability"
                      name="handling_equipment_availability"
                      type="number"
                      value={formData.handling_equipment_availability}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="0-1 scale"
                      required
                    />
                    <InputField
                      label="Order Fulfillment Status"
                      name="order_fulfillment_status"
                      type="number"
                      value={formData.order_fulfillment_status}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                    />
                    <InputField
                      label="Weather Severity"
                      name="weather_condition_severity"
                      type="number"
                      value={formData.weather_condition_severity}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="0-10 scale"
                      required
                    />
                    <InputField
                      label="Port Congestion Level"
                      name="port_congestion_level"
                      type="number"
                      value={formData.port_congestion_level}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                    />
                    <InputField
                      label="Shipping Costs"
                      name="shipping_costs"
                      type="number"
                      value={formData.shipping_costs}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="USD"
                      required
                    />
                    <InputField
                      label="Supplier Reliability Score"
                      name="supplier_reliability_score"
                      type="number"
                      value={formData.supplier_reliability_score}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="0-10 scale"
                      required
                    />
                    <InputField
                      label="Lead Time (Days)"
                      name="lead_time_days"
                      type="number"
                      value={formData.lead_time_days}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                    />
                    <InputField
                      label="Historical Demand"
                      name="historical_demand"
                      type="number"
                      value={formData.historical_demand}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                    />
                    <InputField
                      label="IoT Temperature"
                      name="iot_temperature"
                      type="number"
                      value={formData.iot_temperature}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="°C"
                      required
                    />
                    <InputField
                      label="Cargo Condition Status"
                      name="cargo_condition_status"
                      type="number"
                      value={formData.cargo_condition_status}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                    />
                    <InputField
                      label="Route Risk Level"
                      name="route_risk_level"
                      type="number"
                      value={formData.route_risk_level}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="0-10 scale"
                      required
                    />
                    <InputField
                      label="Customs Clearance Time"
                      name="customs_clearance_time"
                      type="number"
                      value={formData.customs_clearance_time}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="Hours"
                      required
                    />
                    <InputField
                      label="Driver Behavior Score"
                      name="driver_behavior_score"
                      type="number"
                      value={formData.driver_behavior_score}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="0-10 scale"
                      required
                    />
                    <InputField
                      label="Fatigue Monitoring Score"
                      name="fatigue_monitoring_score"
                      type="number"
                      value={formData.fatigue_monitoring_score}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="0-10 scale"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? 'Predicting...' : 'Predict Time Delay'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleClearForm}
                      disabled={isLoading}
                      className="px-8"
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <ResultCard
              title="Predicted Time Delay"
              result={result}
              unit="hours"
              isLoading={isLoading}
              error={error}
              className="sticky top-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export interface TimeDelayPredictionInput {
  timestamp: string[];
  vehicle_gps_latitude: number[];
  vehicle_gps_longitude: number[];
  fuel_consumption_rate: number[];
  eta_variation_hours: number[];
  traffic_congestion_level: number[];
  warehouse_inventory_level: number[];
  loading_unloading_time: number[];
  handling_equipment_availability: number[];
  order_fulfillment_status: number[];
  weather_condition_severity: number[];
  port_congestion_level: number[];
  shipping_costs: number[];
  supplier_reliability_score: number[];
  lead_time_days: number[];
  historical_demand: number[];
  iot_temperature: number[];
  cargo_condition_status: number[];
  route_risk_level: number[];
  customs_clearance_time: number[];
  driver_behavior_score: number[];
  fatigue_monitoring_score: number[];
}

export interface ActualCostPredictionInput {
  Project_Type: string[];
  Planned_Cost: number[];
  Planned_Duration: number[];
  Load_Bearing_Capacity: number[];
  Temperature: number[];
  Humidity: number[];
  Weather_Condition: string[];
  Air_Quality_Index: number[];
  Energy_Consumption: number[];
  Material_Usage: number[];
  Labor_Hours: number[];
  Accident_Count: number[];
}

export interface TimeDelayResponse {
  "Time Delay (In Hours)": number[];
}

export interface ActualCostResponse {
  "Predicted Actual Cost of Project (USD)": number[];
}

export interface ApiError {
  detail: string;
}
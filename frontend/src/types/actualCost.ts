
export interface ActualCostRequest {
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

export interface ActualCostResponse {
  "Predicted Actual Cost of Project (USD)": number[];
}

export interface ActualCostFormData {
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

export const PROJECT_TYPES = ["Tunnel", "Dam", "Building", "Road", "Bridge"] as const;
export const WEATHER_CONDITIONS = ["Snowy", "Cloudy", "Sunny", "Rainy", "Stormy"] as const;

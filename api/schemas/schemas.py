from datetime import datetime
from pydantic import BaseModel, Field
from typing import List


# =============================== #
# 🚀 Request Body Models (Pydantic)
# =============================== #
class TimeDelayPredictionInput(BaseModel):
    timestamp: List[datetime] = Field(["2021-01-01 00:00:00"], description="List of timestamps in ISO 8601 format (e.g., 2021-01-01 00:00:00)")
    vehicle_gps_latitude: List[float] = Field([40.375568], description="Latitude of vehicle's GPS location")
    vehicle_gps_longitude: List[float] = Field([77.014318], description="Longitude of vehicle's GPS location")
    fuel_consumption_rate: List[float] = Field([5.136512], description="Fuel consumption rate in liters per hour")
    eta_variation_hours: List[float] = Field([4.998009], description="Estimated time of arrival (ETA) variation in hours")
    traffic_congestion_level: List[float] = Field([5.927586], description="Traffic congestion level (scale: 0-10)")
    warehouse_inventory_level: List[float] = Field([985.716862], description="Current warehouse inventory level in units")
    loading_unloading_time: List[float] = Field([4.951392], description="Time taken for loading/unloading in hours")
    handling_equipment_availability: List[float] = Field([0.481294], description="Availability of handling equipment (0-1)")
    order_fulfillment_status: List[float] = Field([0.761166], description="Order fulfillment status (0-1)")
    weather_condition_severity: List[float] = Field([0.359066], description="Weather condition severity (scale: 0-1)")
    port_congestion_level: List[float] = Field([0.289160], description="Port congestion level (scale: 0-1)")
    shipping_costs: List[float] = Field([10.503853], description="Shipping costs in USD")
    supplier_reliability_score: List[float] = Field([0.986064], description="Supplier reliability score (scale: 0-1)")
    lead_time_days: List[float] = Field([2.128009], description="Lead time in days")
    historical_demand: List[float] = Field([100.772854], description="Historical demand volume")
    iot_temperature: List[float] = Field([18.3], description="IoT temperature sensor reading in °C")
    cargo_condition_status: List[float] = Field([0.777263], description="Cargo condition status (scale: 0-1)")
    route_risk_level: List[float] = Field([1.182116], description="Route risk level (scale: 0-10)")
    customs_clearance_time: List[float] = Field([0.502006], description="Time for customs clearance in hours")
    driver_behavior_score: List[float] = Field([0.033843], description="Driver behavior score (scale: 0-1)")
    fatigue_monitoring_score: List[float] = Field([0.978599], description="Fatigue monitoring score (scale: 0-1)")


class ActualCostPredictionInput(BaseModel):
    Project_Type: List[str] = Field(["Tunnel"], description="Type of construction project (e.g., 'Tunnel', 'Dam', 'Building', 'Road', 'Bridge')")
    Planned_Cost: List[float] = Field([12260784], description="Planned project cost in USD")
    Planned_Duration: List[int] = Field([699], description="Planned project duration in days")
    Load_Bearing_Capacity: List[float] = Field([471.2], description="Load-bearing capacity in tons")
    Temperature: List[float] = Field([18.54], description="Average temperature at site in °C")
    Humidity: List[float] = Field([49.88], description="Average humidity percentage")
    Weather_Condition: List[str] = Field(["Snowy"], description="Weather condition during construction (e.g., 'Snowy', 'Cloudy', 'Sunny', 'Rainy', 'Stormy')")
    Air_Quality_Index: List[int] = Field([210], description="Air Quality Index (AQI) at site")
    Energy_Consumption: List[float] = Field([25202.99], description="Total energy consumption in kWh")
    Material_Usage: List[float] = Field([244.84], description="Total material usage in metric tons")
    Labor_Hours: List[int] = Field([6602], description="Total labor hours used")
    Accident_Count: List[int] = Field([8], description="Total number of accidents at the site")
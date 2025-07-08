from pydantic import BaseModel, Field
from typing import List


class ActualCostPredictionInput(BaseModel):
    """Actual Cost Prediction Input Schema"""
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
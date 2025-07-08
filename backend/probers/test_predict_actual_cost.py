import requests
import os
from dotenv import load_dotenv
load_dotenv()

AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "http://localhost:8000")

def test_predict_actual_cost():
    url = f"{AI_SERVICE_URL}/predict_actual_cost"
    payload = {
        "Project_Type": ["Bridge"],
        "Planned_Cost": [10000000.0],
        "Planned_Duration": [500],
        "Load_Bearing_Capacity": [500.0],
        "Temperature": [25.0],
        "Humidity": [60.0],
        "Weather_Condition": ["Sunny"],
        "Air_Quality_Index": [150],
        "Energy_Consumption": [20000.0],
        "Material_Usage": [300.0],
        "Labor_Hours": [7000],
        "Accident_Count": [2]
    }

    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 200
    assert "Predicted Actual Cost of Project (USD)" in response.json()
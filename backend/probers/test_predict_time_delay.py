import requests
import os
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "http://localhost:8000")

def test_predict_time_delay():
    url = f"{AI_SERVICE_URL}/predict_time_delay"
    payload = {
        "timestamp": [datetime.now().strftime("%Y-%m-%d %H:%M:%S")],
        "vehicle_gps_latitude": [12.9716],
        "vehicle_gps_longitude": [77.5946],
        "fuel_consumption_rate": [5.1],
        "eta_variation_hours": [2.5],
        "traffic_congestion_level": [6.3],
        "warehouse_inventory_level": [980],
        "loading_unloading_time": [3.2],
        "handling_equipment_availability": [0.9],
        "order_fulfillment_status": [0.8],
        "weather_condition_severity": [0.3],
        "port_congestion_level": [0.5],
        "shipping_costs": [12.0],
        "supplier_reliability_score": [0.95],
        "lead_time_days": [2.0],
        "historical_demand": [105.0],
        "iot_temperature": [20.3],
        "cargo_condition_status": [0.85],
        "route_risk_level": [2.1],
        "customs_clearance_time": [0.6],
        "driver_behavior_score": [0.7],
        "fatigue_monitoring_score": [0.8]
    }

    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())

    assert response.status_code == 200
    assert "Time Delay (In Hours)" in response.json()
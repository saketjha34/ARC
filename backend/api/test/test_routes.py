import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

time_delay_sample_input = {
    "timestamp": ["2021-01-01 00:00:00"],
    "vehicle_gps_latitude": [40.375568],
    "vehicle_gps_longitude": [77.014318],
    "fuel_consumption_rate": [5.136512],
    "eta_variation_hours": [4.998009],
    "traffic_congestion_level": [5.927586],
    "warehouse_inventory_level": [985.716862],
    "loading_unloading_time": [4.951392],
    "handling_equipment_availability": [0.481294],
    "order_fulfillment_status": [0.761166],
    "weather_condition_severity": [0.359066],
    "port_congestion_level": [0.289160],
    "shipping_costs": [10.503853],
    "supplier_reliability_score": [0.986064],
    "lead_time_days": [2.128009],
    "historical_demand": [100.772854],
    "iot_temperature": [18.3],
    "cargo_condition_status": [0.777263],
    "route_risk_level": [1.182116],
    "customs_clearance_time": [0.502006],
    "driver_behavior_score": [0.033843],
    "fatigue_monitoring_score": [0.978599]
}

actual_cost_sample_input = {
    "Project_Type": ["Tunnel"],
    "Planned_Cost": [12260784],
    "Planned_Duration": [699],
    "Load_Bearing_Capacity": [471.2],
    "Temperature": [18.54],
    "Humidity": [49.88],
    "Weather_Condition": ["Snowy"],
    "Air_Quality_Index": [210],
    "Energy_Consumption": [25202.99],
    "Material_Usage": [244.84],
    "Labor_Hours": [6602],
    "Accident_Count": [8]
}


def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "API is running"}


def test_predict_time_delay():
    with patch("api.main.time_delay_prediction_model_pipeline") as mock_pipeline:
        mock_pipeline.return_value = [2.45]
        response = client.post("/predict_time_delay", json=time_delay_sample_input)
        assert response.status_code == 200
        assert response.json() == {"Time Delay(In Hours)": [2.45]}


def test_predict_actual_cost():
    with patch("api.main.actual_cost_prediction_model_pipeline") as mock_pipeline:
        mock_pipeline.return_value = [15000000.0]
        response = client.post("/predict_actual_cost", json=actual_cost_sample_input)
        assert response.status_code == 200
        assert response.json() == {"Predicted Actual Cost of Project(USD)": [15000000.0]}
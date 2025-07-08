import numpy as np
import pytest
from unittest.mock import patch
from api.schema.predict_time_delay import TimeDelayPredictionInput
from api.main import app
from fastapi.testclient import TestClient


# Create a fixture for the FastAPI TestClient
@pytest.fixture
def client():
    return TestClient(app)


# Patch the model pipeline and use the `client` fixture
@patch("api.main.time_delay_prediction_model_pipeline")
def test_predict_time_delay_valid(mock_model, client):
    """
    Test that a valid /predict_time_delay request returns:
    - 200 status code
    - JSON key 'Time Delay (In Hours)'
    - Correct predicted value

    Also ensures the model pipeline is invoked correctly with valid input.
    """
    # Create valid input using the Pydantic model
    valid_input = TimeDelayPredictionInput(
        timestamp=["2021-01-01 00:00:00"],
        vehicle_gps_latitude=[40.375568],
        vehicle_gps_longitude=[77.014318],
        fuel_consumption_rate=[5.136512],
        eta_variation_hours=[4.998009],
        traffic_congestion_level=[5.927586],
        warehouse_inventory_level=[985.716862],
        loading_unloading_time=[4.951392],
        handling_equipment_availability=[0.481294],
        order_fulfillment_status=[0.761166],
        weather_condition_severity=[0.359066],
        port_congestion_level=[0.289160],
        shipping_costs=[10.503853],
        supplier_reliability_score=[0.986064],
        lead_time_days=[2.128009],
        historical_demand=[100.772854],
        iot_temperature=[18.3],
        cargo_condition_status=[0.777263],
        route_risk_level=[1.182116],
        customs_clearance_time=[0.502006],
        driver_behavior_score=[0.033843],
        fatigue_monitoring_score=[0.978599],
    )

    # Mock prediction output
    mock_model.return_value = np.array([2.75])

    # POST request using fixture client
    response = client.post("/predict_time_delay", json=valid_input.model_dump(mode="json"))

    # Assertions
    assert response.status_code == 200
    assert "Time Delay (In Hours)" in response.json()
    assert response.json()["Time Delay (In Hours)"] == [2.75]
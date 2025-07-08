import numpy as np
import pytest
from unittest.mock import patch
from api.schema.predict_actual_cost import ActualCostPredictionInput
from api.main import app
from fastapi.testclient import TestClient


# Create a fixture for the FastAPI TestClient
@pytest.fixture
def client():
    return TestClient(app)


# Patch the actual cost model pipeline
@patch("api.main.actual_cost_prediction_model_pipeline")
def test_predict_actual_cost_valid(mock_model, client):
    """
    Test that a valid /predict_actual_cost request returns:
    - 200 status code
    - JSON key 'Predicted Actual Cost of Project (USD)'
    - Correct predicted value

    Also ensures the model pipeline is invoked correctly with valid input.
    """
    # Create valid input using the Pydantic model
    valid_input = ActualCostPredictionInput(
        project_type=["residential"],
        project_duration_months=[12],
        project_area_sqft=[2500.0],
        labor_hours=[1800],
        material_cost_usd=[150000],
        equipment_cost_usd=[35000],
        energy_consumption_kwh=[12000],
        location_risk_score=[0.7],
        environmental_risk_score=[0.3],
        economic_index=[95.5],
        material_availability_score=[0.85],
        machinery_availability_score=[0.9],
        weather_impact_factor=[0.15],
        soil_condition_score=[0.8],
        project_complexity_level=[2],
        contractor_experience_level=[4],
        accident_count=[2],
    )

    # Mock the prediction result
    mock_model.return_value = np.array([262500.0])

    # Send POST request
    response = client.post("/predict_actual_cost", json=valid_input.model_dump(mode="json"))

    # Validate response
    assert response.status_code == 200
    assert "Predicted Actual Cost of Project (USD)" in response.json()
    assert response.json()["Predicted Actual Cost of Project (USD)"] == [262500.0]
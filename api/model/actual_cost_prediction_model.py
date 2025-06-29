import pandas as pd
import joblib
import numpy as np

# Path to the trained machine learning model (LightGBM pipeline)
model_filepath = "api/model/models/CostEstimationLGBMPipeline.joblib"

# List of relevant feature columns required for cost estimation
actual_cost_estimation_cols = [
    "Project_Type", "Planned_Cost", "Planned_Duration", 
    "Load_Bearing_Capacity", "Temperature", "Humidity", "Weather_Condition", 
    "Air_Quality_Index", "Energy_Consumption", "Material_Usage", 
    "Labor_Hours", "Accident_Count"    
]


def actual_cost_prediction_model_pipeline(data: dict[str, list]) -> np.array:
    """
    Predicts the actual cost of a construction project based on input features.

    Args:
        data (dict[str, list]): A dictionary where keys are feature names and values are lists of feature values.
        Example:
        {
            "Project_Type": ["Tunnel"],
            "Planned_Cost": [12260784],
            "Planned_Duration": [699],
            ...
        }

    Returns:
        np.array: An array of predicted actual cost values.
    """

    # Convert input dictionary to a pandas DataFrame
    df = pd.DataFrame(data)

    # Ensure that only relevant features are selected for prediction
    X = df[actual_cost_estimation_cols].copy()

    # Load the pre-trained LightGBM model
    loaded_model = joblib.load(model_filepath)

    # Make predictions using the model
    predictions = loaded_model.predict(X)

    return predictions
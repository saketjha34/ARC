import pandas as pd
import joblib
import numpy as np

# Path to the trained machine learning model (CatBoost pipeline)
model_filepath = "api/model/models/DelayPred_CatBoost_Pipeline.joblib"

# List of input features required for the model
time_delay_input_cols = [
    "vehicle_gps_latitude", 'vehicle_gps_longitude', 'fuel_consumption_rate', 'eta_variation_hours', 
    'traffic_congestion_level', 'warehouse_inventory_level', 'loading_unloading_time', 
    'handling_equipment_availability', 'weather_condition_severity', 'port_congestion_level', 
    'shipping_costs', 'supplier_reliability_score', 'lead_time_days', 'historical_demand', 
    'iot_temperature', 'cargo_condition_status', 'customs_clearance_time', 'route_risk_level', 
    'driver_behavior_score', 'fatigue_monitoring_score', 'month', 'day', 'day_of_week', 
    'is_weekend', 'month_name'
] 

# Function to extract time-based features from the 'timestamp' column
def add_time_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extracts time-based features from the 'timestamp' column.

    Parameters:
    df (pd.DataFrame): DataFrame containing a 'timestamp' column.

    Returns:
    pd.DataFrame: DataFrame with additional time-based features.
    """
    df["month"] = df["timestamp"].dt.month  # Extract month as an integer (1-12)
    df["day"] = df["timestamp"].dt.day  # Extract day of the month (1-31)
    df["day_of_week"] = df["timestamp"].dt.weekday  # Extract day of the week (0=Monday, 6=Sunday)
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)  # Boolean flag (1 for weekend, 0 for weekday)
    df["month_name"] = df["timestamp"].dt.month_name()  # Extract month name as a string (e.g., 'January')
    return df

# Function to load the model and predict time delays
def time_delay_prediction_model_pipeline(data: dict[str, list]) -> np.array:
    """
    Loads the trained model and predicts time delay based on input data.

    Parameters:
    data (dict[str, list]): Input dictionary where keys are feature names 
                            and values are lists of corresponding values.

    Returns:
    np.array: Predicted time delays.
    """
    # Convert input dictionary to a pandas DataFrame
    df = pd.DataFrame(data)
    
    # Convert the 'timestamp' column to a datetime format
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    # Generate additional time-based features
    df = add_time_features(df)
    
    # Select the relevant features for model prediction
    X = df[time_delay_input_cols].copy()
    
    # Load the pre-trained CatBoost model
    loaded_model = joblib.load(model_filepath)
    
    # Predict and return time delay values
    return loaded_model.predict(X)
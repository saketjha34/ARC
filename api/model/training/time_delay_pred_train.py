import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from catboost import CatBoostRegressor
import joblib
from sklearn import set_config

# Load dataset
df = pd.read_csv("logistics-and-supply-chain-dataset/dynamic_supply_chain_logistics_dataset.csv")
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Feature Engineering
def add_time_features(df):
    df["month"] = df["timestamp"].dt.month
    df["day"] = df["timestamp"].dt.day
    df["day_of_week"] = df["timestamp"].dt.weekday
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)
    df["month_name"] = df["timestamp"].dt.month_name()
    return df

df = add_time_features(df)

# Feature Columns
input_cols = [
    "vehicle_gps_latitude", 'vehicle_gps_longitude', 'fuel_consumption_rate', 'eta_variation_hours', 'traffic_congestion_level',
    'warehouse_inventory_level', 'loading_unloading_time', 'handling_equipment_availability', 'weather_condition_severity',
    'port_congestion_level', 'shipping_costs', 'supplier_reliability_score', 'lead_time_days', 'historical_demand',
    'iot_temperature', 'cargo_condition_status', 'customs_clearance_time', 'route_risk_level', 'driver_behavior_score',
    'fatigue_monitoring_score', 'month', 'day', 'day_of_week', 'is_weekend', 'month_name'
] 
target_col = "delivery_time_deviation"

# Separate Features and Target
X = df[input_cols].copy()
y = df[target_col]

# Identify Numeric and Categorical Columns
numeric_cols = X.select_dtypes(include=['number']).columns.tolist()
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ]
)

# Define CatBoost Model
catboost_model = CatBoostRegressor(
    n_estimators=1400,
    learning_rate=0.04795,
    l2_leaf_reg=3.67,
    colsample_bylevel=0.98,
    subsample=0.90,
    min_data_in_leaf=300,
    max_bin=100,
    od_wait=100,
    bootstrap_type='Bernoulli',
    random_seed=42,
    verbose=0
)

# Full Pipeline
pipeline = Pipeline([
    ('preprocessing', preprocessor),
    ('model', catboost_model)
])

# Train Model
pipeline.fit(X, y)

# Save Model
joblib.dump(pipeline, 'saved_models/CatBoost_Pipeline.joblib')

# Load Model
loaded_pipeline = joblib.load('saved_models/CatBoost_Pipeline.joblib')
print("Model saved successfully.")

# Enable sklearn diagram display
set_config(display='diagram')

# Function to visualize pipeline
def visualize_pipeline():
    plt.figure(figsize=(10, 6))
    
    # Define nodes
    nodes = [
        "Input Features",
        "Time Features Extraction",
        "Numerical Features\n(Standard Scaler)",
        "Categorical Features\n(OneHot Encoder)",
        "Preprocessed Data",
        "CatBoost Model",
        "Predicted Delivery Deviation"
    ]

    # Define edges (connections)
    edges = [
        ("Input Features", "Time Features Extraction"),
        ("Time Features Extraction", "Numerical Features\n(Standard Scaler)"),
        ("Time Features Extraction", "Categorical Features\n(OneHot Encoder)"),
        ("Numerical Features\n(Standard Scaler)", "Preprocessed Data"),
        ("Categorical Features\n(OneHot Encoder)", "Preprocessed Data"),
        ("Preprocessed Data", "CatBoost Model"),
        ("CatBoost Model", "Predicted Delivery Deviation")
    ]

    # Create graph
    G = nx.DiGraph()
    G.add_nodes_from(nodes)
    G.add_edges_from(edges)

    pos = {
        "Input Features": (0, 4),
        "Time Features Extraction": (0, 3),
        "Numerical Features\n(Standard Scaler)": (-2, 2),
        "Categorical Features\n(OneHot Encoder)": (2, 2),
        "Preprocessed Data": (0, 1),
        "CatBoost Model": (0, 0),
        "Predicted Delivery Deviation": (0, -1),
    }

    # Draw the graph
    nx.draw(G, pos, with_labels=True, node_color='lightblue', edge_color='black', node_size=3000, font_size=10, font_weight="bold")

    # Show plot
    plt.title("Preprocessing & Model Pipeline Visualization")
    plt.show()

# Call the function to visualize
visualize_pipeline()

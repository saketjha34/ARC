import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from lightgbm import LGBMRegressor
import joblib
from sklearn import set_config

# Load dataset
df = pd.read_csv("bim-ai-integrated-dataset/bim_ai_civil_engineering_dataset.csv")

# Feature Columns
input_cols = ["Project_Type", "Planned_Cost", "Planned_Duration", "Load_Bearing_Capacity", "Temperature", "Humidity",
              "Weather_Condition", "Air_Quality_Index", "Energy_Consumption", "Material_Usage", "Labor_Hours", "Accident_Count"    
]
target_col = "Actual_Cost"

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

# LightGBM Model
best_lgbm_params = {
    'n_estimators': 875,
    'learning_rate': 0.012980806806970991,
    'num_leaves': 210,
    'max_depth': 4,
    'min_data_in_leaf': 10,
    'lambda_l1': 7.4123963470068555,
    'lambda_l2': 4.134663469927997,
    'feature_fraction': 0.8716263044935987,
    'bagging_fraction': 0.8102337241662869,
    'bagging_freq': 7,
    'min_gain_to_split': 1.9576341900233467,
    'max_bin': 190,
    'boosting_type': 'gbdt'
}

lgbm_model = LGBMRegressor(**best_lgbm_params)

# Full Pipeline
pipeline = Pipeline([
    ('preprocessing', preprocessor),
    ('model', lgbm_model)
])

# Train Model
pipeline.fit(X, y)

# Save Model
joblib.dump(pipeline, 'saved_models/CostEstimationLGBMPipeline.joblib')

# Load Model
loaded_pipeline = joblib.load('saved_models/CostEstimationLGBMPipeline.joblib')
print("Model saved successfully.")

# Enable sklearn diagram display
set_config(display='diagram')

# Function to visualize pipeline
def visualize_pipeline():
    plt.figure(figsize=(10, 6))
    
    # Define nodes
    nodes = [
        "Input Features",
        "Numerical Features\n(Standard Scaler)",
        "Categorical Features\n(OneHot Encoder)",
        "Preprocessed Data",
        "LightGBM Model",
        "Predicted Cost"
    ]

    # Define edges (connections)
    edges = [
        ("Input Features", "Numerical Features\n(Standard Scaler)"),
        ("Input Features", "Categorical Features\n(OneHot Encoder)"),
        ("Numerical Features\n(Standard Scaler)", "Preprocessed Data"),
        ("Categorical Features\n(OneHot Encoder)", "Preprocessed Data"),
        ("Preprocessed Data", "LightGBM Model"),
        ("LightGBM Model", "Predicted Cost")
    ]

    # Create graph
    G = nx.DiGraph()
    G.add_nodes_from(nodes)
    G.add_edges_from(edges)

    pos = {
        "Input Features": (0, 3),
        "Numerical Features\n(Standard Scaler)": (-2, 2),
        "Categorical Features\n(OneHot Encoder)": (2, 2),
        "Preprocessed Data": (0, 1),
        "LightGBM Model": (0, 0),
        "Predicted Cost": (0, -1),
    }

    # Draw the graph
    nx.draw(G, pos, with_labels=True, node_color='skyblue', edge_color='black', node_size=3000, font_size=10, font_weight="bold")

    # Show plot
    plt.title("Preprocessing & Model Pipeline Visualization")
    plt.show()

# Call the function to visualize
visualize_pipeline()
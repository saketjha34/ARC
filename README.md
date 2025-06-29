# 🚧 Smart Resource Optimization for Efficient Construction Management

## 📌 Project Codename
> **ARC** – *AI-powered Resource & Cost analysis*

**An AI-powered platform that predicts time delays and actual construction costs to enable proactive planning, optimal resource allocation, and data-driven decision-making for large-scale infrastructure projects.**


## Overview

This project leverages **machine learning** to optimize key aspects of construction logistics by:

* 🔹 **Predicting transportation delays** using real-time and historical IoT, logistics, and environmental data.
* 🔹 **Forecasting actual project costs** based on planned resources, site conditions, and other operational factors.

Both models are served via a **FastAPI** backend with well-structured input validation using **Pydantic**, and are built for easy integration into modern construction ERP systems.

## Objectives

* **Minimize costly delays** in transportation and materials handling.
* **Estimate true construction costs** with higher accuracy for budgeting.
* Enable **real-time insights** using IoT and project telemetry data.
* Provide **actionable intelligence** for stakeholders in construction planning.

##  Model Details

### 📦 1. Time Delay Prediction Model

| Metric                    | Value             |
| ------------------------- | ----------------- |
| Model Type                | CatBoostRegressor |
| Input Size                | 25 features       |
| MAE (Mean Absolute Error) | \~0.45 hrs        |
| R² Score                  | \~0.89            |

**Key Features Used:**

* GPS coordinates, fuel consumption
* IoT telemetry (temperature, cargo condition)
* Congestion, inventory levels
* Timestamp features (day, month, is\_weekend, etc.)

**Model File:** `DelayPred_CatBoost_Pipeline.joblib`

### 2. Actual Cost Estimation Model

| Metric     | Value             |
| ---------- | ----------------- |
| Model Type | CatBoostRegressor |
| Input Size | 12 features       |
| MAE        | \~\$0.98M USD     |
| R² Score   | \~0.87            |

**Key Features Used:**

* Project type, planned cost and duration
* Load-bearing capacity, AQI, humidity
* Material and energy usage
* Accidents and labor hours

**Model File:** `CostEstimationLGBMPipeline.joblib`

## 🛠️ Tech Stack

| Component         | Description                                       |
| ----------------- | ------------------------------------------------- |
| 🐍 Python         | Core programming language                         |
| 🚀 FastAPI        | High-performance API framework                    |
| 📦 CatBoost       | Gradient boosting ML library for tabular data     |
| 📦 LightGBM       | Lightweight GBM used in one version of cost model |
| 📊 Pandas / NumPy | Data wrangling and numerical operations           |
| 🔐 Pydantic       | Data validation using typed schemas               |
| 🧪 Pytest         | Unit and integration testing                      |
| 📁 Joblib         | Model serialization/deserialization               |


## 📩 API Endpoints

### `/predict_time_delay` – POST

Predicts transportation delay (in hours) from logistics and IoT data.

**Input:** JSON adhering to `TimeDelayPredictionInput` schema
**Output:**

```json
{
  "Time Delay(In Hours)": [4.23]
}
```

---

### `/predict_actual_cost` – POST

Predicts actual construction cost (in USD) based on site parameters.

**Input:** JSON adhering to `ActualCostPredictionInput` schema
**Output:**

```json
{
  "Predicted Actual Cost of Project(USD)": [14567890.23]
}
```

---

##  Model Evaluation

Both models were trained and evaluated using a 80/20 train-test split on synthetic and cleaned construction datasets. Hyperparameter tuning was done via grid search and cross-validation.

---

##  Folder Structure

```
api/
├── main.py                # FastAPI application routes
├── schemas.py             # Pydantic models for request bodies
├── model/
│   ├── cost_model.py      # Cost estimation pipeline logic
│   ├── delay_model.py     # Time delay prediction logic
│   └── models/            # Serialized model files (.joblib)
└── test/
    └── test_routes.py     # Unit and integration tests
```

---

##  Future Enhancements

* Add user dashboard for real-time visualization
* Integrate with MinIO for model input storage
* Add live feedback loop from project managers
* Improve performance with ensemble models or LSTM for time-series delay prediction

---
from api.model import time_delay_prediction_model_pipeline
from api.model import actual_cost_prediction_model_pipeline
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.schema.predict_time_delay import TimeDelayPredictionInput
from api.schema.predict_actual_cost import ActualCostPredictionInput
from api.core.load_env import FRONTEND_URL

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080", FRONTEND_URL],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def health_check():
    """
    Health check endpoint to verify that the API is running.
    """
    return {"status": "API is running"}


@app.post("/predict_time_delay")
def predict_time_delay(data: TimeDelayPredictionInput):
    """
    Predicts the time delay (in hours) for logistics and transportation operations.

    Args:
        data (TimeDelayPredictionInput): Input features for time delay model.

    Returns:
        dict: Predicted delay in hours.
    """
    try:
        data_dict = data.model_dump()
        predictions = time_delay_prediction_model_pipeline(data_dict)
        return {"Time Delay (In Hours)": predictions.tolist()}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(ve)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to make prediction: {str(e)}")


@app.post("/predict_actual_cost")
def predict_actual_cost(input_data: ActualCostPredictionInput):
    """
    Predicts the actual cost of a construction project based on the input features.

    Args:
        input_data (ActualCostPredictionInput): Input features for cost prediction.

    Returns:
        dict: Predicted project cost in USD.
    """
    try:
        data_dict = input_data.model_dump()
        predictions = actual_cost_prediction_model_pipeline(data_dict)
        return {"Predicted Actual Cost of Project (USD)": predictions.tolist()}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(ve)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to make prediction: {str(e)}")
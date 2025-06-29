import requests

example_data1 = {
    "timestamp": ["2021-01-01 00:00:00"], 
    "vehicle_gps_latitude": [40.375568],  
    "vehicle_gps_longitude": [77.014318],  
    "fuel_consumption_rate": [5.136512],  
    "eta_variation_hours": [1.998009],  
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
    "iot_temperature": [-1.3],  
    "cargo_condition_status": [0.777263], 
    "route_risk_level": [1.182116],  
    "customs_clearance_time": [0.502006], 
    "driver_behavior_score": [0.033843], 
    "fatigue_monitoring_score": [0.978599], 
}

example_data2= {
    "timestamp": [
        "2021-01-01T00:00:00",
        "2021-01-02T06:15:30",
        "2021-01-03T12:30:45",
        "2021-01-04T18:45:15",
        "2021-01-05T23:59:59"   
    ],
    "vehicle_gps_latitude": [40.375568, 41.256789, 39.847123, 42.153467, 38.965432],
    "vehicle_gps_longitude": [77.014318, 76.895678, 77.112345, 76.543876, 77.321654],
    "fuel_consumption_rate": [5.136512, 5.245678, 4.982134, 5.389761, 4.765432],
    "eta_variation_hours": [4.998009, 5.102345, 4.876543, 5.234567, 4.654321],
    "traffic_congestion_level": [5.927586, 6.345678, 5.782134, 6.112345, 5.543210],
    "warehouse_inventory_level": [985.716862, 972.543210, 998.134567, 954.876543, 1002.765432],
    "loading_unloading_time": [4.951392, 5.002345, 4.867543, 5.123456, 4.765432],
    "handling_equipment_availability": [0.481294, 0.562345, 0.432167, 0.523456, 0.491234],
    "order_fulfillment_status": [0.761166, 0.823456, 0.712345, 0.854321, 0.693210],
    "weather_condition_severity": [0.359066, 0.456123, 0.312345, 0.501234, 0.289654],
    "port_congestion_level": [0.289160, 0.378901, 0.265432, 0.401234, 0.212345],
    "shipping_costs": [10.503853, 11.245678, 9.876543, 12.123456, 9.432109],
    "supplier_reliability_score": [0.986064, 0.945678, 0.992345, 0.923456, 0.978123],
    "lead_time_days": [2.128009, 2.543210, 1.987654, 2.678901, 1.876543],
    "historical_demand": [100.772854, 95.345678, 110.987654, 92.123456, 115.432109],
    "iot_temperature": [18.3, 19.5, 17.8, 20.2, 16.9],
    "cargo_condition_status": [0.777263, 0.854321, 0.698765, 0.901234, 0.675432],
    "route_risk_level": [1.182116, 1.543210, 0.987654, 1.678901, 0.876543],
    "customs_clearance_time": [0.502006, 0.623456, 0.432167, 0.701234, 0.389765],
    "driver_behavior_score": [0.033843, 0.045678, 0.029876, 0.050123, 0.027654],
    "fatigue_monitoring_score": [0.978599, 0.945678, 0.989123, 0.923456, 0.967890]
}

example_data2 = {
    'Project_Type': ['Tunnel'],
    'Planned_Cost': [12260784],
    # 'Actual_Cost': [15054504.04588933],
    'Cost_Overrun': [2793720.045889329],
    'Planned_Duration': [699],
    'Schedule_Deviation': [114.9148521081487],
    'Vibration_Level': [1.5341721708884293],
    'Crack_Width': [2.809384781207566],
    'Load_Bearing_Capacity': [471.1973805508],
    'Temperature': [18.54155503456163],
    'Humidity': [49.88337244454125],
    'Weather_Condition': ['Snowy'],
    'Air_Quality_Index': [210],
    'Energy_Consumption': [25202.994686520688],
    'Material_Usage': [244.8433100821766],
    'Labor_Hours': [6602],
    'Equipment_Utilization': [76.30018368028198],
    'Accident_Count': [8],
}


if __name__ == "__main__":
    url = "http://127.0.0.1:8000/predict_actual_cost"
    response = requests.post(url, json=example_data2)
    print(response.json())
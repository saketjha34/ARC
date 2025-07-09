
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputField } from '@/components/InputField';
import { SelectField } from '@/components/SelectField';
import { ResultCard } from '@/components/ResultCard';
import { predictActualCost } from '@/lib/api/client';
import { ActualCostFormData, ActualCostRequest, PROJECT_TYPES, WEATHER_CONDITIONS } from '@/types/actualCost';
import { DollarSign, Building } from 'lucide-react';

export const ActualCostForm: React.FC = () => {
  const defaultValues: ActualCostFormData = {
    Project_Type: 'Building',
    Planned_Cost: 500000,
    Planned_Duration: 365,
    Load_Bearing_Capacity: 1000.0,
    Temperature: 25.0,
    Humidity: 60.0,
    Weather_Condition: 'Sunny',
    Air_Quality_Index: 50,
    Energy_Consumption: 15000.0,
    Material_Usage: 2500.0,
    Labor_Hours: 8000,
    Accident_Count: 2,
  };

  const [formData, setFormData] = useState<ActualCostFormData>(defaultValues);

  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearForm = () => {
    setFormData(defaultValues);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Convert form data to API request format (arrays with single values)
      const requestData: ActualCostRequest = Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key as keyof ActualCostRequest] = [value] as any;
        return acc;
      }, {} as ActualCostRequest);

      console.log('Sending request:', requestData);
      const response = await predictActualCost(requestData);
      setResult(response["Predicted Actual Cost of Project (USD)"][0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Project Cost Prediction</h1>
          </div>
          <p className="text-gray-600">Predict actual project costs using ML-powered analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Project Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SelectField
                      label="Project Type"
                      name="Project_Type"
                      value={formData.Project_Type}
                      onChange={handleSelectChange('Project_Type')}
                      options={PROJECT_TYPES}
                      required
                    />
                    <InputField
                      label="Planned Cost"
                      name="Planned_Cost"
                      type="number"
                      value={formData.Planned_Cost}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="USD"
                      required
                    />
                    <InputField
                      label="Planned Duration"
                      name="Planned_Duration"
                      type="number"
                      value={formData.Planned_Duration}
                      onChange={handleInputChange}
                      placeholder="Days"
                      required
                    />
                    <InputField
                      label="Load Bearing Capacity"
                      name="Load_Bearing_Capacity"
                      type="number"
                      value={formData.Load_Bearing_Capacity}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="Tons"
                      required
                    />
                    <InputField
                      label="Temperature"
                      name="Temperature"
                      type="number"
                      value={formData.Temperature}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="°C"
                      required
                    />
                    <InputField
                      label="Humidity"
                      name="Humidity"
                      type="number"
                      value={formData.Humidity}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="%"
                      required
                    />
                    <SelectField
                      label="Weather Condition"
                      name="Weather_Condition"
                      value={formData.Weather_Condition}
                      onChange={handleSelectChange('Weather_Condition')}
                      options={WEATHER_CONDITIONS}
                      required
                    />
                    <InputField
                      label="Air Quality Index"
                      name="Air_Quality_Index"
                      type="number"
                      value={formData.Air_Quality_Index}
                      onChange={handleInputChange}
                      placeholder="0-500"
                      required
                    />
                    <InputField
                      label="Energy Consumption"
                      name="Energy_Consumption"
                      type="number"
                      value={formData.Energy_Consumption}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="kWh"
                      required
                    />
                    <InputField
                      label="Material Usage"
                      name="Material_Usage"
                      type="number"
                      value={formData.Material_Usage}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="Units"
                      required
                    />
                    <InputField
                      label="Labor Hours"
                      name="Labor_Hours"
                      type="number"
                      value={formData.Labor_Hours}
                      onChange={handleInputChange}
                      placeholder="Hours"
                      required
                    />
                    <InputField
                      label="Accident Count"
                      name="Accident_Count"
                      type="number"
                      value={formData.Accident_Count}
                      onChange={handleInputChange}
                      placeholder="Number"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? 'Predicting...' : 'Predict Actual Cost'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleClearForm}
                      disabled={isLoading}
                      className="px-8"
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <ResultCard
              title="Predicted Actual Cost"
              result={result}
              unit="USD"
              isLoading={isLoading}
              error={error}
              className="sticky top-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

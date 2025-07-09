
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, TrendingUp, BarChart3, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: "Time Delay Prediction",
      description: "Predict shipping delays using 22+ parameters including GPS, weather, traffic, and logistics data.",
      color: "blue",
      action: () => navigate('/time-delay'),
      stats: "22 Parameters"
    },
    {
      icon: DollarSign,
      title: "Cost Prediction",
      description: "Estimate actual project costs considering weather, materials, labor, and environmental factors.",
      color: "green",
      action: () => navigate('/actual-cost'),
      stats: "12 Variables"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Improved Planning",
      description: "Make data-driven decisions with accurate predictions"
    },
    {
      icon: BarChart3,
      title: "Cost Optimization",
      description: "Identify cost factors and optimize resource allocation"
    },
    {
      icon: Activity,
      title: "Real-time Analysis",
      description: "Get instant predictions with live data processing"
    },
    {
      icon: Zap,
      title: "ML-Powered",
      description: "Advanced machine learning algorithms for precise forecasting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ML Prediction Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Advanced machine learning predictions for logistics and project management
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-300 border-l-4 ${
                  feature.color === 'blue' ? 'border-l-blue-500 hover:border-l-blue-600' : 'border-l-green-500 hover:border-l-green-600'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        feature.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${
                          feature.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <div className={`text-sm font-medium ${
                          feature.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {feature.stats}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    onClick={feature.action}
                    className={`w-full ${
                      feature.color === 'blue' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Leverage cutting-edge machine learning to transform your business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Choose a prediction model above to begin analyzing your data with our advanced ML algorithms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/time-delay')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Predict Time Delays
              </Button>
              <Button 
                onClick={() => navigate('/actual-cost')}
                className="bg-green-600 hover:bg-green-700"
              >
                Predict Project Costs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

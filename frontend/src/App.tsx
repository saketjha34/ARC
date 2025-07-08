import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TimeDelayForm } from './components/forms/TimeDelayForm';
import { CostPredictionForm } from './components/forms/CostPredictionForm';
import { StatsCard } from './components/dashboard/StatsCard';
import { FeatureCard } from './components/dashboard/FeatureCard';
import { Alert } from './components/ui/Alert';
import { 
  ClockIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  CpuChipIcon,
  TruckIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { apiService } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'time-delay' | 'cost-prediction'>('overview');
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await apiService.healthCheck();
      setApiStatus('online');
    } catch (error) {
      setApiStatus('offline');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'time-delay', label: 'Time Delay Prediction', icon: ClockIcon },
    { id: 'cost-prediction', label: 'Cost Prediction', icon: CurrencyDollarIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* API Status Alert */}
        {apiStatus === 'offline' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <Alert 
              type="error" 
              title="API Connection Error"
              message="Unable to connect to the backend API. Please ensure the FastAPI server is running on http://127.0.0.1:8000"
            />
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Section */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Smart Resource Optimization Platform
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Leverage AI-powered predictions to optimize construction logistics, minimize delays, 
                  and accurately forecast project costs for efficient resource management.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Time Delay Model"
                  value="~0.45h"
                  description="Mean Absolute Error"
                  icon={ClockIcon}
                  color="blue"
                />
                <StatsCard
                  title="Cost Model"
                  value="~$0.98M"
                  description="Mean Absolute Error"
                  icon={CurrencyDollarIcon}
                  color="green"
                />
                <StatsCard
                  title="R² Score"
                  value="~0.89"
                  description="Time Delay Accuracy"
                  icon={ChartBarIcon}
                  color="yellow"
                />
                <StatsCard
                  title="R² Score"
                  value="~0.87"
                  description="Cost Prediction Accuracy"
                  icon={CpuChipIcon}
                  color="red"
                />
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FeatureCard
                  title="Time Delay Prediction"
                  description="Predict transportation delays using real-time IoT data, logistics parameters, and environmental factors."
                  icon={TruckIcon}
                  color="bg-blue-600"
                  features={[
                    'GPS tracking and route optimization',
                    'IoT temperature and cargo monitoring',
                    'Traffic congestion analysis',
                    'Weather condition assessment',
                    'Driver behavior and fatigue monitoring'
                  ]}
                />
                <FeatureCard
                  title="Cost Prediction"
                  description="Estimate actual construction project costs based on planned resources, site conditions, and operational factors."
                  icon={BuildingOffice2Icon}
                  color="bg-construction-600"
                  features={[
                    'Project type and scope analysis',
                    'Environmental condition impact',
                    'Material and energy consumption',
                    'Labor hours optimization',
                    'Safety and accident assessment'
                  ]}
                />
              </div>

              {/* Technology Stack */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                    <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Technology Stack</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CpuChipIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Machine Learning</h3>
                    <p className="text-sm text-gray-600">CatBoost & LightGBM</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Backend API</h3>
                    <p className="text-sm text-gray-600">FastAPI & Pydantic</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ChartBarIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Frontend</h3>
                    <p className="text-sm text-gray-600">React & TypeScript</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CpuChipIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Data Processing</h3>
                    <p className="text-sm text-gray-600">Pandas & NumPy</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'time-delay' && (
            <div className="animate-fade-in">
              <TimeDelayForm />
            </div>
          )}

          {activeTab === 'cost-prediction' && (
            <div className="animate-fade-in">
              <CostPredictionForm />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
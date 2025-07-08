import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ARC Platform</h3>
            <p className="text-gray-400 text-sm">
              AI-powered Resource & Cost Analysis for efficient construction management.
              Optimize your projects with predictive analytics.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Time Delay Prediction</li>
              <li>• Cost Estimation</li>
              <li>• Real-time Analytics</li>
              <li>• Resource Optimization</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Technology</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Machine Learning Models</li>
              <li>• FastAPI Backend</li>
              <li>• React Frontend</li>
              <li>• Real-time Processing</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 ARC Platform. Built for efficient construction management.</p>
        </div>
      </div>
    </footer>
  );
};
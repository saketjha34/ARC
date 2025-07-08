import React from 'react';
import { BuildingOffice2Icon, CpuChipIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <BuildingOffice2Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ARC Platform</h1>
              <p className="text-sm text-gray-500">AI-powered Resource & Cost Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CpuChipIcon className="w-4 h-4" />
            <span>Smart Construction Management</span>
          </div>
        </div>
      </div>
    </header>
  );
};
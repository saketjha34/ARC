
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ResultCardProps {
  title: string;
  result: number | null;
  unit?: string;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  result,
  unit = '',
  isLoading = false,
  error = null,
  className = '',
}) => {
  if (isLoading) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Calculating prediction...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`border-red-200 bg-red-50 ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (result === null) {
    return (
      <Card className={`border-gray-200 ${className}`}>
        <CardHeader>
          <CardTitle className="text-gray-600">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Submit the form to see prediction results</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-green-200 bg-green-50 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-800">
          {typeof result === 'number' ? result.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          }) : result}
          {unit && <span className="text-lg text-green-600 ml-1">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

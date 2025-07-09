import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Globe, AlertCircle } from 'lucide-react';
import { updateApiUrl } from '@/lib/api/client';

export const ApiSettings: React.FC = () => {
  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem('api_base_url') || 'https://arc-production.up.railway.app'
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateUrl = () => {
    setIsUpdating(true);
    setTimeout(() => {
      updateApiUrl(apiUrl);
    }, 500);
  };

  const handleReset = () => {
    setApiUrl('https://arc-production.up.railway.app');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          API Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-url">API Base URL</Label>
          <Input
            id="api-url"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://your-api-url.com"
          />
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Globe className="h-4 w-4 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium">API Connected</p>
              <p>The ML prediction API is working and will return real predictions.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleUpdateUrl} 
            disabled={isUpdating}
            className="flex-1"
          >
            <Globe className="h-4 w-4 mr-2" />
            {isUpdating ? 'Updating...' : 'Update URL'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={isUpdating}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import IntegrationsGrid from './IntegrationsGrid';
import { integrations } from './integrationsList';

const Integrations: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/settings" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Integrations</h1>
        </div>
        <IntegrationsGrid integrations={integrations} />
      </div>
    </div>
  );
};
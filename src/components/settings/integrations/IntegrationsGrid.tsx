import React from 'react';
import IntegrationCard from './IntegrationCard';
import { IntegrationTile } from '../../../types/settings';

interface IntegrationsGridProps {
  integrations: IntegrationTile[];
}

const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({ integrations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <IntegrationCard key={integration.name} integration={integration} />
      ))}
    </div>
  );
};
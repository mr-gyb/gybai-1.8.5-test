import React from 'react';
import { IntegrationTile } from '../../../types/settings';
import { useIntegration } from '../../../hooks/useIntegration';

interface IntegrationCardProps {
  integration: IntegrationTile;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  const {
    isConnecting,
    status,
    error,
    connect,
    disconnect
  } = useIntegration(integration.name);

  const handleToggleConnection = () => {
    if (status === 'connected') {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <img 
          src={integration.logo} 
          alt={`${integration.name} logo`} 
          className="w-12 h-12 mr-4 object-contain" 
        />
        <h2 className="text-xl font-semibold">{integration.name}</h2>
      </div>
      <p className="text-gray-600 mb-4">{integration.description}</p>
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      <button
        onClick={handleToggleConnection}
        disabled={isConnecting}
        className={`px-4 py-2 rounded-full inline-block transition duration-300 ${
          status === 'connected'
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-navy-blue text-white hover:bg-opacity-90'
        }`}
      >
        {isConnecting ? 'Connecting...' : status === 'connected' ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
};
import React, { useState } from 'react';
import { MoreHorizontal, X, Star, Users, MessageCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FilterOptions {
  agentType: string[];
}

interface FloatingFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const FloatingFilter: React.FC<FloatingFilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    agentType: [],
  });
  const navigate = useNavigate();

  const toggleFilter = () => setIsOpen(!isOpen);

  const handleAgentTypeChange = (agentType: string) => {
    const updatedAgentType = filters.agentType.includes(agentType)
      ? filters.agentType.filter(a => a !== agentType)
      : [...filters.agentType, agentType];
    updateFilters({ ...filters, agentType: updatedAgentType });
  };

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const agentTypes = [
    'Mr.GYB AI',
    'CEO',
    'COO',
    'CHRO',
    'CTO',
    'CMO',
  ];

  const handleDreamTeamNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={toggleFilter}
        className="bg-navy-blue text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <MoreHorizontal size={24} />
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 max-h-96 overflow-y-auto transition-opacity duration-300">
          <button
            onClick={toggleFilter}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
          <h3 className="font-bold mb-2">Filters</h3>
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Agent Type</h4>
            {agentTypes.map((agent) => (
              <label key={agent} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={filters.agentType.includes(agent)}
                  onChange={() => handleAgentTypeChange(agent)}
                  className="mr-2"
                />
                {agent}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Dream Team</h4>
            <button
              onClick={() => handleDreamTeamNavigation('/dream-team')}
              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 transition-colors flex items-center"
            >
              <Users size={16} className="mr-2" />
              AI Team Members
            </button>
            <button
              onClick={() => handleDreamTeamNavigation('/gyb-team-chat')}
              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 transition-colors flex items-center"
            >
              <MessageCircle size={16} className="mr-2" />
              GYB Team Chat
            </button>
            <button
              onClick={() => handleDreamTeamNavigation('/chat-history')}
              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 transition-colors flex items-center"
            >
              <Clock size={16} className="mr-2" />
              Chat History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingFilter;
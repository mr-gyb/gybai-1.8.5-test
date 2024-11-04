import React, { useState } from 'react';
import { ChevronLeft, Star, Users, Video, Plus, PieChart, TrendingUp, Package, Film, FileText, BarChart2, Globe, MessageCircle, DollarSign, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RoadMap: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const navigate = useNavigate();

  const fabOptions = [
    { id: 'businessplan', icon: FileText, label: 'Business Plan', path: '/business-plan' },
    { id: 'investordeck', icon: PieChart, label: 'Investor Deck', path: '/investor-deck' },
    { id: 'marketanalysis', icon: BarChart2, label: 'Market Analysis', path: '/market-analysis' },
    { id: 'marketingsales', icon: TrendingUp, label: 'Marketing/Sales Plan', path: '/marketing-sales' },
    { id: 'fulfilmentplan', icon: Package, label: 'Fulfilment Plan', path: '/fulfilment-plan' },
    { id: 'mediaplan', icon: Film, label: 'Media Plan', path: '/media-plan' },
    { id: 'roadmap', icon: Settings, label: 'Road Map Layout', path: '/road-map-template' }
  ];

  const sections = {
    culture: {
      title: 'CULTURE',
      color: 'navy-blue',
      icon: Star,
      items: [
        'Vision and mission statements',
        'Core values and brand personality',
        'Logo, brand colors, and overall aesthetic',
        'Defined target audience and ideal customer profile'
      ]
    },
    content: {
      title: 'CONTENT',
      color: 'gold',
      icon: FileText,
      items: [
        'Consistent messaging across channels',
        'Educational and problem-solving media',
        'Engaging storytelling and brand voice',
        'Strategic content calendar for audience needs'
      ]
    },
    community: {
      title: 'COMMUNITY',
      color: 'navy-blue',
      icon: Users,
      items: [
        'Interactive spaces (forums, events)',
        'Gamification and feedback loops',
        'Member engagement strategies',
        'Community guidelines and moderation'
      ]
    },
    commerce: {
      title: 'COMMERCE',
      color: 'gold',
      icon: DollarSign,
      items: [
        'Sales funnels',
        'Advertising strategies',
        'Automation systems',
        'Analytics and reporting'
      ]
    }
  };

  const handleSectionClick = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleOptionClick = (path: string) => {
    navigate(path);
    setIsFabExpanded(false);
  };

  const toggleFab = () => {
    setIsFabExpanded(!isFabExpanded);
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">4Cs = Profit Off Passion Journey</h1>
        </div>

        <div className="space-y-8">
          {Object.entries(sections).map(([key, section]) => (
            <div
              key={key}
              className={`transform transition-all duration-300 ${
                expandedSection === key ? 'scale-105' : ''
              }`}
            >
              <div
                className={`bg-${section.color} text-white p-6 rounded-lg shadow-lg cursor-pointer`}
                onClick={() => handleSectionClick(key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <section.icon className="h-6 w-6" />
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                </div>

                {expandedSection === key && (
                  <div className="mt-4 space-y-2 text-sm">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-10 p-3 rounded-lg flex items-center space-x-2"
                      >
                        <Settings className="h-4 w-4" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Implementation Timeline</h3>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-navy-blue"></div>
              <div className="flex justify-between items-start pt-6">
                {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, index) => (
                  <div key={quarter} className="text-center">
                    <div className="w-4 h-4 bg-navy-blue rounded-full mx-auto mb-2"></div>
                    <p className="font-semibold">{quarter}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {index === 0 && 'Culture Focus'}
                      {index === 1 && 'Content Development'}
                      {index === 2 && 'Community Building'}
                      {index === 3 && 'Commerce Integration'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB Menu */}
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={toggleFab}
          className="bg-navy-blue text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <Plus size={24} />
        </button>
        {isFabExpanded && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 max-h-96 overflow-y-auto">
            <h3 className="font-bold mb-2">Templates</h3>
            <div className="space-y-2">
              {fabOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.path)}
                  className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 transition-colors flex items-center"
                >
                  <option.icon size={16} className="mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadMap;
import React, { useState } from 'react';
import { ChevronLeft, Save, Edit2, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessPlan: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState({
    executiveSummary: {
      title: 'Executive Summary',
      content: 'Write a brief overview of your business plan...',
      subsections: {
        businessDescription: '',
        missionStatement: '',
        keyObjectives: '',
      }
    },
    marketAnalysis: {
      title: 'Market Analysis',
      content: 'Describe your target market and industry analysis...',
      subsections: {
        targetMarket: '',
        competitiveAnalysis: '',
        marketSize: '',
      }
    },
    organizationStructure: {
      title: 'Organization & Management',
      content: 'Outline your business structure and management team...',
      subsections: {
        legalStructure: '',
        managementTeam: '',
        staffing: '',
      }
    },
    productService: {
      title: 'Product/Service Line',
      content: 'Detail your products or services...',
      subsections: {
        description: '',
        pricing: '',
        benefits: '',
      }
    },
    marketingStrategy: {
      title: 'Marketing & Sales Strategy',
      content: 'Explain your marketing and sales approach...',
      subsections: {
        marketingPlan: '',
        salesStrategy: '',
        promotions: '',
      }
    },
    financialProjections: {
      title: 'Financial Projections',
      content: 'Provide financial forecasts and requirements...',
      subsections: {
        startupCosts: '',
        projectedRevenue: '',
        breakEvenAnalysis: '',
      }
    },
  });

  const handleSectionChange = (sectionKey: string, field: string, value: string) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      }
    }));
  };

  const handleSubsectionChange = (sectionKey: string, subsectionKey: string, value: string) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        subsections: {
          ...prev[sectionKey].subsections,
          [subsectionKey]: value,
        }
      }
    }));
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/road-map" className="mr-4 text-navy-blue">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">Business Plan Template</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
          >
            {isEditing ? <Save size={20} className="mr-2" /> : <Edit2 size={20} className="mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Plan'}
          </button>
        </div>

        <div className="space-y-8">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              {isEditing ? (
                <textarea
                  value={section.content}
                  onChange={(e) => handleSectionChange(key, 'content', e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-300 mb-4"
                  rows={4}
                />
              ) : (
                <p className="mb-4">{section.content}</p>
              )}

              <div className="space-y-4">
                {Object.entries(section.subsections).map(([subKey, content]) => (
                  <div key={subKey} className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold mb-2 capitalize">
                      {subKey.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={content}
                        onChange={(e) => handleSubsectionChange(key, subKey, e.target.value)}
                        className="w-full p-2 rounded border border-gray-300"
                        rows={3}
                        placeholder={`Enter ${subKey.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} details...`}
                      />
                    ) : (
                      <p className="text-gray-600">
                        {content || 'No content added yet.'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan;
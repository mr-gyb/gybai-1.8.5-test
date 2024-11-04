import React, { useState } from 'react';
import { ChevronLeft, Edit2, Save, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResumeSection {
  id: string;
  title: string;
  content: string[];
}

const Resume: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([
    {
      id: '1',
      title: 'Professional Summary',
      content: ['Experienced software developer with a passion for creating efficient and scalable applications.']
    },
    {
      id: '2',
      title: 'Work Experience',
      content: [
        'Senior Developer at Tech Co. (2018-Present)',
        'Full Stack Developer at Web Solutions Inc. (2015-2018)'
      ]
    },
    {
      id: '3',
      title: 'Education',
      content: ['Bachelor of Science in Computer Science, University of Technology (2011-2015)']
    },
    {
      id: '4',
      title: 'Skills',
      content: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git']
    }
  ]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSectionUpdate = (id: string, field: 'title' | 'content', value: string | string[]) => {
    setResumeSections(prevSections =>
      prevSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleAddSection = () => {
    const newSection: ResumeSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: ['']
    };
    setResumeSections([...resumeSections, newSection]);
  };

  const handleDeleteSection = (id: string) => {
    setResumeSections(prevSections => prevSections.filter(section => section.id !== id));
  };

  const handleAddContent = (sectionId: string) => {
    setResumeSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, content: [...section.content, ''] }
          : section
      )
    );
  };

  const handleDeleteContent = (sectionId: string, contentIndex: number) => {
    setResumeSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, content: section.content.filter((_, index) => index !== contentIndex) }
          : section
      )
    );
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/settings" className="mr-4 text-navy-blue">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">Professional Resume</h1>
          </div>
          <button
            onClick={handleEditToggle}
            className="bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
          >
            {isEditing ? <><Save size={20} className="mr-2" /> Save</> : <><Edit2 size={20} className="mr-2" /> Edit</>}
          </button>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          {resumeSections.map((section) => (
            <div key={section.id} className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionUpdate(section.id, 'title', e.target.value)}
                    className="text-2xl font-bold bg-transparent border-b border-navy-blue focus:outline-none"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                )}
                {isEditing && (
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <ul className="list-disc list-inside space-y-2">
                {section.content.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newContent = [...section.content];
                            newContent[index] = e.target.value;
                            handleSectionUpdate(section.id, 'content', newContent);
                          }}
                          className="flex-grow bg-transparent border-b border-gray-300 focus:outline-none"
                        />
                        <button
                          onClick={() => handleDeleteContent(section.id, index)}
                          className="ml-2 text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <button
                  onClick={() => handleAddContent(section.id)}
                  className="mt-2 text-navy-blue hover:text-blue-600 flex items-center"
                >
                  <Plus size={16} className="mr-1" /> Add Item
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              onClick={handleAddSection}
              className="mt-4 bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
            >
              <Plus size={20} className="mr-2" /> Add Section
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
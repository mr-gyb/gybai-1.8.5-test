import React, { useState } from 'react';
import { ChevronLeft, Plus, X, Edit2, Save, Move } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  who: string;
  what: string;
  where: string;
  when: string;
  why: string;
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Project 1',
      description: 'Description 1',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      who: 'Team A',
      what: 'Developed a new software solution',
      where: 'San Francisco',
      when: 'January 2023',
      why: 'To improve productivity'
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Description 2',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      who: 'Team B',
      what: 'Launched a marketing campaign',
      where: 'New York',
      when: 'March 2023',
      why: 'To increase brand awareness'
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProject, setNewProject] = useState<PortfolioItem>({
    id: '',
    title: '',
    description: '',
    image: '',
    who: '',
    what: '',
    where: '',
    when: '',
    why: ''
  });
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditingItem(null);
  };

  const handleNewProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setPortfolioItems([{ ...newProject, id }, ...portfolioItems]);
    setNewProject({
      id: '',
      title: '',
      description: '',
      image: '',
      who: '',
      what: '',
      where: '',
      when: '',
      why: ''
    });
    setShowNewProjectForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !isEditing) return;

    const items = Array.from(portfolioItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPortfolioItems(items);
  };

  const handleItemEdit = (id: string) => {
    setEditingItem(id);
  };

  const handleItemUpdate = (id: string, field: keyof PortfolioItem, value: string) => {
    setPortfolioItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleItemDelete = (id: string) => {
    setPortfolioItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/settings" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Creative Portfolio</h1>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-lg">Here you can edit and manage your creative portfolio.</p>
            <button
              onClick={handleEditToggle}
              className="bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
            >
              {isEditing ? <><Save size={20} className="mr-2" /> Save</> : <><Edit2 size={20} className="mr-2" /> Edit</>}
            </button>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="portfolio">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {portfolioItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!isEditing}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-gray-100 p-4 rounded-lg ${snapshot.isDragging ? 'shadow-lg' : 'shadow'}`}
                          onDoubleClick={() => isEditing && handleItemEdit(item.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                              <div>
                                {editingItem === item.id ? (
                                  <>
                                    <input
                                      type="text"
                                      value={item.title}
                                      onChange={(e) => handleItemUpdate(item.id, 'title', e.target.value)}
                                      className="text-xl font-semibold mb-1 w-full"
                                    />
                                    <textarea
                                      value={item.description}
                                      onChange={(e) => handleItemUpdate(item.id, 'description', e.target.value)}
                                      className="text-gray-600 mb-2 w-full"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                  </>
                                )}
                                <div className="mt-2 space-y-1">
                                  {['who', 'what', 'where', 'when', 'why'].map((field) => (
                                    <div key={field}>
                                      <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
                                      {editingItem === item.id ? (
                                        <input
                                          type="text"
                                          value={item[field as keyof PortfolioItem]}
                                          onChange={(e) => handleItemUpdate(item.id, field as keyof PortfolioItem, e.target.value)}
                                          className="ml-2 w-full"
                                        />
                                      ) : (
                                        <span className="ml-2">{item[field as keyof PortfolioItem]}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {isEditing && (
                              <div className="flex items-center">
                                <div {...provided.dragHandleProps} className="cursor-move">
                                  <Move size={20} className="text-gray-500 hover:text-navy-blue" />
                                </div>
                                <button
                                  onClick={() => handleItemDelete(item.id)}
                                  className="ml-2 text-red-500 hover:text-red-600"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {!showNewProjectForm && (
            <button
              onClick={() => setShowNewProjectForm(true)}
              className="bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
            >
              <Plus size={20} className="mr-2" /> Add New Project
            </button>
          )}
          {showNewProjectForm && (
            <form onSubmit={handleNewProjectSubmit} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleInputChange}
                  placeholder="Project Title"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  placeholder="Project Description"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="image"
                  value={newProject.image}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="who"
                  value={newProject.who}
                  onChange={handleInputChange}
                  placeholder="Who was involved?"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="what"
                  value={newProject.what}
                  onChange={handleInputChange}
                  placeholder="What was accomplished?"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="where"
                  value={newProject.where}
                  onChange={handleInputChange}
                  placeholder="Where did it take place?"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="when"
                  value={newProject.when}
                  onChange={handleInputChange}
                  placeholder="When did it happen?"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="why"
                  value={newProject.why}
                  onChange={handleInputChange}
                  placeholder="Why was it important?"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectForm(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-blue text-white rounded hover:bg-opacity-90"
                >
                  Add Project
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
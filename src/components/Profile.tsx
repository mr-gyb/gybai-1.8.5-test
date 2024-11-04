import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Link as LinkIcon, Mail, Edit, Check, Image, MessageCircle, Star, Film, Plus, X, Camera, MoreVertical, ChevronUp, ChevronDown, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ContentItem {
  id: string;
  type: 'cover' | 'profile' | 'image' | 'video' | 'audio';
  src: string;
  alt?: string;
  thumbnail?: string;
  createdAt: string;
  description: string;
}

const Profile: React.FC = () => {
  const { userData, updateUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [portfolioItems, setPortfolioItems] = useState([
    { id: '1', title: 'Project 1', description: 'Description 1', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80' },
    { id: '2', title: 'Project 2', description: 'Description 2', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80' },
  ]);
  const [activityFeed, setActivityFeed] = useState([
    { id: '1', content: 'Updated profile picture', timestamp: '2 hours ago' },
    { id: '2', content: 'Added a new project', timestamp: '1 day ago' },
  ]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [magnifiedContentIndex, setMagnifiedContentIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const magnifiedContentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editedBio, setEditedBio] = useState(userData?.bio || '');
  const [editedLocation, setEditedLocation] = useState(userData?.location || '');
  const [editedWebsite, setEditedWebsite] = useState(userData?.website || '');
  const [editedJoinDate, setEditedJoinDate] = useState(userData?.joinDate || '');
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    { id: '0', type: 'cover', src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", alt: 'Cover Image', createdAt: '2023-05-01', description: 'Profile cover image showcasing my work environment' },
    { id: '1', type: 'profile', src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80", alt: 'Profile Image', createdAt: '2023-05-01', description: 'Professional headshot for my profile' },
    { id: '2', type: 'image', src: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Tech workspace', createdAt: '2023-05-15', description: 'My organized tech workspace where I create and innovate' },
    { id: '3', type: 'image', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Natural landscape', createdAt: '2023-05-20', description: 'Inspiring natural landscape from my recent hiking trip' },
    { id: '4', type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Technology hardware', createdAt: '2023-05-25', description: 'Latest tech gadgets I use for my projects' },
    { id: '5', type: 'video', src: 'https://example.com/video1.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', createdAt: '2023-06-01', description: 'Video tutorial on web development best practices' },
    { id: '6', type: 'audio', src: 'https://example.com/audio1.mp3', thumbnail: 'https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', createdAt: '2023-06-05', description: 'Podcast episode discussing the future of AI in business' },
  ]);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (magnifiedContentRef.current && magnifiedContentIndex !== null && !isScrolling) {
        e.preventDefault();
        setIsScrolling(true);
        const direction = e.deltaY > 0 ? 1 : -1;
        const newIndex = (magnifiedContentIndex + direction + contentItems.length) % contentItems.length;
        setSelectedContent(contentItems[newIndex]);
        setMagnifiedContentIndex(newIndex);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [magnifiedContentIndex, isScrolling, contentItems]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedBio(userData?.bio || '');
      setEditedLocation(userData?.location || '');
      setEditedWebsite(userData?.website || '');
      setEditedJoinDate(userData?.joinDate || '');
    }
  };

  const handleSaveChanges = () => {
    updateUserData({
      bio: editedBio,
      location: editedLocation,
      website: editedWebsite,
      joinDate: editedJoinDate,
    });
    setIsEditing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem: ContentItem = {
          id: Date.now().toString(),
          type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'audio',
          src: e.target?.result as string,
          alt: file.name,
          createdAt: new Date().toISOString(),
          description: 'New uploaded content',
        };
        setContentItems((prevItems) => [...prevItems, newItem]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !isEditing) return;

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (result.type === 'contentItems') {
      setContentItems(reorder(contentItems, result.source.index, result.destination.index));
    } else if (result.type === 'portfolioItems') {
      setPortfolioItems(reorder(portfolioItems, result.source.index, result.destination.index));
    } else if (result.type === 'activityFeed') {
      setActivityFeed(reorder(activityFeed, result.source.index, result.destination.index));
    }
  };

  const handleContentClick = (item: ContentItem, index: number) => {
    setSelectedContent(item);
    setMagnifiedContentIndex(index);
  };

  const closeModal = () => {
    setSelectedContent(null);
    setMagnifiedContentIndex(null);
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'beginner': return 'border-red-500 text-red-500';
      case 'intermediate': return 'border-orange-500 text-orange-500';
      case 'proficient': return 'border-blue-500 text-blue-500';
      case 'advanced': return 'border-green-500 text-green-500';
      case 'expert': return 'border-yellow-400 text-yellow-400';
      default: return 'border-gray-300 text-gray-300';
    }
  };

  const getExperienceNumber = (level: string) => {
    switch (level) {
      case 'beginner': return 1;
      case 'intermediate': return 2;
      case 'proficient': return 3;
      case 'advanced': return 4;
      case 'expert': return 5;
      default: return 0;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleEditSection = (section: string) => {
    setEditingSection(section);
  };

  const handleSaveSection = () => {
    setEditingSection(null);
  };

  return (
    <div className="bg-white min-h-screen">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="relative">
          <Droppable droppableId="cover" direction="horizontal" type="contentItems">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-32 bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${contentItems[0].src})` }}
                onClick={() => handleContentClick(contentItems[0], 0)}
              >
                {isEditing && (
                  <Draggable draggableId={contentItems[0].id} index={0}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
                      >
                        Drag to reorder cover image
                      </div>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <Droppable droppableId="profile" direction="horizontal" type="contentItems">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-24 h-24 rounded-full border-4 ${getExperienceColor(userData?.experience || 'beginner')} overflow-hidden cursor-pointer`}
                  onClick={() => handleContentClick(contentItems[1], 1)}
                >
                  <img
                    src={contentItems[1].src}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <Draggable draggableId={contentItems[1].id} index={1}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full"
                        >
                          Drag
                        </div>
                      )}
                    </Draggable>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {renderStars(userData?.rating || 0)}
          </div>
        </div>

        <div className="mt-16 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{userData?.name || 'User Name'}</h1>
              <p className="text-gray-600 flex items-center">
                {userData?.username || '@username'}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getExperienceColor(userData?.experience || 'beginner')}`}>
                  {getExperienceNumber(userData?.experience || 'beginner')}
                </span>
              </p>
            </div>
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="bg-navy-blue text-white px-4 py-2 rounded-full flex items-center"
              >
                <Save size={20} className="mr-2" />
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="border border-navy-blue text-navy-blue px-4 py-2 rounded-full flex items-center"
              >
                <Edit size={20} className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              className="mt-2 w-full p-2 border rounded"
              rows={3}
              placeholder="Enter your bio"
            />
          ) : (
            <p className="mt-2">{userData?.bio || 'No bio available'}</p>
          )}

          <div className="flex flex-wrap gap-y-2 mt-2 text-gray-600">
            <span className="flex items-center mr-4">
              <MapPin size={16} className="mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Enter location"
                />
              ) : (
                editedLocation || 'Location not set'
              )}
            </span>
            <span className="flex items-center mr-4">
              <LinkIcon size={16} className="mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedWebsite}
                  onChange={(e) => setEditedWebsite(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Enter website URL"
                />
              ) : (
                <a href={editedWebsite} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {editedWebsite || 'Website not set'}
                </a>
              )}
            </span>
            <span className="flex items-center mr-4">
              <Calendar size={16} className="mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedJoinDate}
                  onChange={(e) => setEditedJoinDate(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Enter join date"
                />
              ) : (
                editedJoinDate || 'Join date not available'
              )}
            </span>
          </div>

          <div className="flex mt-4 space-x-4">
            <span><strong>{userData?.following || 0}</strong> Following</span>
            <span><strong>{userData?.followers || 0}</strong> Followers</span>
          </div>

          <div className="flex border-b mt-4">
            {['Posts', 'Subs', 'Highlights', 'Media'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${activeTab === tab.toLowerCase() ? 'border-b-2 border-navy-blue' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeTab === 'posts' && (
              <Droppable droppableId="posts" direction="horizontal" type="contentItems">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-3 gap-1"
                  >
                    {contentItems.slice(2).map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index + 2} isDragDisabled={!isEditing}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...(isEditing ? provided.dragHandleProps : {})}
                            className={`relative aspect-square cursor-pointer ${
                              snapshot.isDragging ? 'z-10' : ''
                            }`}
                            onClick={() => handleContentClick(item, index + 2)}
                          >
                            <img src={item.type === 'image' ? item.src : item.thumbnail} alt={item.alt || ''} className="w-full h-full object-cover" />
                            {item.type !== 'image' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                {item.type === 'video' && <Film size={24} className="text-white" />}
                                {item.type === 'audio' && <MessageCircle size={24} className="text-white" />}
                              </div>
                            )}
                            {isEditing && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity">
                                Drag to reorder
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {isEditing && (
                      <div
                        className="aspect-square bg-gray-200 flex items-center justify-center cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Plus size={24} className="text-gray-600" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileUpload}
                          accept="image/*,video/*,audio/*"
                        />
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            )}
            {activeTab === 'subs' && (
              <div className="mt-4 bg-gray-100 p-6 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Unlock more with Subscriptions</h2>
                <p className="text-lg mb-6">
                  @{userData?.username || 'username'} has shared 9 Subscriber-only posts. Subscribe to see their exclusive posts and bonus content.
                </p>
                {editingSection === 'subs' ? (
                  <div>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      rows={4}
                      placeholder="Edit subscription details"
                    ></textarea>
                    <button
                      onClick={handleSaveSection}
                      className="bg-navy-blue text-white px-4 py-2 rounded-full"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="bg-navy-blue text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300">
                      Subscribe
                    </button>
                    {isEditing && (
                      <button
                        onClick={() => handleEditSection('subs')}
                        className="ml-4 text-navy-blue underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'highlights' && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Timeline Diagram</h2>
                {editingSection === 'highlights' ? (
                  <div>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      rows={4}
                      placeholder="Edit highlights"
                    ></textarea>
                    <button
                      onClick={handleSaveSection}
                      className="bg-navy-blue text-white px-4 py-2 rounded-full"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
                      <div className="flex justify-between items-center">
                        {[2000, 2020, 2040].map((year, index) => (
                          <div key={year} className="relative flex flex-col items-center">
                            <div className="w-4 h-4 bg-navy-blue rounded-full mb-2"></div>
                            <span className="text-lg font-semibold">{year}</span>
                            <p className="text-sm text-gray-600 mt-2 text-center max-w-[100px]">
                              Briefly elaborate on what you want to discuss.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleEditSection('highlights')}
                        className="mt-4 text-navy-blue underline"
                      >
                        Edit Highlights
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'media' && (
              <div className="grid grid-cols-3 gap-1">
                {contentItems.filter(item => item.type === 'video' || item.type === 'audio').map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer"
                    onClick={() => handleContentClick(item, contentItems.indexOf(item))}
                  >
                    <img src={item.thumbnail} alt={item.alt || ''} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      {item.type === 'video' && <Film size={24} className="text-white" />}
                      {item.type === 'audio' && <MessageCircle size={24} className="text-white" />}
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <div
                    className="aspect-square bg-gray-200 flex items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus size={24} className="text-gray-600" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="video/*,audio/*"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 px-4">
          <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
          <Droppable droppableId="portfolio" type="portfolioItems">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!isEditing}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...(isEditing ? provided.dragHandleProps : {})}
                        className={`bg-gray-100 rounded-lg overflow-hidden ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                      >
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{item.title}</h3>
                            {isEditing && (
                              <MoreVertical size={16} className="cursor-move" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="mt-6 px-4">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <Droppable droppableId="activity" type="activityFeed">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {activityFeed.map((activity, index) => (
                  <Draggable key={activity.id} draggableId={activity.id} index={index} isDragDisabled={!isEditing}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...(isEditing ? provided.dragHandleProps : {})}
                        className={`bg-gray-100 rounded-lg p-4 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p>{activity.content}</p>
                            <span className="text-sm text-gray-500">{activity.timestamp}</span>
                          </div>
                          {isEditing && (
                            <MoreVertical size={16} className="cursor-move" />
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
        </div>
      </DragDropContext>

      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div 
            className="w-4/5 max-w-4xl max-h-screen overflow-y-auto bg-white rounded-lg p-8" 
            ref={magnifiedContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="w-full h-full flex flex-col items-center justify-center">
              {selectedContent.type === 'image' || selectedContent.type === 'cover' || selectedContent.type === 'profile' ? (
                <img src={selectedContent.src} alt={selectedContent.alt} className="max-w-full max-h-[60vh] object-contain mb-6" />
              ) : selectedContent.type === 'video' ? (
                <video src={selectedContent.src} controls className="max-w-full max-h-[60vh] mb-6" />
              ) : selectedContent.type === 'audio' ? (
                <audio src={selectedContent.src} controls className="w-full mb-6" />
              ) : null}
              <div className="w-full text-left">
                <h3 className="text-2xl font-bold mb-2">{selectedContent.alt || 'Content Details'}</h3>
                <p className="text-gray-600 mb-4">{selectedContent.description}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>Created on:{selectedContent.createdAt}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => {
                  if (magnifiedContentIndex !== null) {
                    const newIndex = (magnifiedContentIndex - 1 + contentItems.length) % contentItems.length;
                    setSelectedContent(contentItems[newIndex]);
                    setMagnifiedContentIndex(newIndex);
                  }
                }}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronUp size={24} />
              </button>
              <button
                onClick={() => {
                  if (magnifiedContentIndex !== null) {
                    const newIndex = (magnifiedContentIndex + 1) % contentItems.length;
                    setSelectedContent(contentItems[newIndex]);
                    setMagnifiedContentIndex(newIndex);
                  }
                }}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
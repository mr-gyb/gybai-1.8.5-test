import React, { useState, useEffect } from 'react';
import { ChevronLeft, List, Map, Star, Filter, Newspaper, ExternalLink, Play, Headphones, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  name: string;
  username: string;
  category: string;
  experience: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
  rating: number;
  profileImage: string;
  coverImage: string;
  lat: number;
  lng: number;
}

interface FilterOptions {
  experience: string[];
  contentType: string[];
  minRating: number;
  userCategory: string[];
}

interface Post {
  id: number;
  userId: number;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'photo' | 'video' | 'audio' | 'written';
  mediaUrl?: string;
}

const GYBLiveNetwork: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'news'>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    experience: [],
    contentType: [],
    minRating: 0,
    userCategory: [],
  });
  const [sortBy, setSortBy] = useState<'recent' | 'relevant'>('recent');
  const [visiblePosts, setVisiblePosts] = useState(5);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', icon: '👥', label: 'All' },
    { id: 'videographers', icon: '🎥', label: 'Videographers' },
    { id: 'writers', icon: '✍️', label: 'Writers' },
    { id: 'coders', icon: '💻', label: 'Coders' },
    { id: 'designers', icon: '🎨', label: 'Designers' },
    { id: 'marketers', icon: '📊', label: 'Marketers' },
  ];

  const users: UserData[] = [
    { id: 1, name: 'Alice Johnson', username: '@alice_j', category: 'videographers', experience: 'expert', lat: 40.7128, lng: -74.0060, rating: 4.8, profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 2, name: 'Bob Smith', username: '@bob_writes', category: 'writers', experience: 'intermediate', lat: 40.7282, lng: -73.7949, rating: 4.2, profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 3, name: 'Charlie Brown', username: '@charlie_codes', category: 'coders', experience: 'beginner', lat: 40.7489, lng: -73.9680, rating: 3.9, profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 4, name: 'Diana Miller', username: '@diana_designs', category: 'designers', experience: 'advanced', lat: 40.6782, lng: -73.9442, rating: 4.7, profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 5, name: 'Eva Martinez', username: '@eva_markets', category: 'marketers', experience: 'proficient', lat: 40.7831, lng: -73.9712, rating: 4.5, profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
  ];

  const posts: Post[] = [
    { id: 1, userId: 1, content: "Just finished editing an amazing video! Can't wait to share it with you all.", timestamp: "2023-04-15T14:30:00Z", likes: 24, comments: 5, type: 'video', mediaUrl: 'https://example.com/video1.mp4' },
    { id: 2, userId: 2, content: "Working on a new article about AI in content creation. Any thoughts or experiences to share?", timestamp: "2023-04-15T13:45:00Z", likes: 18, comments: 7, type: 'written' },
    { id: 3, userId: 3, content: "Debugging is like being the detective in a crime movie where you're also the murderer.", timestamp: "2023-04-15T12:15:00Z", likes: 42, comments: 12, type: 'photo', mediaUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, userId: 4, content: "New logo design just approved by the client! Swipe to see the before and after.", timestamp: "2023-04-15T11:00:00Z", likes: 56, comments: 8, type: 'photo', mediaUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 5, userId: 5, content: "Analyzing the latest marketing trends. What's working for your business right now?", timestamp: "2023-04-15T10:30:00Z", likes: 31, comments: 15, type: 'audio', mediaUrl: 'https://example.com/audio1.mp3' },
  ];

  const filteredUsers = users.filter(user => {
    if (selectedCategory !== 'all' && user.category !== selectedCategory) return false;
    if (filters.experience.length > 0 && !filters.experience.includes(user.experience)) return false;
    if (user.rating < filters.minRating) return false;
    if (filters.userCategory.length > 0 && !filters.userCategory.includes(user.category)) return false;
    return true;
  });

  const handleUserClick = (user: UserData) => {
    navigate(`/user-profile/${user.id}`, { state: user });
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'beginner': return 'border-red-500';
      case 'intermediate': return 'border-orange-500';
      case 'proficient': return 'border-blue-500';
      case 'advanced': return 'border-green-500';
      case 'expert': return 'border-yellow-400';
      default: return 'border-gray-300';
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
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (filterType: keyof FilterOptions, value: string | number) => {
    setFilters(prevFilters => {
      if (filterType === 'minRating') {
        return { ...prevFilters, [filterType]: value };
      } else {
        const updatedFilter = prevFilters[filterType].includes(value as string)
          ? prevFilters[filterType].filter(item => item !== value)
          : [...prevFilters[filterType], value as string];
        return { ...prevFilters, [filterType]: updatedFilter };
      }
    });
  };

  const handleSortChange = (newSortBy: 'recent' | 'relevant') => {
    setSortBy(newSortBy);
  };

  const loadMorePosts = () => {
    setVisiblePosts(prevVisible => prevVisible + 5);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMorePosts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      // For 'relevant', we'll use a combination of likes and comments as a simple relevance score
      const relevanceA = a.likes + a.comments;
      const relevanceB = b.likes + b.comments;
      return relevanceB - relevanceA;
    }
  });

  return (
    <div className="bg-white min-h-screen text-navy-blue flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-navy-blue">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">GYB-Live Network</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'}`}
            >
              <List size={24} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded ${viewMode === 'map' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'}`}
            >
              <Map size={24} />
            </button>
            <button
              onClick={() => setViewMode('news')}
              className={`p-2 rounded ${viewMode === 'news' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'}`}
            >
              <Newspaper size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4">
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleUserClick(user)}
              >
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverImage})` }}></div>
                <div className="p-4 relative">
                  <div className="absolute -top-12 left-4">
                    <div className={`w-24 h-24 rounded-full border-4 ${getExperienceColor(user.experience)} overflow-hidden`}>
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="mt-14">
                    <h3 className="font-bold text-xl">{user.name}</h3>
                    <p className="text-gray-600 mb-2">{user.username}</p>
                    <p className="text-gray-600 mb-2">{user.category}</p>
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 rounded-full ${getExperienceColor(user.experience)} flex items-center justify-center font-bold mr-2`}>
                        {getExperienceNumber(user.experience)}
                      </div>
                      <span className="text-sm">{user.experience}</span>
                    </div>
                    {renderStars(user.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {viewMode === 'map' && (
          <div className="bg-gray-200 rounded-lg h-[calc(100vh-200px)] relative shadow-md">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-navy-blue text-2xl font-bold">Map View (Placeholder)</p>
            </div>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`absolute w-8 h-8 rounded-full ${getExperienceColor(user.experience)} flex items-center justify-center font-bold cursor-pointer`}
                style={{
                  left: `${(user.lng + 74.1) * 100}%`,
                  top: `${(40.9 - user.lat) * 100}%`,
                }}
                title={`${user.name} (${user.category})`}
                onClick={() => handleUserClick(user)}
              >
                {getExperienceNumber(user.experience)}
              </div>
            ))}
          </div>
        )}
        {viewMode === 'news' && (
          <div className="space-y-4">
            {sortedPosts.slice(0, visiblePosts).map((post) => {
              const user = users.find(u => u.id === post.userId);
              if (!user) return null;
              return (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out hover:shadow-lg">
                  <div className="flex items-center mb-2">
                    <div 
                      className={`w-12 h-12 rounded-full border-2 ${getExperienceColor(user.experience)} overflow-hidden cursor-pointer mr-3`}
                      onClick={() => handleUserClick(user)}
                    >
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold cursor-pointer" onClick={() => handleUserClick(user)}>{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.username}</p>
                    </div>
                    <div className="ml-auto">
                      {renderStars(user.rating)}
                    </div>
                  </div>
                  <p className="mb-2">{post.content}</p>
                  {post.type === 'photo' && post.mediaUrl && (
                    <img src={post.mediaUrl} alt="Post content" className="w-full h-64 object-cover rounded-lg mb-2" />
                  )}
                  {post.type === 'video' && post.mediaUrl && (
                    <div className="relative w-full h-64 mb-2">
                      <video src={post.mediaUrl} className="w-full h-full object-cover rounded-lg" controls />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play size={48} className="text-white opacity-75" />
                      </div>
                    </div>
                  )}
                  {post.type === 'audio' && post.mediaUrl && (
                    <div className="w-full mb-2">
                      <audio src={post.mediaUrl} className="w-full" controls />
                    </div>
                  )}
                  {post.type === 'written' && (
                    <div className="flex items-center text-blue-500 mb-2">
                      <FileText size={20} className="mr-2" />
                      <span>Read full article</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{new Date(post.timestamp).toLocaleString()}</span>
                    <div>
                      <span className="mr-2">{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
            {visiblePosts < posts.length && (
              <button
                onClick={loadMorePosts}
                className="w-full py-2 bg-gray-200 text-navy-blue rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={toggleFilter}
          className="bg-navy-blue text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <Filter size={24} />
        </button>
        {isFilterOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 max-h-96 overflow-y-auto">
            <h3 className="font-bold mb-2">Filters</h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Experience Level</h4>
              {['beginner', 'intermediate', 'proficient', 'advanced', 'expert'].map((exp) => (
                <label key={exp} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={filters.experience.includes(exp)}
                    onChange={() => handleFilterChange('experience', exp)}
                    className="mr-2"
                  />
                  {exp.charAt(0).toUpperCase() + exp.slice(1)}
                </label>
              ))}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Content Type</h4>
              {['video', 'photo', 'audio', 'written'].map((type) => (
                <label key={type} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={filters.contentType.includes(type)}
                    onChange={() => handleFilterChange('contentType', type)}
                    className="mr-2"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">User Category</h4>
              {categories.filter(cat => cat.id !== 'all').map((cat) => (
                <label key={cat.id} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={filters.userCategory.includes(cat.id)}
                    onChange={() => handleFilterChange('userCategory', cat.id)}
                    className="mr-2"
                  />
                  {cat.label}
                </label>
              ))}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Minimum Rating</h4>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                className="w-full"
              />
              <span>{filters.minRating.toFixed(1)}</span>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Sort By</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSortChange('recent')}
                  className={`px-3 py-1 rounded-full ${
                    sortBy === 'recent' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
                  } transition-colors duration-300`}
                >
                  Most Recent
                </button>
                <button
                  onClick={() => handleSortChange('relevant')}
                  className={`px-3 py-1 rounded-full ${
                    sortBy === 'relevant' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'
                  } transition-colors duration-300`}
                >
                  Most Relevant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GYBLiveNetwork;
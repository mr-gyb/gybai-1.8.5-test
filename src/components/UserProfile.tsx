import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Link as LinkIcon, Mail, Image, MessageCircle, Star, Film, ChevronLeft, X, RotateCw, Briefcase, FileText, ChevronUp, ChevronDown, Clock, HelpCircle, Users, ExternalLink } from 'lucide-react';
import { useParams, useLocation, Link } from 'react-router-dom';

interface UserData {
  id: number;
  name: string;
  username: string;
  category: string;
  experience: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
  rating: number;
  profileImage: string;
  coverImage: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  following: number;
  followers: number;
}

interface ContentItem {
  type: 'cover' | 'profile' | 'image' | 'video' | 'audio';
  src: string;
  alt?: string;
  thumbnail?: string;
  createdAt: string;
  description: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [magnifiedContentIndex, setMagnifiedContentIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const magnifiedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userDataFromLocation = location.state as UserData;
    if (userDataFromLocation) {
      setUserData(userDataFromLocation);
    } else {
      // Fallback to fetching user data if not provided in location state
      fetchUserData();
    }
  }, [location, userId]);

  const fetchUserData = () => {
    // Simulating API call to fetch user data
    const data: UserData = {
      id: parseInt(userId || '0'),
      name: 'John Doe',
      username: '@johndoe',
      category: 'Designer',
      experience: 'advanced',
      rating: 4.8,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      bio: 'Passionate designer with a keen eye for detail and a love for creating beautiful, functional interfaces.',
      location: 'San Francisco, CA',
      website: 'https://johndoe.design',
      joinDate: 'April 2021',
      following: 250,
      followers: 1000,
    };
    setUserData(data);
  };

  const contentItems: ContentItem[] = [
    { type: 'cover', src: userData?.coverImage || '', alt: 'Cover Image', createdAt: '2023-05-01', description: 'Profile cover image showcasing my work environment' },
    { type: 'profile', src: userData?.profileImage || '', alt: 'Profile Image', createdAt: '2023-05-01', description: 'Professional headshot for my profile' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Tech workspace', createdAt: '2023-05-15', description: 'My organized tech workspace where I create and innovate' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Natural landscape', createdAt: '2023-05-20', description: 'Inspiring natural landscape from my recent hiking trip' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', alt: 'Technology hardware', createdAt: '2023-05-25', description: 'Latest tech gadgets I use for my projects' },
    { type: 'video', src: 'https://example.com/video1.mp4', thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', createdAt: '2023-06-01', description: 'Video tutorial on web development best practices' },
    { type: 'audio', src: 'https://example.com/audio1.mp3', thumbnail: 'https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80', createdAt: '2023-06-05', description: 'Podcast episode discussing the future of AI in business' },
  ];

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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link to="/gyb-live-network" className="flex items-center text-navy-blue mb-4">
          <ChevronLeft size={24} className="mr-2" />
          Back to GYB Live Network
        </Link>
        <div className="relative">
          <div 
            className="h-32 bg-cover bg-center cursor-pointer" 
            style={{ backgroundImage: `url(${userData.coverImage})` }}
          ></div>
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <div 
              className={`w-24 h-24 rounded-full border-4 ${getExperienceColor(userData.experience)} overflow-hidden cursor-pointer`}
            >
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {renderStars(userData.rating)}
          </div>
        </div>

        <div className="mt-20 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-600 flex items-center">
                {userData.username}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getExperienceColor(userData.experience)}`}>
                  {getExperienceNumber(userData.experience)}
                </span>
              </p>
            </div>
          </div>

          <p className="mt-2">{userData.bio}</p>

          <div className="flex flex-wrap gap-y-2 mt-2 text-gray-600">
            <span className="flex items-center mr-4">
              <MapPin size={16} className="mr-1" />
              {userData.location}
            </span>
            <span className="flex items-center mr-4">
              <LinkIcon size={16} className="mr-1" />
              <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {userData.website}
              </a>
              <a href={userData.website} target="_blank" rel="noopener noreferrer" className="ml-1">
                <ExternalLink size={14} className="text-navy-blue" />
              </a>
            </span>
            <span className="flex items-center mr-4">
              <Calendar size={16} className="mr-1" />
              Joined {userData.joinDate}
            </span>
          </div>

          <div className="flex mt-4 space-x-4">
            <span><strong>{userData.following}</strong> Following</span>
            <span><strong>{userData.followers}</strong> Followers</span>
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
              <div className="grid grid-cols-3 gap-1">
                {contentItems.slice(2).map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer"
                    onClick={() => {
                      setSelectedContent(item);
                      setMagnifiedContentIndex(index + 2);
                    }}
                  >
                    <img src={item.type === 'image' ? item.src : item.thumbnail} alt={item.alt || ''} className="w-full h-full object-cover" />
                    {item.type !== 'image' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        {item.type === 'video' && <Film size={24} className="text-white" />}
                        {item.type === 'audio' && <MessageCircle size={24} className="text-white" />}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'subs' && (
              <div className="mt-4 bg-gray-100 p-6 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Unlock more with Subscriptions</h2>
                <p className="text-lg mb-6">
                  {userData.username} has shared 9 Subscriber-only posts. Subscribe to see their exclusive posts and bonus content.
                </p>
                <button className="bg-navy-blue text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300">
                  Subscribe
                </button>
              </div>
            )}
            {activeTab === 'highlights' && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Timeline Diagram</h2>
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
              </div>
            )}
            {activeTab === 'media' && (
              <div className="grid grid-cols-3 gap-1">
                {contentItems.filter(item => item.type === 'video' || item.type === 'audio').map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer"
                    onClick={() => {
                      setSelectedContent(item);
                      setMagnifiedContentIndex(contentItems.indexOf(item));
                    }}
                  >
                    <img src={item.thumbnail} alt={item.alt || ''} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      {item.type === 'video' && <Film size={24} className="text-white" />}
                      {item.type === 'audio' && <MessageCircle size={24} className="text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedContent(null)}>
          <div 
            className="w-4/5 max-w-4xl max-h-screen overflow-y-auto bg-white rounded-lg p-8" 
            ref={magnifiedContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedContent(null)}
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
                  <Clock size={16} className="mr-2" />
                  <span>Created on: {selectedContent.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
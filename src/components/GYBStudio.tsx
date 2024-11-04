import React, { useState } from 'react';
import { ChevronLeft, Settings, ChevronDown, Play, Bookmark, Star, DollarSign, TrendingUp, Users, ThumbsUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const GYBStudio: React.FC = () => {
  const navigate = useNavigate();
  const [postType, setPostType] = useState('Posts');
  const [topicFilter, setTopicFilter] = useState('All topics');
  const [locationFilter, setLocationFilter] = useState('United States');

  const handleViewAllAnalytics = () => {
    navigate('/analytics');
  };

  const handleViewAllMonetization = () => {
    navigate('/monetization');
  };

  const handleViewAllInspirations = () => {
    navigate('/inspirations');
  };

  const trendingPosts = [
    {
      id: 1,
      title: "BREAKING: The Menendez brothers are one step closer to freedom after L...",
      views: "72.3M",
      likes: "5.9M",
      image: "https://example.com/menendez-brothers.jpg"
    },
    {
      id: 2,
      title: "Wait 😂",
      views: "36.1M",
      likes: "6.3M",
      image: "https://example.com/wait-meme.jpg"
    },
    {
      id: 3,
      title: "Former President Barack Obama raps Eminem's \"Lose Yourself,\" after bei...",
      views: "40.1M",
      likes: "2.9M",
      image: "https://example.com/obama-rapping.jpg"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen text-navy-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/new-post" className="mr-4 text-navy-blue hover:text-blue-600 transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">GYB Studio</h1>
          </div>
          <Settings size={24} className="text-navy-blue hover:text-blue-600 cursor-pointer transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Analytics</h2>
              <button
                onClick={handleViewAllAnalytics}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp size={20} className="text-green-500 mr-2" />
                  <span>Post views</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">0% 7d</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users size={20} className="text-blue-500 mr-2" />
                  <span>Net followers</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">0% 7d</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUp size={20} className="text-red-500 mr-2" />
                  <span>Likes</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">0% 7d</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Monetization</h2>
              <button
                onClick={handleViewAllMonetization}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-yellow-400 mb-2" />
                <h3 className="text-sm font-semibold">Subscription</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-purple-500 mb-2" />
                <h3 className="text-sm font-semibold">Creator Rewards</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-green-500 mb-2" />
                <h3 className="text-sm font-semibold">Marketplace</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <DollarSign size={24} className="text-blue-500 mb-2" />
                <h3 className="text-sm font-semibold">Video Gifts</h3>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-1">Estimated rewards (last 7 days)</h3>
              <p className="text-2xl font-bold">$0.00</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">More tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-red-500 mb-2" />
                <h3 className="text-sm font-semibold">Account check</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-indigo-500 mb-2" />
                <h3 className="text-sm font-semibold">Creator Academy</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-orange-500 mb-2" />
                <h3 className="text-sm font-semibold">Activities</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Star size={24} className="text-teal-500 mb-2" />
                <h3 className="text-sm font-semibold">Promote</h3>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Creation inspirations</h2>
            <button
              onClick={handleViewAllInspirations}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="flex border-b mb-4">
            <button className="px-4 py-2 font-semibold border-b-2 border-navy-blue">Trending</button>
            <button className="px-4 py-2 text-gray-500 hover:text-navy-blue transition-colors">Recommended</button>
          </div>
          <div className="flex space-x-2 mb-4">
            <div className="relative">
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="appearance-none bg-gray-100 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue"
              >
                <option>Posts</option>
                <option>Videos</option>
                <option>Images</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="appearance-none bg-gray-100 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue"
              >
                <option>All topics</option>
                <option>Technology</option>
                <option>Entertainment</option>
                <option>Sports</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="appearance-none bg-gray-100 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-4">
            {trendingPosts.map((post, index) => (
              <div key={post.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-300">{index + 1}</div>
                <div className="relative flex-shrink-0 w-24 h-32">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                    <Play size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Play size={16} className="mr-1" />
                    <span className="mr-4">{post.views}</span>
                    <span>{post.likes}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-navy-blue transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GYBStudio;
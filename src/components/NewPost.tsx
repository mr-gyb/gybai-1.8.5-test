import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Paperclip, Mic, Send, Camera, Image as ImageIcon, Video, Plus, X, RefreshCw, Check, Share2, Play, Pause, Upload, Link as LinkIcon, FileText, Headphones, Edit2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingAnalyticsButton from './FloatingAnalyticsButton';

interface ContentItem {
  id: string;
  type: 'video' | 'photo' | 'audio' | 'written';
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  editsRemaining: number;
  approved: boolean;
}

interface Thumbnail {
  id: string;
  url: string;
  editsRemaining: number;
  approved: boolean;
}

interface Headline {
  id: string;
  text: string;
  editsRemaining: number;
  approved: boolean;
}

const GYBMedia: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['video', 'photo', 'audio', 'written']);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedContent, setUploadedContent] = useState<File | string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<ContentItem[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
  const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const navigate = useNavigate();

  const contentTypes = [
    { type: 'video', icon: Video, platforms: ['YouTube', 'Facebook', 'Instagram', 'TikTok'] },
    { type: 'photo', icon: ImageIcon, platforms: ['Instagram', 'Facebook', 'Twitter'] },
    { type: 'audio', icon: Headphones, platforms: ['Spotify', 'Apple Podcasts', 'Google Podcasts'] },
    { type: 'written', icon: FileText, platforms: ['Medium', 'LinkedIn', 'WordPress'] },
  ];

  useEffect(() => {
    // Initialize content items, headlines, and thumbnails
    const initialContent: ContentItem[] = [
      {
        id: '1',
        type: 'video',
        title: 'Product Demo Video',
        description: 'A comprehensive demo of our latest product features.',
        url: 'https://example.com/video1.mp4',
        thumbnail: 'https://picsum.photos/300/200?random=1',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '2',
        type: 'video',
        title: 'Customer Testimonial',
        description: 'Happy customer sharing their experience with our service.',
        url: 'https://example.com/video2.mp4',
        thumbnail: 'https://picsum.photos/300/200?random=2',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '3',
        type: 'video',
        title: 'Behind the Scenes',
        description: 'A look at our team and work process.',
        url: 'https://example.com/video3.mp4',
        thumbnail: 'https://picsum.photos/300/200?random=3',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '4',
        type: 'photo',
        title: 'Product Showcase',
        description: 'High-quality image of our flagship product.',
        url: 'https://picsum.photos/800/600?random=4',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '5',
        type: 'photo',
        title: 'Team Photo',
        description: 'Our amazing team at the annual retreat.',
        url: 'https://picsum.photos/800/600?random=5',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '6',
        type: 'photo',
        title: 'Office Space',
        description: 'A glimpse into our modern and collaborative workspace.',
        url: 'https://picsum.photos/800/600?random=6',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '7',
        type: 'audio',
        title: 'Product Update Podcast',
        description: 'Discussion about our latest features and updates.',
        url: 'https://example.com/audio1.mp3',
        thumbnail: 'https://picsum.photos/300/200?random=7',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '8',
        type: 'audio',
        title: 'Interview with CEO',
        description: 'Insights from our CEO about the company\'s vision and future.',
        url: 'https://example.com/audio2.mp3',
        thumbnail: 'https://picsum.photos/300/200?random=8',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '9',
        type: 'audio',
        title: 'Customer Success Story',
        description: 'A client shares how our product transformed their business.',
        url: 'https://example.com/audio3.mp3',
        thumbnail: 'https://picsum.photos/300/200?random=9',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '10',
        type: 'written',
        title: 'The Future of AI in Business',
        description: 'An in-depth article about AI trends and their impact on industries.',
        url: 'https://example.com/article1',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '11',
        type: 'written',
        title: '10 Tips for Productivity',
        description: 'Practical advice to boost your daily productivity and efficiency.',
        url: 'https://example.com/article2',
        editsRemaining: 3,
        approved: false,
      },
      {
        id: '12',
        type: 'written',
        title: 'Case Study: Successful Implementation',
        description: 'Detailed analysis of a successful project implementation.',
        url: 'https://example.com/article3',
        editsRemaining: 3,
        approved: false,
      },
    ];

    setGeneratedContent(initialContent);

    const initialHeadlines: Headline[] = [
      { id: '1', text: 'Revolutionizing the Industry: A New Approach', editsRemaining: 3, approved: false },
      { id: '2', text: '10 Ways to Boost Your Productivity Today', editsRemaining: 3, approved: false },
      { id: '3', text: 'The Future of Technology: What You Need to Know', editsRemaining: 3, approved: false },
    ];
    setHeadlines(initialHeadlines);

    const initialThumbnails: Thumbnail[] = [
      { id: '1', url: 'https://picsum.photos/300/200?random=10', editsRemaining: 3, approved: false },
      { id: '2', url: 'https://picsum.photos/300/200?random=11', editsRemaining: 3, approved: false },
      { id: '3', url: 'https://picsum.photos/300/200?random=12', editsRemaining: 3, approved: false },
    ];
    setThumbnails(initialThumbnails);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedContent(file);
    }
  };

  const handleYoutubeLink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const link = event.currentTarget.youtubeLink.value;
    setUploadedContent(link);
  };

  const simulateContentGeneration = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Content generation simulation logic here
      setIsLoading(false);
      setShowUploadModal(false);
    }, 2000);
  };

  const handleSubmitContent = () => {
    if (uploadedContent) {
      simulateContentGeneration();
    }
  };

  const handlePlatformSelection = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleShare = () => {
    setShowShareConfirmation(true);
  };

  const confirmShare = () => {
    setShowUploadProgress(true);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowUploadProgress(false);
            navigate('/gyb-studio');
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleEdit = (itemId: string, type: 'content' | 'headline' | 'thumbnail') => {
    if (type === 'content') {
      setGeneratedContent(prevContent =>
        prevContent.map(item =>
          item.id === itemId
            ? item.editsRemaining > 0
              ? { ...item, editsRemaining: item.editsRemaining - 1 }
              : item
            : item
        )
      );
    } else if (type === 'headline') {
      setHeadlines(prevHeadlines =>
        prevHeadlines.map(headline =>
          headline.id === itemId
            ? headline.editsRemaining > 0
              ? { ...headline, editsRemaining: headline.editsRemaining - 1 }
              : headline
            : headline
        )
      );
    } else if (type === 'thumbnail') {
      setThumbnails(prevThumbnails =>
        prevThumbnails.map(thumbnail =>
          thumbnail.id === itemId
            ? thumbnail.editsRemaining > 0
              ? { ...thumbnail, editsRemaining: thumbnail.editsRemaining - 1 }
              : thumbnail
            : thumbnail
        )
      );
    }
    console.log(`Regenerating ${type} for item ${itemId}`);
  };

  const handleApprove = (itemId: string, type: 'content' | 'headline' | 'thumbnail') => {
    if (type === 'content') {
      setGeneratedContent(prevContent =>
        prevContent.map(item =>
          item.id === itemId
            ? { ...item, approved: !item.approved }
            : item
        )
      );
    } else if (type === 'headline') {
      setHeadlines(prevHeadlines =>
        prevHeadlines.map(headline =>
          headline.id === itemId
            ? { ...headline, approved: !headline.approved }
            : headline
        )
      );
    } else if (type === 'thumbnail') {
      setThumbnails(prevThumbnails =>
        prevThumbnails.map(thumbnail =>
          thumbnail.id === itemId
            ? { ...thumbnail, approved: !thumbnail.approved }
            : thumbnail
        )
      );
    }
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/new-chat" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">GYB Media</h1>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="w-full bg-navy-blue text-white rounded-lg p-4 flex items-center justify-center mb-6"
        >
          <Plus size={24} className="mr-2" />
          Upload Content
        </button>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-navy-blue mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Generating content...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Headline Options</h2>
              <div className="space-y-2">
                {headlines.map((headline) => (
                  <div
                    key={headline.id}
                    className={`cursor-pointer p-2 rounded ${selectedHeadline === headline.id ? 'bg-navy-blue text-white' : 'bg-white'}`}
                    onClick={() => setSelectedHeadline(headline.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{headline.text}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(headline.id, 'headline')}
                          className="text-navy-blue hover:underline flex items-center"
                          disabled={headline.editsRemaining === 0}
                        >
                          <Edit2 size={16} className="mr-1" />
                          Edit ({headline.editsRemaining} left)
                        </button>
                        <button
                          onClick={() => handleApprove(headline.id, 'headline')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            headline.approved
                              ? 'bg-blue-500 text-white'
                              : 'bg-green-500 text-white'
                          }`}
                        >
                          {headline.approved ? 'Saved' : 'Approve'}
                        </button>
                      </div>
                    </div>
                    {headline.editsRemaining === 0 && (
                      <p className="text-xs text-red-500 mt-1">Additional edits will be charged</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Thumbnail Options</h2>
              <div className="grid grid-cols-3 gap-4">
                {thumbnails.map((thumbnail) => (
                  <div
                    key={thumbnail.id}
                    className={`cursor-pointer border-4 ${selectedThumbnail === thumbnail.id ? 'border-navy-blue' : 'border-transparent'}`}
                    onClick={() => setSelectedThumbnail(thumbnail.id)}
                  >
                    <img src={thumbnail.url} alt={`Thumbnail ${thumbnail.id}`} className="w-full h-auto" />
                    <div className="mt-2 flex justify-between items-center">
                      <button
                        onClick={() => handleEdit(thumbnail.id, 'thumbnail')}
                        className="text-navy-blue hover:underline flex items-center"
                        disabled={thumbnail.editsRemaining === 0}
                      >
                        <Edit2 size={16} className="mr-1" />
                        Edit ({thumbnail.editsRemaining} left)
                      </button>
                      <button
                        onClick={() => handleApprove(thumbnail.id, 'thumbnail')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          thumbnail.approved
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}
                      >
                        {thumbnail.approved ? 'Saved' : 'Approve'}
                      </button>
                    </div>
                    {thumbnail.editsRemaining === 0 && (
                      <p className="text-xs text-red-500 mt-1">Additional edits will be charged</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {contentTypes.map((contentType) => (
              <div key={contentType.type} className="border rounded p-4">
                <button
                  onClick={() => toggleSection(contentType.type)}
                  className="w-full flex items-center justify-between"
                >
                  <span className="flex items-center">
                    <contentType.icon size={20} className="mr-2" />
                    {contentType.type.charAt(0).toUpperCase() + contentType.type.slice(1)}
                  </span>
                  {expandedSections.includes(contentType.type) ? <ChevronLeft className="transform rotate-90" size={20} /> : <ChevronLeft className="transform -rotate-90" size={20} />}
                </button>
                {expandedSections.includes(contentType.type) && (
                  <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {generatedContent.filter(item => item.type === contentType.type).map((item) => (
                        <div key={item.id} className="bg-gray-100 p-4 rounded-lg">
                          {item.type === 'video' && (
                            <div className="aspect-w-16 aspect-h-9 mb-2">
                              <video src={item.url} controls poster={item.thumbnail} className="rounded-lg">
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                          {item.type === 'photo' && (
                            <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                          )}
                          {item.type === 'audio' && (
                            <div className="mb-2">
                              <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-48">
                                <Headphones size={48} className="text-navy-blue" />
                              </div>
                              <audio src={item.url} controls className="w-full mt-2">
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                          {item.type === 'written' && (
                            <div className="bg-gray-200 rounded-lg p-4 h-48 flex items-center justify-center mb-2">
                              <FileText size={48} className="text-navy-blue" />
                            </div>
                          )}
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => handleEdit(item.id, 'content')}
                              className="text-navy-blue hover:underline flex items-center"
                              disabled={item.editsRemaining === 0}
                            >
                              <Edit2 size={16} className="mr-1" />
                              Edit ({item.editsRemaining} left)
                            </button>
                            <button
                              onClick={() => handleApprove(item.id, 'content')}
                              className={`px-3 py-1 rounded-full text-sm ${
                                item.approved
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-green-500 text-white'
                              }`}
                            >
                              {item.approved ? 'Saved' : 'Approve'}
                            </button>
                          </div>
                          {item.editsRemaining === 0 && (
                            <p className="text-xs text-red-500 mt-1">Additional edits will be charged</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Share on:</h4>
                      <div className="flex flex-wrap gap-2">
                        {contentType.platforms.map((platform) => (
                          <button
                            key={platform}
                            onClick={() => handlePlatformSelection(platform)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedPlatforms.includes(platform)
                                ? 'bg-navy-blue text-white'
                                : 'bg-gray-200 text-navy-blue'
                            }`}
                          >
                            {platform}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleShare}
              className="w-full bg-navy-blue text-white rounded-lg p-4 mt-6"
              disabled={selectedPlatforms.length === 0}
            >
              Share Approved Content
            </button>
          </div>
        )}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upload Content</h2>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="file-upload" className="block mb-2">Choose File</label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.txt"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <p className="mb-2">Or</p>
                <form onSubmit={handleYoutubeLink}>
                  <label htmlFor="youtube-link" className="block mb-2">YouTube Link</label>
                  <input
                    id="youtube-link"
                    name="youtubeLink"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border p-2 rounded mb-2"
                  />
                  <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Add YouTube Link
                  </button>
                </form>
              </div>
              <button
                onClick={handleSubmitContent}
                className="w-full bg-navy-blue text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Submit Content
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Sharing</h2>
            <p>Are you sure you want to share the approved content to the selected platforms?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowShareConfirmation(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmShare}
                className="px-4 py-2 bg-navy-blue text-white rounded hover:bg-opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showUploadProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Uploading Content</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div
                className="bg-navy-blue h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center">{uploadProgress}% Complete</p>
            {uploadProgress === 100 && (
              <p className="text-green-500 text-center mt-4">Upload successful! Redirecting...</p>
            )}
          </div>
        </div>
      )}

      <FloatingAnalyticsButton />
    </div>
  );
};

export default GYBMedia;
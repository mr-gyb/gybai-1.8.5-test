import React, { useState, useEffect } from 'react';
import { FileText, Image, Video, Headphones, Share2 } from 'lucide-react';

const ContentEditor = ({ content }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analyzeContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await performContentAnalysis(content);
        setAnalysisResult(result);
      } catch (err) {
        setError('Failed to analyze content. Please try again.');
        console.error('Content analysis error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (content) {
      analyzeContent();
    }
  }, [content]);

  const performContentAnalysis = async (content) => {
    // Simulate API call for content analysis
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2-second delay

    if (content.type === 'youtube' || content.type === 'url') {
      return {
        title: 'How to Make a Perfect Cup of Coffee',
        keyPoints: [
          'Choose high-quality, freshly roasted coffee beans',
          'Use the right water temperature (195°F to 205°F)',
          'Maintain the proper coffee-to-water ratio',
          'Grind beans immediately before brewing',
          'Experiment with different brewing methods',
        ],
        summary: 'This content provides a comprehensive guide on brewing the perfect cup of coffee. It covers essential factors such as bean selection, water temperature, coffee-to-water ratio, grinding techniques, and various brewing methods. The presenter emphasizes the importance of each step in achieving a rich, flavorful cup of coffee.',
      };
    } else if (content.type === 'file') {
      return {
        title: 'Uploaded File Analysis',
        keyPoints: [
          'File type: ' + content.content.type,
          'File size: ' + (content.content.size / 1024 / 1024).toFixed(2) + ' MB',
          'Last modified: ' + new Date(content.content.lastModified).toLocaleString(),
        ],
        summary: `This is an analysis of the uploaded file "${content.content.name}". Further processing would be required to extract more detailed information from the file contents.`,
      };
    }

    throw new Error('Unsupported content type');
  };

  if (isLoading) {
    return <div className="text-center py-8">Analyzing content... Please wait.</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!analysisResult) {
    return <div className="text-center py-8">No content to analyze. Please upload or share content first.</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Content Editor</h2>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h3 className="text-xl font-semibold">{analysisResult.title}</h3>
        
        <div>
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc list-inside space-y-1">
            {analysisResult.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Summary:</h4>
          <p>{analysisResult.summary}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Repurpose Content</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
            <Video className="mb-2" />
            <span>Video</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
            <Image className="mb-2" />
            <span>Image</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors">
            <Headphones className="mb-2" />
            <span>Audio</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
            <FileText className="mb-2" />
            <span>Blog Post</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors">
            <Share2 className="mb-2" />
            <span>Social Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
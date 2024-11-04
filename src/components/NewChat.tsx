import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronDown, PlusCircle, Camera, Image as ImageIcon, Folder, Mic, Video, Headphones } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingFilter from './FloatingFilter';

const NewChat: React.FC = () => {
  const { isAuthenticated, userData } = useAuth();
  const { createNewChat, addMessage, currentChatId, chats } = useChat();
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('Mr.GYB AI');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filteredAgents, setFilteredAgents] = useState<string[]>([]);

  const agents = [
    { name: 'Mr.GYB AI', description: 'Your all-in-one business growth assistant' },
    { name: 'CEO', description: 'Strategic planning and business development expert' },
    { name: 'COO', description: 'Operations management and process optimization specialist' },
    { name: 'CHRO', description: 'Human resources expert for team building and culture' },
    { name: 'CTO', description: 'Technology strategy and innovation consultant' },
    { name: 'CMO', description: 'Marketing expert to scale your brand and reach' }
  ];

  useEffect(() => {
    const state = location.state as { selectedAgent?: string, chatId?: string } | null;
    if (state?.selectedAgent) {
      setSelectedAgent(state.selectedAgent);
    }
    if (state?.chatId) {
      // Use the chatId from the state if provided
    } else if (!currentChatId) {
      createNewChat();
    }
  }, [location, currentChatId, createNewChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const handleSendMessage = () => {
    if (input.trim() && currentChatId) {
      addMessage(currentChatId, 'user', input);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        addMessage(currentChatId, 'assistant', `This is a response from ${selectedAgent} to your message: "${input}"`);
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
      console.log('File selected:', file.name);
    }
  };

  const currentChat = currentChatId ? chats.find(chat => chat.id === currentChatId) : null;

  const handleFilterChange = (filters: { agentType: string[] }) => {
    let filtered = agents.map(agent => agent.name);

    if (filters.agentType.length > 0) {
      filtered = filtered.filter(agent => filters.agentType.includes(agent));
    }

    setFilteredAgents(filtered);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-navy-blue text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="appearance-none bg-transparent text-white pr-8 py-1 focus:outline-none text-center font-bold text-sm sm:text-base"
          >
            {(filteredAgents.length > 0 ? filteredAgents : agents.map(a => a.name)).map((agentName) => (
              <option key={agentName} value={agentName} className="text-navy-blue">
                {agentName}
              </option>
            ))}
          </select>
          <ChevronDown className="ml-2" size={16} />
        </div>
        <button
          onClick={() => createNewChat()}
          className="bg-gold text-navy-blue px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center text-xs sm:text-sm"
        >
          <PlusCircle size={16} className="mr-1 sm:mr-2" />
          New Chat
        </button>
      </div>
      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {currentChat && currentChat.messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-lg p-2 sm:p-3 ${
              message.role === 'user' ? 'bg-gold text-navy-blue' : 'bg-navy-blue text-white'
            }`}>
              <p className="text-sm sm:text-base">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <div className="p-2 sm:p-4 border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-full">
          <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Camera size={16} />
            </button>
            <button onClick={handleFileUpload} className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <ImageIcon size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Folder size={16} />
            </button>
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Message"
            className="flex-grow bg-transparent border-none focus:outline-none px-2 sm:px-4 py-1 sm:py-2 text-navy-blue text-sm sm:text-base"
          />
          <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Mic size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Headphones size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Video size={16} />
            </button>
            <button onClick={handleSendMessage} className="p-1 sm:p-2 text-navy-blue hover:text-blue-600">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      <FloatingFilter onFilterChange={handleFilterChange} />
    </div>
  );
};

export default NewChat;
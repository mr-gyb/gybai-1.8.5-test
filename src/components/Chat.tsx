import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, PlusCircle, ChevronDown, Camera, Image as ImageIcon, Folder, Mic, Video, Headphones } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

const Chat: React.FC = () => {
  // ... (keep existing state and hooks)

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* ... (keep existing header) */}
      <div className="flex-grow overflow-y-auto p-2 sm:p-4 space-y-4">
        {/* ... (keep existing chat messages rendering) */}
      </div>
      <div className="p-2 sm:p-4 border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-full">
          <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Camera size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <ImageIcon size={16} />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-navy-blue">
              <Folder size={16} />
            </button>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
            <button
              onClick={handleSendMessage}
              className="p-1 sm:p-2 text-navy-blue hover:text-blue-600"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
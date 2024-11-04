import React from 'react';
import { ChevronLeft, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

const ChatHistory: React.FC = () => {
  const navigate = useNavigate();
  const { chats, setCurrentChat } = useChat();

  const handleChatClick = (chatId: string) => {
    setCurrentChat(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/new-chat" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">GYB Chat History</h1>
        </div>

        <div className="space-y-4">
          {chats.length === 0 ? (
            <p>No chat history available.</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className="bg-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{chat.title || "Untitled Chat"}</h2>
                  <span className="text-sm text-gray-500">{new Date(chat.lastUpdated).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare size={16} className="mr-2" />
                  <p className="truncate">
                    {chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].content
                      : "No messages"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
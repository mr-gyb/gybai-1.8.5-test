import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: number;
}

interface ChatContextType {
  chats: Chat[];
  currentChatId: string | null;
  addMessage: (chatId: string, role: 'user' | 'assistant', content: string) => void;
  createNewChat: () => string;
  setCurrentChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    const storedChats = localStorage.getItem('chats');
    const storedCurrentChatId = localStorage.getItem('currentChatId');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
    if (storedCurrentChatId) {
      setCurrentChatId(storedCurrentChatId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('currentChatId', currentChatId);
    }
  }, [currentChatId]);

  const addMessage = (chatId: string, role: 'user' | 'assistant', content: string) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, { id: uuidv4(), role, content, timestamp: Date.now() }],
            lastUpdated: Date.now()
          };
        }
        return chat;
      });
      return updatedChats;
    });
  };

  const createNewChat = () => {
    const newChatId = uuidv4();
    setChats(prevChats => [
      ...prevChats,
      { id: newChatId, title: 'New Chat', messages: [], lastUpdated: Date.now() }
    ]);
    setCurrentChatId(newChatId);
    return newChatId;
  };

  const setCurrentChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  return (
    <ChatContext.Provider value={{ chats, currentChatId, addMessage, createNewChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
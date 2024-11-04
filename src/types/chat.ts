export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio';
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  title: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: number;
  updatedAt: number;
}
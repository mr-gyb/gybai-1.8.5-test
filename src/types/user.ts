export interface UserData {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  businessGoal?: string;
  businessStage?: string;
  bio?: string;
  location?: string;
  website?: string;
  profileImage?: string;
  username?: string;
  experience?: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
  rating?: number;
  joinDate?: string;
  following?: number;
  followers?: number;
  language?: string;
  customizeEnabled?: boolean;
  memoryEnabled?: boolean;
  subscriptionLevel?: number;
}
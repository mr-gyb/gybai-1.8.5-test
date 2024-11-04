import React, { createContext, useState, useContext, useEffect } from 'react';

interface UserData {
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
}

interface AuthContextType {
  isAuthenticated: boolean;
  isVerified: boolean;
  userData: UserData | null;
  login: (userData: Partial<UserData>) => void;
  logout: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  setVerified: (value: boolean) => void;
  verifyUser: (code: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedVerified = localStorage.getItem('isVerified');
    const storedUserData = localStorage.getItem('userData');

    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    if (storedVerified === 'true') {
      setIsVerified(true);
    }

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const login = (newUserData: Partial<UserData>) => {
    setIsAuthenticated(true);
    setUserData((prevData) => {
      const updatedData = { ...prevData, ...newUserData } as UserData;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsVerified(false);
    setUserData(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isVerified');
    localStorage.removeItem('userData');
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prevData) => {
      const updatedData = { ...prevData, ...data } as UserData;
      localStorage.setItem('userData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const setVerified = (value: boolean) => {
    setIsVerified(value);
    localStorage.setItem('isVerified', value.toString());
  };

  const verifyUser = (code: string) => {
    // In a real application, you would verify the code with your backend
    // For this example, we'll just check if the code is '123456'
    if (code === '123456') {
      setVerified(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isVerified, 
      userData, 
      login, 
      logout, 
      updateUserData, 
      setVerified,
      verifyUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
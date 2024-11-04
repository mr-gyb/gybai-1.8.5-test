import React from 'react';
import { ChevronLeft, Mail, Plus, User, Shield, Archive, Globe, CheckCircle, RefreshCw, Mic, HelpCircle, FileText, Lock, Briefcase, FileText as Resume, Layers } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
};

const Settings: React.FC = () => {
  const { userData } = useAuth();

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <RouterLink to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </RouterLink>
          <h1 className="text-3xl font-bold text-navy-blue">Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Portfolio and Resume Icons */}
          <div className="flex justify-center space-x-12 mb-8">
            <RouterLink to="/portfolio" className="flex flex-col items-center">
              <Briefcase size={48} className="text-navy-blue mb-2" />
              <span className="text-sm font-semibold">Portfolio</span>
            </RouterLink>
            <RouterLink to="/resume" className="flex flex-col items-center">
              <Resume size={48} className="text-navy-blue mb-2" />
              <span className="text-sm font-semibold">Resume</span>
            </RouterLink>
          </div>

          {/* Account Section */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <div className="space-y-4">
              <RouterLink to="/settings/email" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Mail className="mr-2" />
                  <span>Email</span>
                </div>
                <span className="text-gray-500">{userData?.email}</span>
              </RouterLink>
              <RouterLink to="/settings/subscription" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Plus className="mr-2" />
                  <span>Subscription</span>
                </div>
                <span className="text-gray-500">Level {userData?.subscriptionLevel || 1}</span>
              </RouterLink>
              <RouterLink to="/settings/personalization" className="flex justify-between items-center">
                <div className="flex items-center">
                  <User className="mr-2" />
                  <span>Personalization</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
              <RouterLink to="/settings/data-controls" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Shield className="mr-2" />
                  <span>Data Controls</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
              <RouterLink to="/settings/archived-chats" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Archive className="mr-2" />
                  <span>Archived Chats</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
            </div>
          </div>

          {/* App Section */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">App</h2>
            <div className="space-y-4">
              <RouterLink to="/settings/language" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Globe className="mr-2" />
                  <span>App Language</span>
                </div>
                <span className="text-gray-500">{languages[userData?.language as keyof typeof languages] || 'English'}</span>
              </RouterLink>
              <RouterLink to="/settings/spelling" className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="mr-2" />
                  <span>Correct Spelling Automatically</span>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </RouterLink>
              <RouterLink to="/settings/updates" className="flex justify-between items-center">
                <div className="flex items-center">
                  <RefreshCw className="mr-2" />
                  <span>Check for Updates...</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
            </div>
          </div>

          {/* Speech Section */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Speech</h2>
            <div className="space-y-4">
              <RouterLink to="/settings/voice" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Mic className="mr-2" />
                  <span>Voice</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
              <RouterLink to="/settings/main-language" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Globe className="mr-2" />
                  <span>Main Language</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
            </div>
          </div>

          {/* Integrations Section */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Integrations</h2>
            <div className="space-y-4">
              <RouterLink to="/settings/integrations" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Layers className="mr-2" />
                  <span>Manage Integrations</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <div className="space-y-4">
              <RouterLink to="/settings/help" className="flex justify-between items-center">
                <div className="flex items-center">
                  <HelpCircle className="mr-2" />
                  <span>Help Center</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
              <RouterLink to="/settings/terms" className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="mr-2" />
                  <span>Terms of Use</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
              <RouterLink to="/settings/privacy" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Lock className="mr-2" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronLeft className="transform rotate-180" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
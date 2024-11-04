import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import ChatHistory from './components/ChatHistory';
import Dashboard from './components/Dashboard';
import DreamTeam from './components/DreamTeam';
import GYBLiveNetwork from './components/GYBLiveNetwork';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import UserOnboarding from './components/UserOnboarding';
import GYBTeamChat from './components/GYBTeamChat';
import Analytics from './components/Analytics';
import Upload from './components/Upload';
import GYBMedia from './components/NewPost';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import Integrations from './components/Integrations';
import WorkHistory from './components/WorkHistory';
import Invites from './components/Invites';
import Reviews from './components/Reviews';
import Rewards from './components/Rewards';
import Payments from './components/Payments';
import Earnings from './components/Earnings';
import AIVideoAvatar from './components/AIVideoAvatar';
import { useAuth } from './contexts/AuthContext';
import EmailSettings from './components/EmailSettings';
import LanguageSettings from './components/LanguageSettings';
import PersonalizationSettings from './components/PersonalizationSettings';
import SubscriptionSettings from './components/SubscriptionSettings';
import RoadMap from './components/RoadMap';
import BottomMenu from './components/BottomMenu';
import GYBStudio from './components/GYBStudio';
import BusinessPlan from './components/templates/BusinessPlan';
import MarketingSales from './components/templates/MarketingSales';
import InvestorDeck from './components/templates/InvestorDeck';
import MarketAnalysis from './components/templates/MarketAnalysis';
import FulfilmentPlan from './components/templates/FulfilmentPlan';
import MediaPlan from './components/templates/MediaPlan';
import RoadMapTemplate from './components/templates/RoadMapTemplate';

const App: React.FC = () => {
  const { isAuthenticated, isVerified } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-navy-blue">
        {isAuthenticated && <Header />}
        <main className="flex-grow mt-16 mb-16">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? (
                isVerified ? <Navigate to="/new-chat" /> : <Navigate to="/verify" />
              ) : (
                <UserOnboarding />
              )
            } />
            <Route path="/new-chat" element={isAuthenticated ? <NewChat /> : <Navigate to="/" />} />
            <Route path="/chat/:chatId" element={isAuthenticated ? <Chat /> : <Navigate to="/" />} />
            <Route path="/chat-history" element={isAuthenticated ? <ChatHistory /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/dream-team" element={isAuthenticated ? <DreamTeam /> : <Navigate to="/" />} />
            <Route path="/gyb-live-network" element={isAuthenticated ? <GYBLiveNetwork /> : <Navigate to="/" />} />
            <Route path="/user-profile/:userId" element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
            <Route path="/gyb-team-chat" element={isAuthenticated ? <GYBTeamChat /> : <Navigate to="/" />} />
            <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/" />} />
            <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/" />} />
            <Route path="/new-post" element={isAuthenticated ? <GYBMedia /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
            <Route path="/portfolio" element={isAuthenticated ? <Portfolio /> : <Navigate to="/" />} />
            <Route path="/resume" element={isAuthenticated ? <Resume /> : <Navigate to="/" />} />
            <Route path="/settings/integrations" element={isAuthenticated ? <Integrations /> : <Navigate to="/" />} />
            <Route path="/work-history" element={isAuthenticated ? <WorkHistory /> : <Navigate to="/" />} />
            <Route path="/invites" element={isAuthenticated ? <Invites /> : <Navigate to="/" />} />
            <Route path="/reviews" element={isAuthenticated ? <Reviews /> : <Navigate to="/" />} />
            <Route path="/rewards" element={isAuthenticated ? <Rewards /> : <Navigate to="/" />} />
            <Route path="/payments" element={isAuthenticated ? <Payments /> : <Navigate to="/" />} />
            <Route path="/earnings" element={isAuthenticated ? <Earnings /> : <Navigate to="/" />} />
            <Route path="/ai-video-avatar" element={isAuthenticated ? <AIVideoAvatar /> : <Navigate to="/" />} />
            <Route path="/settings/email" element={isAuthenticated ? <EmailSettings /> : <Navigate to="/" />} />
            <Route path="/settings/language" element={isAuthenticated ? <LanguageSettings /> : <Navigate to="/" />} />
            <Route path="/settings/personalization" element={isAuthenticated ? <PersonalizationSettings /> : <Navigate to="/" />} />
            <Route path="/settings/subscription" element={isAuthenticated ? <SubscriptionSettings /> : <Navigate to="/" />} />
            <Route path="/road-map" element={isAuthenticated ? <RoadMap /> : <Navigate to="/" />} />
            <Route path="/gyb-studio" element={isAuthenticated ? <GYBStudio /> : <Navigate to="/" />} />
            <Route path="/business-plan" element={isAuthenticated ? <BusinessPlan /> : <Navigate to="/" />} />
            <Route path="/marketing-sales" element={isAuthenticated ? <MarketingSales /> : <Navigate to="/" />} />
            <Route path="/investor-deck" element={isAuthenticated ? <InvestorDeck /> : <Navigate to="/" />} />
            <Route path="/market-analysis" element={isAuthenticated ? <MarketAnalysis /> : <Navigate to="/" />} />
            <Route path="/fulfilment-plan" element={isAuthenticated ? <FulfilmentPlan /> : <Navigate to="/" />} />
            <Route path="/media-plan" element={isAuthenticated ? <MediaPlan /> : <Navigate to="/" />} />
            <Route path="/road-map-template" element={isAuthenticated ? <RoadMapTemplate /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/new-chat" />} />
          </Routes>
        </main>
        {isAuthenticated && <BottomMenu />}
      </div>
    </Router>
  );
};

export default App;
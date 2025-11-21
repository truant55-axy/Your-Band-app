import React, { useState, useCallback, useMemo } from 'react';
import Login from './pages/Login.js';
import AvatarCustomizer from './pages/AvatarCustomizer.js';
import Home from './pages/Home.js';
import Games from './pages/Games.js';
import Companion from './pages/Companion.js';
import Profile from './pages/Profile.js';
import BottomNav from './components/BottomNav.js';
import WelcomeModal from './components/WelcomeModal.js';
import { AppContext } from './contexts/AppContext.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAvatarSet, setIsAvatarSet] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [avatarConfig, setAvatarConfig] = useState({
    shape: 'circle',
    eyes: 'normal',
    mouth: 'smile',
    color: 'bg-blue-400',
  });

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setShowWelcome(true);
  }, []);

  const handleAvatarCreation = useCallback((config) => {
    setAvatarConfig(config);
    setIsAvatarSet(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAvatarSet(false);
    setCurrentPage('home');
  }, []);
  
  const handleEditAvatar = useCallback(() => {
    setIsAvatarSet(false);
  }, []);

  const appContextValue = useMemo(() => ({
    avatarConfig,
    logout: handleLogout,
    editAvatar: handleEditAvatar
  }), [avatarConfig, handleLogout, handleEditAvatar]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'games':
        return <Games />;
      case 'companion':
        return <Companion />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (isLoggedIn && showWelcome) {
    return <WelcomeModal onClose={() => setShowWelcome(false)} />;
  }

  if (!isAvatarSet) {
    return <AvatarCustomizer onComplete={handleAvatarCreation} />;
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="safe-top safe-bottom safe-left safe-right h-dvh w-screen bg-gray-900 text-white font-sans flex flex-col overflow-hidden">
        <main className="flex-grow overflow-y-auto pb-24">
          {renderPage()}
        </main>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
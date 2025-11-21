import React from 'react';
import { HomeIcon, PuzzlePieceIcon, UserIcon, ChatBubbleLeftRightIcon } from './icons/HeroIcons.js';

const NavItem = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'text-purple-400';
  const inactiveClasses = 'text-gray-400 hover:text-purple-300 active:text-purple-300';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 h-20 transition-colors duration-200 active:bg-purple-500/10 ${isActive ? activeClasses : inactiveClasses}`}
      style={{ minHeight: '44px', WebkitTapHighlightColor: 'transparent' }}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

const BottomNav = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-lg border-t border-purple-500/20 flex justify-around items-center safe-bottom safe-left safe-right"
         style={{ minHeight: '80px', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <NavItem
        label="Home"
        icon={<HomeIcon className="w-6 h-6" />}
        isActive={currentPage === 'home'}
        onClick={() => setCurrentPage('home')}
      />
      <NavItem
        label="Games"
        icon={<PuzzlePieceIcon className="w-6 h-6" />}
        isActive={currentPage === 'games'}
        onClick={() => setCurrentPage('games')}
      />
      <NavItem
        label="Companion"
        icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
        isActive={currentPage === 'companion'}
        onClick={() => setCurrentPage('companion')}
      />
      <NavItem
        label="Me"
        icon={<UserIcon className="w-6 h-6" />}
        isActive={currentPage === 'profile'}
        onClick={() => setCurrentPage('profile')}
      />
    </nav>
  );
};

export default BottomNav;
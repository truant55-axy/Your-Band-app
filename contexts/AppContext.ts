import { createContext } from 'react';

export const AppContext = createContext({
  avatarConfig: {
    shape: 'circle',
    eyes: 'normal',
    mouth: 'smile',
    color: 'bg-blue-400',
  },
  logout: () => {},
  editAvatar: () => {},
});
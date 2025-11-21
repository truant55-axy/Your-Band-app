import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext.js';
import Avatar from '../components/Avatar.js';

const Profile = () => {
    const { avatarConfig, logout, editAvatar } = useContext(AppContext);

    return (
        <div className="p-4 space-y-8">
            <header className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24">
                    <Avatar config={avatarConfig} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white text-center">My Profile</h1>
                    <p className="text-gray-400 text-center">Manage your account and settings</p>
                </div>
            </header>
            
            <div className="space-y-2">
                <button onClick={editAvatar} className="w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
                    Edit Companion Avatar
                </button>
                 <button className="w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
                    Background Settings
                </button>
                <button className="w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
                    Account & Security
                </button>
                <button className="w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
                    Notifications
                </button>
            </div>

            <div className="pt-4">
                 <button 
                    onClick={logout} 
                    className="w-full bg-red-600/80 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;
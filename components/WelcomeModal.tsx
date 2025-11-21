import React, { useMemo } from 'react';

const wellnessMessages = [
  "Breathe in, breathe out. You've got this.",
  "Every small step forward is still a step forward.",
  "Be kind to your mind today.",
  "It's okay to not be okay. Your feelings are valid.",
  "You are stronger than you think. Keep going.",
  "Allow yourself a moment of peace. You deserve it."
];

const WelcomeModal = ({ onClose }) => {
  const message = useMemo(() => wellnessMessages[Math.floor(Math.random() * wellnessMessages.length)], []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 max-w-xs w-full text-center border border-purple-500/30">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">Welcome Back!</h2>
        <p className="text-lg text-gray-200 mb-8 font-light">"{message}"</p>
        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
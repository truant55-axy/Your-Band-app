import React, { useState } from 'react';
import Avatar from '../components/Avatar.js';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/icons/HeroIcons.js';

const shapes = ['circle', 'squircle', 'bean', 'diamond', 'ghost'];
const eyes = ['normal', 'happy', 'wink', 'sad', 'surprised', 'dizzy'];
const mouths = ['smile', 'laugh', 'neutral', 'frown', 'surprised', 'sad-open'];
const colors = ['bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-pink-400', 'bg-purple-400', 'bg-orange-400'];

const AvatarCustomizer = ({ onComplete }) => {
  const [config, setConfig] = useState({
    shape: 'circle',
    eyes: 'normal',
    mouth: 'smile',
    color: 'bg-blue-400',
  });

  const updateConfig = (part, value) => {
    setConfig(prev => ({ ...prev, [part]: value }));
  };

  const createCycleFunction = (part, options) => (direction) => {
    const currentIndex = options.indexOf(config[part]);
    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % options.length
      : (currentIndex - 1 + options.length) % options.length;
    updateConfig(part, options[nextIndex]);
  };
  
  const cycleShape = createCycleFunction('shape', shapes);
  const cycleEyes = createCycleFunction('eyes', eyes);
  const cycleMouth = createCycleFunction('mouth', mouths);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-2">Create Your Companion</h1>
      <p className="text-gray-400 mb-8">This will be your personal AI friend.</p>
      
      <div className="w-48 h-48 mb-8">
        <Avatar config={config} />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Shape Selector */}
        <div className="flex items-center justify-between">
            <span className="font-medium">Shape</span>
            <div className="flex items-center gap-4">
                <button onClick={() => cycleShape('prev')} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><ChevronLeftIcon className="w-5 h-5"/></button>
                <span className="w-20 text-center capitalize">{config.shape}</span>
                <button onClick={() => cycleShape('next')} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><ChevronRightIcon className="w-5 h-5"/></button>
            </div>
        </div>
        {/* Eyes Selector */}
        <div className="flex items-center justify-between">
            <span className="font-medium">Eyes</span>
            <div className="flex items-center gap-4">
                <button onClick={() => cycleEyes('prev')} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><ChevronLeftIcon className="w-5 h-5"/></button>
                <span className="w-20 text-center capitalize">{config.eyes}</span>
                <button onClick={() => cycleEyes('next')} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><ChevronRightIcon className="w-5 h-5"/></button>
            </div>
        </div>
        {/* Mouth Selector */}
        <div className="flex items-center justify-between">
            <span className="font-medium">Mouth</span>
            <div className="flex items-center gap-4">
                <button onClick={() => cycleMouth('prev')} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><ChevronLeftIcon className="w-5 h-5"/></button>
                <span className="w-20 text-center capitalize">{config.mouth}</span>
                <button onClick={() => cycleMouth('next')} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><ChevronRightIcon className="w-5 h-5"/></button>
            </div>
        </div>

        {/* Color Selector */}
        <div className="flex items-center justify-between">
           <span className="font-medium">Color</span>
           <div className="flex gap-2">
                {colors.map(c => (
                    <button key={c} onClick={() => updateConfig('color', c)} className={`w-8 h-8 rounded-full ${c} ${config.color === c ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-white' : ''}`}></button>
                ))}
           </div>
        </div>
      </div>
      
      <button
        onClick={() => onComplete(config)}
        className="w-full max-w-sm mt-12 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
      >
        Create Companion
      </button>
    </div>
  );
};

export default AvatarCustomizer;
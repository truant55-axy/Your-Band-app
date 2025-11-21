import React, { useState, useEffect } from 'react';

const BreathingOrb = ({ onBack }) => {
  const [phase, setPhase] = useState('in');
  const [text, setText] = useState('Breathe In...');

  useEffect(() => {
    const timings = {
      in: 4000,
      hold1: 1000,
      out: 6000,
      hold2: 1000,
    };

    const sequence = ['in', 'hold1', 'out', 'hold2'];

    const timer = setTimeout(() => {
      setPhase(currentPhase => {
        const nextIndex = (sequence.indexOf(currentPhase) + 1) % sequence.length;
        const nextPhase = sequence[nextIndex];

        switch (nextPhase) {
          case 'in': setText('Breathe In...'); break;
          case 'out': setText('Breathe Out...'); break;
          case 'hold1': case 'hold2': setText('Hold...'); break;
        }
        
        return nextPhase;
      });
    }, timings[phase]);

    return () => clearTimeout(timer);
  }, [phase]);

  const getOrbClasses = () => {
    switch(phase) {
      case 'in': return 'scale-100';
      case 'out': return 'scale-50';
      case 'hold1': return 'scale-100';
      case 'hold2': return 'scale-50';
    }
  }

  return (
    <div className="p-4 h-full flex flex-col items-center justify-between">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Breathing Orb</h2>
        <p className="text-gray-400">Follow the orb to find your calm.</p>
      </div>

      <div className="w-full flex-grow flex items-center justify-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className={`absolute w-full h-full bg-purple-500 rounded-full transition-transform duration-[4000ms] ease-in-out animate-pulse ${getOrbClasses()}`}></div>
          <div className={`absolute w-full h-full bg-blue-400 rounded-full transition-transform duration-[6000ms] ease-in-out opacity-70 ${getOrbClasses()}`}></div>
          <span className="relative text-2xl font-semibold z-10">{text}</span>
        </div>
      </div>
      
       <button onClick={onBack} className="w-full max-w-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
        Back to Games
      </button>
    </div>
  );
};

export default BreathingOrb;
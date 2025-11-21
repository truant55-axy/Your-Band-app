import React, { useState, useEffect } from 'react';

const Lemon = ({ onClick, isSmashed, position }) => (
  <div
    className="absolute transition-all duration-200"
    style={{ top: position.top, left: position.left }}
    onClick={onClick}
  >
    <div className={`text-8xl cursor-pointer transform transition-transform duration-200 ${isSmashed ? 'scale-110 rotate-12' : 'hover:scale-110'}`}>
      {isSmashed ? '💥' : '🍋'}
    </div>
  </div>
);

const BeatTheLemon = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSmashed, setIsSmashed] = useState(false);
  const [position, setPosition] = useState({ top: '40%', left: '40%' });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleSmash = () => {
    if (gameOver) return;
    setScore(score + 1);
    setIsSmashed(true);
    setTimeout(() => {
      setIsSmashed(false);
      setPosition({
        top: `${Math.random() * 70 + 10}%`,
        left: `${Math.random() * 70 + 10}%`,
      });
    }, 200);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Beat the Lemon!</h2>
        <span className="text-xl font-mono">Time: {timeLeft}s</span>
      </div>
      <p className="text-gray-400 mb-4 text-center">Tap the lemon as many times as you can!</p>
      
      <div className="relative flex-grow bg-gray-800 rounded-2xl overflow-hidden">
        {!gameOver ? (
          <Lemon onClick={handleSmash} isSmashed={isSmashed} position={position} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
            <h3 className="text-3xl font-bold text-yellow-300">Time's Up!</h3>
            <p className="text-lg mt-2">You released <span className="font-bold text-2xl text-purple-300">{score}</span> points of tension!</p>
          </div>
        )}
      </div>

      <button onClick={onBack} className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
        Back to Games
      </button>
    </div>
  );
};

export default BeatTheLemon;
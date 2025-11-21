import React, { useState, useEffect } from 'react';

const emojis = ['😊', '🧘', '💖', '✨', '🌈', '☀️', '🌸', '🕊️'];

const generateGrid = () => {
  const pairs = [...emojis, ...emojis];
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
};

const Card = ({ card, onClick }) => (
  <div className="aspect-square perspective-1000" onClick={onClick}>
    <div
      className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}
    >
      <div className="absolute w-full h-full bg-purple-600 rounded-lg backface-hidden flex items-center justify-center"></div>
      <div className="absolute w-full h-full bg-gray-700 rounded-lg backface-hidden rotate-y-180 flex items-center justify-center">
        <span className="text-4xl">{card.emoji}</span>
      </div>
    </div>
  </div>
);


const MoodMatch = ({ onBack }) => {
  const [cards, setCards] = useState(generateGrid());
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);

  const isGameWon = cards.every(c => c.isMatched);

  useEffect(() => {
    if (flipped.length < 2) return;

    const [firstId, secondId] = flipped;
    if (cards[firstId].emoji === cards[secondId].emoji) {
      setCards(prev =>
        prev.map(card =>
          card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card
        )
      );
      setFlipped([]);
    } else {
      setTimeout(() => {
        setCards(prev =>
          prev.map(card =>
            card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card
          )
        );
        setFlipped([]);
      }, 1000);
    }
  }, [flipped, cards]);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || cards[id].isFlipped) return;
    setMoves(moves + 1);
    setCards(prev => prev.map(card => (card.id === id ? { ...card, isFlipped: true } : card)));
    setFlipped([...flipped, id]);
  };
  
  const resetGame = () => {
    setCards(generateGrid());
    setFlipped([]);
    setMoves(0);
  }

  return (
    <div className="p-4 h-full flex flex-col">
       <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Mood Match</h2>
            <p className="text-gray-400">Match the pairs to clear the board!</p>
            <p className="font-mono mt-2">Moves: {moves}</p>
        </div>

      <div className="relative flex-grow flex items-center justify-center">
        {isGameWon ? (
            <div className="text-center">
                <h3 className="text-3xl font-bold text-green-400">You Won!</h3>
                <p className="text-lg mt-2">You found all the matches in {moves} moves.</p>
                <button onClick={resetGame} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Play Again</button>
            </div>
        ) : (
            <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
                {cards.map(card => (
                    <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
                ))}
            </div>
        )}
      </div>

       <button onClick={onBack} className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
        Back to Games
      </button>
    </div>
  );
};

export default MoodMatch;
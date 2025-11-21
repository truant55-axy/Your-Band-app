import React, { useState } from 'react';
import BeatTheLemon from '../components/games/BeatTheLemon.js';
import BreathingOrb from '../components/games/BreathingOrb.js';
import MoodMatch from '../components/games/MoodMatch.js';

const GameCard = ({ title, description, onPlay }) => (
    <div className="bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300">
        <h3 className="text-xl font-bold text-purple-300 mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <button
            onClick={onPlay}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
            Play
        </button>
    </div>
);

const Games = () => {
    const [activeGame, setActiveGame] = useState(null);

    const renderActiveGame = () => {
        const onBack = () => setActiveGame(null);
        switch (activeGame) {
            case 'lemon':
                return <BeatTheLemon onBack={onBack} />;
            case 'orb':
                return <BreathingOrb onBack={onBack} />;
            case 'match':
                return <MoodMatch onBack={onBack} />;
            default:
                return null;
        }
    };
    
    if (activeGame) {
        return <div className="h-full">{renderActiveGame()}</div>
    }

    return (
        <div className="p-4 space-y-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-white">De-Stress Zone</h1>
                <p className="text-gray-400">Total time played: <span className="font-semibold text-purple-300">45 minutes</span></p>
            </header>

            <div className="space-y-4">
                <GameCard
                    title="Beat the Lemon"
                    description="Smash lemons to bits! The more you smash, the more tension you release."
                    onPlay={() => setActiveGame('lemon')}
                />
                <GameCard
                    title="Breathing Orb"
                    description="Sync your breath with the pulsating orb and your band's vibrations. Find your calm."
                    onPlay={() => setActiveGame('orb')}
                />
                <GameCard
                    title="Mood Match"
                    description="Clear the board by matching emotion bubbles. Enjoy the satisfying pops and calming sounds."
                    onPlay={() => setActiveGame('match')}
                />
            </div>
        </div>
    );
};

export default Games;
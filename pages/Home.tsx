import React, { useState, useEffect, useCallback } from 'react';
import { getDeepAnalysis } from '../services/geminiService.js';

const EmotionChart = () => {
    // Mock data for the last 7 days. Higher value = better mood. Max 10.
    const data = [6, 7, 5, 8, 7, 9, 6];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const width = 300;
    const height = 120;
    const padding = 20;
    
    const maxX = width - padding * 2;
    const maxY = height - padding * 2;

    const points = data.map((point, i) => {
        const x = (i / (data.length - 1)) * maxX;
        const y = maxY - (point / 10) * maxY;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="flex flex-col items-center">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <g transform={`translate(${padding}, ${padding})`}>
                     {/* Gradient for the line */}
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>

                    {/* Faded background area */}
                    <path
                        d={`M0,${maxY} ${points} ${maxX},${maxY}`}
                        fill="url(#lineGradient)"
                        opacity="0.2"
                    />

                    {/* The actual line */}
                    <polyline
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                    />

                    {/* Data points */}
                    {data.map((point, i) => {
                         const x = (i / (data.length - 1)) * maxX;
                         const y = maxY - (point / 10) * maxY;
                         return <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="url(#lineGradient)" strokeWidth="2" />;
                    })}
                </g>
            </svg>
            <div className="flex justify-between w-full px-4 -mt-2 text-xs text-gray-400">
                {labels.map(label => <span key={label}>{label}</span>)}
            </div>
        </div>
    );
};

const Home = () => {
  // Mock data for display
  const heartRate = 72;
  const temperature = 36.8;

  const [analysis, setAnalysis] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);

  // Mock emotion data for deep analysis
  const mockDailyEmotions = {
    Monday: 'Stressed',
    Tuesday: 'Calm',
    Wednesday: 'Anxious',
    Thursday: 'Focused',
    Friday: 'Happy',
    Saturday: 'Relaxed',
    Sunday: 'Content'
  };

  const fetchAnalysis = useCallback(async () => {
    setIsLoadingAnalysis(true);
    try {
      const result = await getDeepAnalysis(mockDailyEmotions);
      setAnalysis(result);
    } catch (error) {
      setAnalysis("Could not load analysis at this time.");
    } finally {
      setIsLoadingAnalysis(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  return (
    <div className="px-3 py-4 space-y-4 md:px-4 md:space-y-6">
      <header className="text-center pt-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Good Morning!</h1>
        <p className="text-sm md:text-base text-gray-400">Here's your wellness summary.</p>
      </header>
      
      {/* Emotion Chart */}
      <div className="bg-gray-800 rounded-2xl p-3 md:p-4">
        <h2 className="text-base md:text-lg font-semibold mb-3 text-purple-300">Weekly Emotion Trend</h2>
        <EmotionChart />
      </div>

      {/* Basic Data */}
      <div className="space-y-3 md:space-y-4">
         <h2 className="text-base md:text-lg font-semibold text-purple-300 px-1">Basic Data</h2>
         <div className="bg-gray-800 rounded-2xl p-3 md:p-4 flex items-center justify-between active:bg-gray-700 transition-colors">
            <div>
              <p className="text-xs md:text-sm text-gray-400">Heart Rate</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{heartRate} <span className="text-base md:text-lg font-normal">bpm</span></p>
            </div>
            <div className="text-2xl md:text-3xl text-red-400 animate-pulse">❤️</div>
         </div>
         <div className="bg-gray-800 rounded-2xl p-3 md:p-4 flex items-center justify-between active:bg-gray-700 transition-colors">
            <div>
              <p className="text-xs md:text-sm text-gray-400">Body Temp</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{temperature} <span className="text-base md:text-lg font-normal">°C</span></p>
            </div>
            <div className="w-12 h-3 md:w-16 md:h-4 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"></div>
         </div>
         <div className="bg-gray-800 rounded-2xl p-3 md:p-4 flex items-center justify-between active:bg-gray-700 transition-colors">
            <div>
              <p className="text-xs md:text-sm text-gray-400">Sleep Quality</p>
              <p className="text-2xl md:text-3xl font-bold text-white">78<span className="text-base md:text-lg font-normal">%</span></p>
            </div>
            <div className="w-12 h-12 relative">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4a5568" strokeWidth="3.8"></path>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#a78bfa" strokeWidth="3.8" strokeDasharray="78, 100" strokeDashoffset="-5"></path>
                </svg>
            </div>
         </div>
      </div>
      
      {/* Deep Analysis */}
      <div className="bg-gray-800 rounded-2xl p-3 md:p-4">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-base md:text-lg font-semibold text-purple-300">Deep Analysis</h2>
            <button onClick={fetchAnalysis} disabled={isLoadingAnalysis} className="text-xs text-purple-400 hover:underline disabled:text-gray-500 active:text-purple-300 min-h-10 px-2">Refresh</button>
        </div>
        {isLoadingAnalysis ? (
          <div className="flex items-center justify-center h-20 md:h-24">
            <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></span>
            </div>
          </div>
        ) : (
          <p className="text-sm md:text-base text-gray-300 whitespace-pre-wrap">{analysis}</p>
        )}
      </div>
      
      {/* Daily Suggestion */}
      <div className="bg-purple-600/80 rounded-2xl p-3 md:p-4 text-center active:bg-purple-600 transition-colors cursor-pointer touch-pan-y">
        <h2 className="font-bold text-base md:text-lg">Today's Suggestion</h2>
        <p className="text-sm md:text-base mt-1">Feeling focused? Try a 5-minute session of Mood Match to sharpen your mind.</p>
      </div>

    </div>
  );
};

export default Home;
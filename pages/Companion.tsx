import React, { useState, useRef, useEffect, useContext } from 'react';
import { getChatResponse, getWeeklyReport } from '../services/geminiService.js';
import Avatar from '../components/Avatar.js';
import { AppContext } from '../contexts/AppContext.js';
import { PaperAirplaneIcon, MicrophoneIcon } from '../components/icons/HeroIcons.js';

const Companion = () => {
  const { avatarConfig } = useContext(AppContext);
  // FIX: Explicitly type the messages state to allow for messages without an avatar (i.e., user messages).
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    sender: 'user' | 'ai';
    avatar?: {
        shape: string;
        eyes: string;
        mouth: string;
        color: string;
    };
  }>>([
    { id: 1, text: "Hello! How are you feeling today? I'm here to listen. 😊", sender: 'ai', avatar: avatarConfig },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // A small delay to ensure the new message is rendered before scrolling
    setTimeout(scrollToBottom, 100);
  }, [messages]);
  
  // Set initial avatar for first message
  useEffect(() => {
    setMessages(prev => prev.map(m => m.id === 1 ? {...m, avatar: avatarConfig} : m));
  }, [avatarConfig])

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getChatResponse(messages, currentInput);
    
    const aiMessage = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: 'ai',
      avatar: avatarConfig,
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleGenerateReport = async () => {
    setIsLoading(true);
    const reportText = await getWeeklyReport();
    const reportMessage = {
        id: Date.now(),
        text: `Here is your weekly emotional summary:\n\n${reportText}`,
        sender: 'ai',
        avatar: avatarConfig,
    };
    setMessages(prev => [...prev, reportMessage]);
    setIsLoading(false);
  }

  return (
    <div className="h-full flex flex-col">
      <header className="p-4 text-center border-b border-purple-500/20">
          <h1 className="text-xl font-bold">Your AI Companion</h1>
          <button onClick={handleGenerateReport} className="text-sm text-purple-400 hover:underline disabled:text-gray-500" disabled={isLoading}>
              Generate Weekly Report
          </button>
      </header>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {/* FIX: Add a check for msg.avatar to ensure it's defined before passing to Avatar component. */}
            {msg.sender === 'ai' && msg.avatar && <div className="w-8 h-8 flex-shrink-0"><Avatar config={msg.avatar} /></div>}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-purple-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
              <p className="text-white whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && (
            <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 flex-shrink-0"><Avatar config={avatarConfig} /></div>
                <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-gray-700 rounded-bl-none">
                    <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>
         )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-purple-500/20 bg-gray-900">
        <div className="flex items-center bg-gray-800 rounded-full p-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-grow bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
            disabled={isLoading}
          />
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MicrophoneIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="p-2 text-white bg-purple-600 rounded-full disabled:bg-purple-800 hover:bg-purple-700 transition-colors"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Companion;

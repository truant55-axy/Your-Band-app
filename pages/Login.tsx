import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-br from-blue-300 to-purple-400 animate-gradient-xy">
      <div className="text-center text-white mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Band</h1>
        <p className="text-base md:text-lg font-light">Your personal mental wellness companion.</p>
      </div>
      <div className="w-full max-w-sm flex flex-col gap-3 md:gap-4">
        <button
          onClick={onLogin}
          className="w-full bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-4 rounded-lg border border-white/50 transition duration-300 active:bg-white/40 touch-pan-y"
          style={{ minHeight: '48px' }}
        >
          Fast Login with Band
        </button>
         <button
          onClick={onLogin}
          className="w-full bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-4 rounded-lg border border-white/50 transition duration-300 active:bg-white/40 touch-pan-y"
          style={{ minHeight: '48px' }}
        >
          Login with Phone / WeChat
        </button>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import { useTheme } from 'next-themes';

const Loader = ({ 
  size = "large", 
  centered = true, 
  text = "Loading...", 
  fullscreen = true,
}) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] ${isDark ? 'bg-black/90' : 'bg-white/80'} backdrop-blur-sm`}>
      {/* Animated Books Stack */}
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 flex items-end justify-center">
          <div className={`w-8 h-16 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} rounded-t-sm transform -rotate-12 animate-pulse`}></div>
          <div className={`w-8 h-20 ${isDark ? 'bg-blue-500/80' : 'bg-blue-600/80'} rounded-t-sm transform rotate-6 animate-pulse animation-delay-200 ml-2`}></div>
          <div className={`w-8 h-18 ${isDark ? 'bg-blue-500/60' : 'bg-blue-600/60'} rounded-t-sm transform -rotate-3 animate-pulse animation-delay-400 ml-2`}></div>
        </div>
        
        {/* Floating Knowledge Particles */}
        <div className={`absolute top-0 left-0 w-2 h-2 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} rounded-full animate-float animation-delay-100`}></div>
        <div className={`absolute top-4 right-2 w-1.5 h-1.5 ${isDark ? 'bg-blue-500/70' : 'bg-blue-600/70'} rounded-full animate-float animation-delay-300`}></div>
        <div className={`absolute bottom-8 left-4 w-1 h-1 ${isDark ? 'bg-blue-500/50' : 'bg-blue-600/50'} rounded-full animate-float animation-delay-500`}></div>
        <div className={`absolute top-8 right-8 w-1.5 h-1.5 ${isDark ? 'bg-blue-500/80' : 'bg-blue-600/80'} rounded-full animate-float animation-delay-700`}></div>
      </div>

      {/* Enhanced Text Animation */}
      <div className="flex items-center justify-center font-bold text-4xl mb-4">
        <span className={`inline-block animate-bounce-slow animation-delay-100 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>A</span>
        <span className={`inline-block animate-bounce-slow animation-delay-200 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>n</span>
        <span className={`inline-block animate-bounce-slow animation-delay-300 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>i</span>
        <span className={`inline-block animate-bounce-slow animation-delay-400 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>m</span>
        <span className={`inline-block animate-bounce-slow animation-delay-500 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>a</span>
        <span className={`inline-block animate-bounce-slow animation-delay-600 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>t</span>
        <span className={`inline-block animate-bounce-slow animation-delay-700 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>e</span>
        <span className={`inline-block animate-bounce-slow animation-delay-800 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>H</span>
        <span className={`inline-block animate-bounce-slow animation-delay-900 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>u</span>
        <span className={`inline-block animate-bounce-slow animation-delay-1000 ${isDark ? 'text-white' : 'text-blue-600'} transform hover:scale-110 transition-transform`}>b</span>
      </div>

      {/* Study Progress Bar */}
      <div className={`w-48 h-2 ${isDark ? 'bg-white/20' : 'bg-blue-600/20'} rounded-full overflow-hidden mb-3`}>
        <div className={`h-full ${isDark ? 'bg-white' : 'bg-blue-600'} rounded-full animate-progress`}></div>
      </div>

      {/* Loading Text with Study Context */}
      <div className={`${isDark ? 'text-white/80' : 'text-blue-600/80'} text-sm font-medium animate-pulse`}>
        {text || "Preparing your learning journey..."}
      </div>

      {/* Floating Study Icons */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`w-6 h-6 ${isDark ? 'text-blue-500' : 'text-blue-600/60'} animate-spin-slow`}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4V6.28C14.6 6.54 15.17 6.86 15.69 7.25L17.41 5.53C18.2 4.74 19.46 4.74 20.25 5.53C21.04 6.32 21.04 7.58 20.25 8.37L18.53 10.09C18.92 10.61 19.24 11.18 19.5 11.78H22C23.1 11.78 24 12.68 24 13.78S23.1 15.78 22 15.78H19.72C19.46 16.38 19.14 16.95 18.75 17.47L20.47 19.19C21.26 19.98 21.26 21.24 20.47 22.03C19.68 22.82 18.42 22.82 17.63 22.03L15.91 20.31C15.39 20.7 14.82 21.02 14.22 21.28V24C14.22 25.1 13.32 26 12.22 26S10.22 25.1 10.22 24V21.72C9.62 21.46 9.05 21.14 8.53 20.75L6.81 22.47C6.02 23.26 4.76 23.26 3.97 22.47C3.18 21.68 3.18 20.42 3.97 19.63L5.69 17.91C5.3 17.39 4.98 16.82 4.72 16.22H2C0.9 16.22 0 15.32 0 14.22S0.9 12.22 2 12.22H4.28C4.54 11.62 4.86 11.05 5.25 10.53L3.53 8.81C2.74 8.02 2.74 6.76 3.53 5.97C4.32 5.18 5.58 5.18 6.37 5.97L8.09 7.69C8.61 7.3 9.18 6.98 9.78 6.72V4C9.78 2.9 10.68 2 11.78 2H12Z"/>
          </svg>
        </div>
      </div>

      <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
        <div className={`w-5 h-5 ${isDark ? 'text-blue-500' : 'text-blue-600/50'} animate-bounce animation-delay-800`}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2">
        <div className={`w-4 h-4 ${isDark ? 'text-blue-500' : 'text-blue-600/40'} animate-pulse animation-delay-1000`}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A8.98,8.98 0 0,0 21,12A9,9 0 0,0 12,3Z"/>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          33% { transform: translateY(-10px) rotate(5deg); opacity: 1; }
          66% { transform: translateY(-5px) rotate(-3deg); opacity: 0.8; }
        }

        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
}

export default Loader;
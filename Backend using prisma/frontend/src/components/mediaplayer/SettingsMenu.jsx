import { useState } from 'react';

export default function SettingsMenu({ currentQuality, qualities, currentSpeed, onQualityChange, onSpeedChange, }) 
{
  const [isOpen, setIsOpen] = useState(false);
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div className="relative">

      <button onClick={() => setIsOpen(!isOpen)} className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-2 sm:p-3 rounded-full shadow-md transition-all flex items-center justify-center" title="Settings" >
        <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.3-.06.62-.06.94s.02.64.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.08-.47-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </button>

      {isOpen 
      && 
      (
        <div className="absolute bottom-14 right-0 bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-lg shadow-xl p-2 sm:p-3 w-40 sm:w-48 border border-blue-500/30">

          <div className="mb-2 sm:mb-3">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white mb-0.5 sm:mb-1">Quality</h4>
            {qualities.map((quality) => (
              <button key={quality} onClick={() => {onQualityChange(quality);setIsOpen(false);}}className={`block w-full text-left px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md transition-colors duration-200 ${ quality === currentQuality ? 'bg-blue-900/70 text-white' : 'hover:bg-blue-500/50 hover:text-white'}`}>
                {quality}
              </button>
            ))}
          </div>

          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold text-white mb-0.5 sm:mb-1">Playback Speed</h4>
            {speeds.map((speed) => (
              <button key={speed} onClick={() => { onSpeedChange(speed); setIsOpen(false); }} className={`block w-full text-left px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md transition-colors duration-200 ${ speed === currentSpeed ? 'bg-blue-900/70 text-white' : 'hover:bg-blue-500/50 hover:text-white' }`}>
                {speed}x
              </button>
            ))}
          </div>

        </div>
      )}
      
    </div>
  );
}
export default function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }) 
{
  const progress = volume * 100;

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">

      <button onClick={onToggleMute} className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-2 sm:p-3 rounded-full shadow-md transition-all flex items-center justify-center" title={isMuted ? 'Unmute' : 'Mute'} >
        {isMuted || volume === 0 
        ? 
        (
          <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
          </svg>
        ) 
        : 
        (
          <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
  
      <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolumeChange(parseFloat(e.target.value))} className="w-16 sm:w-20 h-1 sm:h-1 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #1e3a8a ${progress}%, #93c5fd ${progress}%)`, }} />
      
    </div>
  );
}

// xkzj6gnqt
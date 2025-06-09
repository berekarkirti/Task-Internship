export default function PlayerControls({ isPlaying, onPlayPause, onNext, onPrev, disableNext, disablePrev,}) 
{
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">

      <button onClick={onPrev} disabled={disablePrev} className="bg-gradient-to-br from-gray-900 to-blue-900 text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full shadow-md disabled:opacity-50 transition-all flex items-center justify-center" title="Previous" >
        <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6h2v12H6zm12 0L10 12l8 6V6z" />
        </svg>
      </button>

      <button onClick={onPlayPause} className="bg-gradient-to-br from-gray-900 to-blue-900 text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full shadow-md transition-all flex items-center justify-center" title={isPlaying ? 'Pause' : 'Play'} >
        {isPlaying 
        ? 
        (
          <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) 
        : 
        (
          <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        )}
      </button>

      <button onClick={onNext} disabled={disableNext} className="bg-gradient-to-br from-gray-900 to-blue-900 text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full shadow-md disabled:opacity-50 transition-all flex items-center justify-center" title="Next" >
        <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6h2v12h-2zm-12 0l8 6-8 6V6z" />
        </svg>
      </button>
      
    </div>
  );
}
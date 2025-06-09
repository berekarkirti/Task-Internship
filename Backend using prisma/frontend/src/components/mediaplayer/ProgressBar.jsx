import { formatTime } from '../../lib/utils';

export default function ProgressBar({ currentTime, duration, onChange }) 
{
  const progress = (currentTime / (duration || 1)) * 100;

  return (
    <div className="flex items-center space-x-2 sm:space-x-3 w-full">
      <span className="text-blue-950 text-xs sm:text-sm font-semibold">{formatTime(currentTime)}</span>
      <input type="range" min="0" max={duration || 100} value={currentTime} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full h-1 sm:h-1.5 rounded-full appearance-none cursor-pointer" style={{background: `linear-gradient(to right, #1e3a8a ${progress}%, #93c5fd ${progress}%)`,}}/>
      <span className="text-blue-950 text-xs sm:text-sm font-semibold">{formatTime(duration)}</span>
    </div>
  );
}
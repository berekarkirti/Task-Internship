// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import PlayerControls from './PlayerControls';
// import ProgressBar from './ProgressBar';
// import VolumeControl from './VolumeControl';
// import SettingsMenu from './SettingsMenu';

// export default function MediaPlayer({ playlist }) 
// {
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const [play, setPlay] = useState(false);
//   const [time, setTime] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [vol, setVol] = useState(1);
//   const [mute, setMute] = useState(false);
//   const [full, setFull] = useState(false);
//   const [vidIdx, setVidIdx] = useState(0);
//   const [speed, setSpeed] = useState(1);
//   const [qual, setQual] = useState('720p');
//   const [show, setShow] = useState(true);
//   const [error, setError] = useState(null);

//   const qualities = 
//   [
//     { label: '480p', src: playlist[vidIdx].src.replace('.mp4', '-480p.mp4') },
//     { label: '720p', src: playlist[vidIdx].src },
//     { label: '1080p', src: playlist[vidIdx].src.replace('.mp4', '-1080p.mp4') },
//   ];

//   useEffect(() => 
//   {
//     const video = videoRef.current;

//     const selectedQuality = qualities.find((q) => q.label === qual) || qualities[1];

//     video.src = selectedQuality.src;

//     video.load();

//     video.currentTime = time;

//     video.onerror = () => setError(`Failed to load ${qual}`);if (play) 
//     {
//       video.play().catch(() => setError('Playback failed'))
//     };

//   }, [vidIdx, qual]);

//   useEffect(() => 
//   {
//     const video = videoRef.current;

//     // Updates current video time
//     const updateTime = () => 
//     {
//       setTime(video.currentTime);
//     }

//     // Sets total video duration
//     const updateTotal = () => 
//     {
//       setTotal(video.duration);
//     }

//     video.addEventListener('timeupdate', updateTime);
//     video.addEventListener('durationchange', updateTotal);

//     return () => 
//     {
//       video.removeEventListener('timeupdate', updateTime);
//       video.removeEventListener('durationchange', updateTotal);
//     };

//   }, []);

//   // Plays or pauses the video
//   const togglePlay = () => 
//   {
//     const video = videoRef.current;

//     if (play) 
//     {
//       video.pause();
//     } 
//     else 
//     {
//       video.play().catch(() => setError('Playback failed'));
//     }
//     setPlay(!play);
//   };

//   // Changes video progress to new time
//   const changeTime = (newTime) => 
//   {
//     const video = videoRef.current;
//     video.currentTime = newTime;
//     setTime(newTime);
//   };

//   // Adjusts video volume
//   const changeVol = (newVol) => 
//   {
//     const video = videoRef.current;
//     video.volume = newVol;
//     setVol(newVol);
//     setMute(newVol === 0);
//   };

//   // Mutes or unmutes the video
//   const toggleMute = () => 
//   {
//     const video = videoRef.current;

//     if (mute) 
//     {
//       video.volume = vol || 1;
//       setVol(vol || 1);
//     } 
//     else 
//     {
//       video.volume = 0;
//       setVol(0);
//     }
//     setMute(!mute);
//   };

//   // Toggles fullscreen mode
//   const toggleFull = () => 
//   {
//     const container = containerRef.current;

//     if (!full) 
//     {
//       if (container.requestFullscreen) 
//       {
//         container.requestFullscreen();
//       }
//     } 
//     else 
//     {
//       if (document.exitFullscreen) 
//       {
//         document.exitFullscreen();
//       }
//     }
//     setFull(!full);
//   };

//   // Plays next video in playlist
//   const nextVid = () => 
//   {
//     setVidIdx((prev) => (prev + 1) % playlist.length);
//     setPlay(true);setError(null);
//   };

//   // Plays previous video in playlist
//   const prevVid = () => 
//   {
//     setVidIdx((prev) => (prev - 1 + playlist.length) % playlist.length);
//     setPlay(true);setError(null);
//   };

//   // Changes video playback speed
//   const changeSpeed = (newSpeed) => 
//   {
//     videoRef.current.playbackRate = newSpeed;
//     setSpeed(newSpeed);
//   };

//   // Changes video quality
//   const changeQual = (newQual) => 
//   {
//     const video = videoRef.current;

//     const currentTime = video.currentTime;

//     const wasPlaying = play;

//     setQual(newQual);

//     video.currentTime = currentTime;

//     if (wasPlaying) 
//     {
//       video.play().catch(() => setError('Playback failed'))
//     };
//   };

//   return (
//     <div ref={containerRef} className="relative w-full max-w-[90vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl bg-gradient-to-br from-gray-100 to-white rounded-xl overflow-hidden shadow-2xl ring-1 ring-white" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} >{error && <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center p-2 text-xs sm:text-sm">{error}</div>}

//       <video ref={videoRef} className="w-full h-auto rounded-t-xl aspect-video" onClick={togglePlay} >
//         <source src={playlist[vidIdx].src} type="video/mp4" />
//       </video>

//       <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-sm p-2 sm:p-3 md:p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>

//         <ProgressBar currentTime={time} duration={total} onChange={changeTime} />

//         <div className="flex items-center justify-between mt-2 sm:mt-3">

//           <PlayerControls isPlaying={play} onPlayPause={togglePlay} onNext={nextVid} onPrev={prevVid} disableNext={vidIdx === playlist.length - 1} disablePrev={vidIdx === 0} />

//           <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">

//             <VolumeControl volume={vol} isMuted={mute} onVolumeChange={changeVol} onToggleMute={toggleMute} />

//             <SettingsMenu currentQuality={qual} qualities={qualities.map((q) => q.label)} currentSpeed={speed} onQualityChange={changeQual} onSpeedChange={changeSpeed} />

//             <button onClick={toggleFull} className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-2 sm:p-3 rounded-full shadow-md transition-all flex items-center justify-center" title={full ? 'Exit Fullscreen' : 'Fullscreen'} >
//               {full 
//               ? 
//               (
//                 <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M5 5h5v2H7v3H5V5zm14 0h-5v2h3v3h2V5zm0 14h-2v-3h-3v-2h5v5zM5 19h5v-2H7v-3H5v5z" />
//                 </svg>
//               ) 
//               : 
//               (
//                 <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M7 7H5v5h2V9h3V7H7zm7 0v2h3v3h2V7h-5zm-7 10v-2H5v5h5v-2H7zm10 2h-3v-2h-2v5h5v-3z" />
//                 </svg>
//               )}
//             </button>

//           </div>

//         </div>

//       </div>
      
//     </div>
//   );
// }

'use client';
import { useState, useRef, useEffect } from 'react';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import SettingsMenu from './SettingsMenu';

export default function MediaPlayer({ playlist }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [time, setTime] = useState(0);
  const [total, setTotal] = useState(0);
  const [vol, setVol] = useState(1);
  const [mute, setMute] = useState(false);
  const [full, setFull] = useState(false);
  const [vidIdx, setVidIdx] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [qual, setQual] = useState('720p');
  const [show, setShow] = useState(true);
  const [error, setError] = useState(null);

  // Define available qualities for the current video
  const qualities = [
    { label: '480p', src: playlist[vidIdx]?.src.replace('.mp4', '-480p.mp4') },
    { label: '720p', src: playlist[vidIdx]?.src },
    { label: '1080p', src: playlist[vidIdx]?.src.replace('.mp4', '-1080p.mp4') },
  ];

  // Function to load video with fallback to 720p
  const loadVideo = (selectedQual) => {
    const video = videoRef.current;
    console.log(video)
    const selectedQuality = qualities.find((q) => q.label === selectedQual) || qualities[1]; // Default to 720p
    let srcToLoad = selectedQuality.src;
    let finalQual = selectedQual;

    // Check if the source exists (basic check)
    video.src = srcToLoad;
    video.load();
    video.currentTime = time;

    if (play) {
      video.play().catch(() => {
        if (selectedQual !== '720p') {
          setError(`Quality ${selectedQual} not available, switching to 720p`);
          setQual('720p');
          video.src = qualities[1].src; // Fallback to 720p
          video.load();
          video.currentTime = time;
          video.play().catch(() => setError('Playback failed'));
        } else {
          setError('Playback failed');
        }
      });
    }
  };

  useEffect(() => {
    loadVideo(qual);
  }, [vidIdx, qual]);

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => setTime(video.currentTime);
    const updateTotal = () => setTotal(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('durationchange', updateTotal);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('durationchange', updateTotal);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (play) {
      video.pause();
    } else {
      video.play().catch(() => setError('Playback failed'));
    }
    setPlay(!play);
  };

  const changeTime = (newTime) => {
    const video = videoRef.current;
    video.currentTime = newTime;
    setTime(newTime);
  };

  const changeVol = (newVol) => {
    const video = videoRef.current;
    video.volume = newVol;
    setVol(newVol);
    setMute(newVol === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (mute) {
      video.volume = vol || 1;
      setVol(vol || 1);
    } else {
      video.volume = 0;
      setVol(0);
    }
    setMute(!mute);
  };

  const toggleFull = () => {
    const container = containerRef.current;
    if (!full) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setFull(!full);
  };

  const nextVid = () => {
    setVidIdx((prev) => (prev + 1) % playlist.length);
    setPlay(true);
    setError(null);
  };

  const prevVid = () => {
    setVidIdx((prev) => (prev - 1 + playlist.length) % playlist.length);
    setPlay(true);
    setError(null);
  };

  const changeSpeed = (newSpeed) => {
    videoRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const changeQual = (newQual) => {
    const video = videoRef.current;
    const currentTime = video.currentTime;
    const wasPlaying = play;

    setQual(newQual);
    loadVideo(newQual);

    video.currentTime = currentTime;
    if (wasPlaying) {
      video.play().catch(() => setError('Playback failed'));
    }
  };

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[90vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl bg-gradient-to-br from-gray-100 to-white rounded-xl overflow-hidden shadow-2xl ring-1 ring-white"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center p-2 text-xs sm:text-sm">
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-auto rounded-t-xl aspect-video"
        onClick={togglePlay}
      >
        <source src={playlist[vidIdx]?.src} type="application/x-mpegURL" />
      </video>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-sm p-2 sm:p-3 md:p-4 transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ProgressBar currentTime={time} duration={total} onChange={changeTime} />

        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <PlayerControls
            isPlaying={play}
            onPlayPause={togglePlay}
            onNext={nextVid}
            onPrev={prevVid}
            disableNext={vidIdx === playlist.length - 1}
            disablePrev={vidIdx === 0}
          />

          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <VolumeControl
              volume={vol}
              isMuted={mute}
              onVolumeChange={changeVol}
              onToggleMute={toggleMute}
            />

            <SettingsMenu
              currentQuality={qual}
              qualities={qualities.map((q) => q.label)}
              currentSpeed={speed}
              onQualityChange={changeQual}
              onSpeedChange={changeSpeed}
            />

            <button
              onClick={toggleFull}
              className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-2 sm:p-3 rounded-full shadow-md transition-all flex items-center justify-center"
              title={full ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {full ? (
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5h5v2H7v3H5V5zm14 0h-5v2h3v3h2V5zm0 14h-2v-3h-3v-2h5v5zM5 19h5v-2H7v-3H5v5z" />
                </svg>
              ) : (
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 7H5v5h2V9h3V7H7zm7 0v2h3v3h2V7h-5zm-7 10v-2H5v5h5v-2H7zm10 2h-3v-2h-2v5h5v-3z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
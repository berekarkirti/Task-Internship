// import MediaPlayer from '../../../components/mediaplayer/MediaPlayer';

// export default function Player() 
// {
//   const playlist = 
//   [
//     { src: '/Screen Recording 2025-02-20 194647.mp4', thumbnail: '/Kids Cartoon.jpeg', title: 'Video 1' },
//     { src: '/Interview Task.mp4', thumbnail: '/Kids Cartoon.jpeg', title: 'Video 2' },
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 px-4 sm:px-6">

//       <div className="w-full max-w-[95vw] sm:max-w-4xl md:max-w-5xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white m-auto">

//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 text-center tracking-tight">
//           Media Player
//         </h1>

//         <MediaPlayer playlist={playlist} />

//       </div>
//     </div>
//   );
// }

'use client';
import { useSearchParams } from 'next/navigation';
import MediaPlayer from '../../../components/mediaplayer/MediaPlayer';

export default function Player() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('videoUrl');

  if (!videoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 px-4 sm:px-6">
        <div className="w-full max-w-[95vw] sm:max-w-4xl md:max-w-5xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white m-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 text-center tracking-tight">
            Media Player
          </h1>
          <p className="text-red-500 text-center">No video URL provided.</p>
        </div>
      </div>
    );
  }

  const playlist = [
    {
      src: videoUrl,
      thumbnail: '/Kids Cartoon.jpeg', // Placeholder thumbnail (you can make this dynamic if needed)
      title: 'Course Video', // Placeholder title (you can pass this from CourseCard if needed)
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 px-4 sm:px-6">
      <div className="w-full max-w-[95vw] sm:max-w-4xl md:max-w-5xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white m-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 text-center tracking-tight">
          Media Player
        </h1>
        <MediaPlayer playlist={playlist} />
      </div>
    </div>
  );
}
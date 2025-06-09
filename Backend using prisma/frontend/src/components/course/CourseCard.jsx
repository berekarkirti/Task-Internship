// import Link from "next/link";

// export default function CourseCard({ course }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
//       <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
//       <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
//        <Link href={`/dashboard/player/${course.videoUrl}`} 
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
      
//         Watch Video
//       </Link>
//     </div>
//   );
// }

'use client';
import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
      <Link href={`/dashboard/player?videoUrl=${encodeURIComponent(course.videoUrl)}`}>
        <button className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Watch Video
        </button>
      </Link>
    </div>
  );
}
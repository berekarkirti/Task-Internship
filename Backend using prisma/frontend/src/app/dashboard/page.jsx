// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import CourseCard from '../../components/course/CourseCard';
// import Link from 'next/link';

// export default function Dashboard() {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(process.env.NEXT_PUBLIC_API_URL);
//         console.log('API Response:', response.data);

//         if (Array.isArray(response.data.data)) {
//           setCourses(response.data.data);
//         } else if (Array.isArray(response.data)) {
//           setCourses(response.data);
//         } else if (Array.isArray(response.data.courses)) {
//           setCourses(response.data.courses);
//         } else {
//           setError('Unexpected response format from server.');
//         }
//       } catch (error) {
//         setError('Error fetching courses. Please try again.');
//         console.error('Error fetching courses:', error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold text-gray-800">Course Dashboard</h1>
//         <Link href="/dashboard/add-course">
//           <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
//             Add New Course
//           </button>
//         </Link>
//       </div>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {courses.length === 0 ? (
//         <p className="text-gray-600 text-center">No courses available. Add a new course to get started!</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <CourseCard key={course.id} course={course} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../../components/course/CourseCard';
import Link from 'next/link';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL);
        console.log('API Response:', response.data);

        if (Array.isArray(response.data.data)) {
          setCourses(response.data.data);
        } else if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          setError('Unexpected response format from server.');
        }
      } catch (error) {
        setError('Error fetching courses. Please try again.');
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Course Dashboard</h1>
        <Link href="/dashboard/add-course">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add New Course
          </button>
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {courses.length === 0 ? (
        <p className="text-gray-600 text-center">No courses available. Add a new course to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
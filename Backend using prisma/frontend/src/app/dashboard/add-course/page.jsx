
'use client';
import AddCourseForm from '../../../components/course/AddCourseForm';

export default function AddCourse() {
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen text-black">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Add New Course</h1>
      <AddCourseForm />
    </div>
  );
}
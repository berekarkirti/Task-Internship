import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Course Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage your courses easily and efficiently as an admin.
        </p>
        <Link href="/dashboard">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
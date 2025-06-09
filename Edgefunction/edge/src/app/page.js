import Link from 'next/link';

export default function HomePage() 
{
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Our Store</h1>
      <p className="text-lg text-center mb-4">Browse our collection of amazing products!</p>
      <div className="text-center">
        <Link href="/products" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition" > View Products</Link>
      </div>
    </div>
  );
}

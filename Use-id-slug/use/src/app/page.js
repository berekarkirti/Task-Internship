import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Product Store</h1>
      <p className="text-lg text-gray-600">
        Visit{" "}
        <Link
          href="/products"
          className="text-teal-600 font-semibold hover:underline"
        >
          Products
        </Link>{" "}
        to see the catalog.
      </p>
    </div>
  );
}

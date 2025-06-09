import Link from 'next/link';
import axios from 'axios';

async function getProducts() 
{
  try 
  {
    const response = await axios.get('https://fakestoreapi.com/products?limit=5');
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() 
{
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">

      <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-12 tracking-tight animate-fade-in">
        Our Products
      </h2>

      <div className="max-w-7xl mx-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" >
                
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-100/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="p-6 relative z-10">

                  <div className="flex items-center justify-center mb-6">
                    <img src={product.image} alt={product.title} className="w-full h-64 object-contain rounded-lg transform transition-transform duration-500 hover:scale-105" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{product.title}</h3>

                  <p className="text-2xl font-semibold text-indigo-600 mb-4">${product.price}</p>

                  <Link href={`/products/${product.id}`}>
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg tracking-wide hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 focus:ring-4 focus:ring-indigo-300">View Details</button>
                  </Link>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl font-semibold text-gray-600 animate-pulse">No products available</p>
          </div>
        )}
      </div>
      
    </div>
  );
}
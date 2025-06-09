export default async function ProductsPage() 
{
  try 
  {
    const res = await fetch('https://fakestoreapi.com/products', 
    {
      cache: 'force-cache',
    });

    if (!res.ok) 
    {
      throw new Error('Failed to fetch products');
    }

    const products = await res.json();

    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">

        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
          Our Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl" >

              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-48 object-contain p-4" />
              </div>

              <div className="p-4">

                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="px-3 py-1 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-600 transition">
                    Add to Cart
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    );
  } 
  catch (error) 
  {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Failed to load products. Please try again later.</p>
      </div>
    );
  }
}
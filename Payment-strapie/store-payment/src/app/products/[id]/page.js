import axios from 'axios';
import Link from 'next/link';
import CheckoutForm from '../../../components/CheckoutForm';

async function getProduct(id) 
{
  try 
  {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetail({ params }) 
{
  const product = await getProduct(params.id);

  if (!product)
  {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
        <div className="text-2xl font-bold text-red-700 animate-pulse">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-6">

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100">
    
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-pink-50/30 z-0"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100/20 rounded-2xl transform rotate-3"></div>
            <img src={product.image} alt={product.title} className="w-full max-h-96 object-contain rounded-2xl transform transition-transform duration-500 hover:scale-110" />
          </div>

          <div className="flex flex-col justify-between space-y-6">

            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 animate-fade-in">{product.title}</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">{product.description}</p>
              <p className="text-3xl font-bold text-indigo-600 mb-4">${product.price}</p>
            </div>

            <form action="/api/checkout" method="POST" className="space-y-4">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="price" value={product.price} />
              <input type="hidden" name="title" value={product.title} />
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg tracking-wide hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-indigo-300" >Add to Cart</button>
            </form>

            <CheckoutForm productId={product.id} price={product.price} title={product.title} />

            <Link href="/" className="inline-flex items-center text-indigo-500 font-semibold text-lg hover:text-indigo-700 transition-colors duration-200 group" >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Products
            </Link>

          </div>

        </div>

      </div>
      
    </div>
  );
}
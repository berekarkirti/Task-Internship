"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryTable from '../components/InventoryTable';
import ProductForm from '../components/ProductForm';
import { predictLowStock } from '../utills/aiCount';

export default function Home() 
{
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => 
  {
    async function fetchProducts() 
    {
      try 
      {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/products');
     
        const processedProducts = response.data.map(product => predictLowStock({ ...product, quantity: Number(product.quantity),  dailySales: Number(product.dailySales),  }));
        setProducts(processedProducts);
      } 
      catch (err) 
      {
        setError(`Failed to load products: ${err.response?.data?.error || err.message}`);
      } 
      finally 
      {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>product.name.toLowerCase().includes(search.toLowerCase())).filter(product => {const include = lowStockOnly ? product.isLowStock : true;
    if (lowStockOnly) 
    {
      console.log(`Filtering ${product.name}: isLowStock=${product.isLowStock}, included=${include}`);
    }
    return include;
    });

  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage,page * itemsPerPage);

  const handleAdd = async (product) => 
  {
    try 
    {
      await axios.post('/api/products', product);
      const response = await axios.get('/api/products');
      const processedProducts = response.data.map(p => predictLowStock({ ...p, quantity: Number(p.quantity), dailySales: Number(p.dailySales), }));
      setProducts(processedProducts);
      setShowForm(false);
    } 
    catch (err) 
    {
      console.error('Error adding product:', err.response?.data || err.message);
      setError(`Failed to add product: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleEdit = async (product) => 
  {
    try 
    {
      await axios.put('/api/products', { id: product._id, ...product });
      const response = await axios.get('/api/products');
      const processedProducts = response.data.map(p => predictLowStock({ ...p, quantity: Number(p.quantity), dailySales: Number(p.dailySales), }));
      setProducts(processedProducts);
      setShowForm(false);
      setEditProduct(null);
    } 
    catch (err) 
    {
      console.error('Error updating product:', err.response?.data || err.message);
      setError(`Failed to update product: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDelete = async (id) => 
  {
    try 
    {
      await axios.delete('/api/products', { data: { id } });
      const response = await axios.get('/api/products');
      const processedProducts = response.data.map(p => predictLowStock({ ...p, quantity: Number(p.quantity), dailySales: Number(p.dailySales), }));
      setProducts(processedProducts);
    } 
    catch (err) 
    {
      console.error('Error deleting product:', err.response?.data || err.message);
      setError(`Failed to delete product: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 text-black">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800">Inventory Dashboard</h1>
        <button className="btn-primary mb-6" onClick={() => setShowForm(true)} > Add Product </button>

        {loading && <p className="text-center text-gray-600">Loading products...</p>}

        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading 
        && 
        !error 
        && (
          <>
            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Search products..." className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={search} onChange={e => setSearch(e.target.value)} />
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" checked={lowStockOnly} onChange={e => setLowStockOnly(e.target.checked)} /> Low Stock Only
                </label>
              </div>
            </div>

            <div className="card">
              <InventoryTable inventory={paginatedProducts} onEdit={product => { setEditProduct(product); setShowForm(true); }} onDelete={handleDelete} />
              <div className="flex justify-between mt-4">
                <button className="btn-primary" disabled={page === 1} onClick={() => setPage(page - 1)} > Previous </button>
                <button className="btn-primary" disabled={page * itemsPerPage >= filteredProducts.length} onClick={() => setPage(page + 1)} >Next</button>
              </div>
            </div>

            {showForm && (
              <ProductForm onSubmit={editProduct ? handleEdit : handleAdd} initialData={editProduct} onCancel={() => { setShowForm(false); setEditProduct(null); }} />
            )}
          </>
        )}
        
      </div>

    </div>
  );
}
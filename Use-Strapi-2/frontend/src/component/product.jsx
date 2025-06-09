'use client';
import React, { useEffect, useState } from 'react';
import { get, create, update, deleteProduct } from '@/lib/api';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetch = async () => 
  {
    const fetched = await get();
    if (fetched) setProducts(fetched);
  };

  useEffect(() => 
  {
    fetch();
  }, []);

  const handleInputChange = (e) => 
  {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    const createdProduct = await create(newProduct);

    if (createdProduct)
    {
      setProducts((prev) => [...prev, createdProduct]);
      setNewProduct({ name: '', price: '' });
      setShowForm(false);
    }
  };

  const handleUpdateProduct = (product) => 
  {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = async (documentId) => 
  {
    const isDeleted = await deleteProduct(documentId);

    if (isDeleted)
    {
      setProducts((prev) =>prev.filter((product) => product.documentId !== documentId));
      alert('Product deleted');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white">

      {/* Add */}
      <div className="flex justify-end"> 
        <button onClick={() => setShowForm(true)} className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition" >Add Product</button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 p-6 rounded-lg shadow-md space-y-4" >
          <h2 className="text-lg font-semibold text-teal-700">Add Product</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-teal-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700"> Price </label>
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-teal-400" required />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" > Cancel </button> <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700" > Submit </button>
          </div>
        </form>
      )}

      {/* Update Product Form */}
      {selectedProduct && (
        <form onSubmit={async (e) => { 

            e.preventDefault();

            const updated = await update(selectedProduct.documentId, selectedProduct);

            if (updated) 
            {
              setProducts((prev) =>
                prev.map((p) =>p.documentId === selectedProduct.documentId ? updated : p)
              );
              setSelectedProduct(null);
            }

          }}
          className="bg-white border border-gray-300 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-lg font-semibold text-teal-700">Update Product</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700"> Name </label> <input type="text" value={selectedProduct.name} onChange={(e) =>setSelectedProduct({ ...selectedProduct, name: e.target.value })}className=" text-black mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-yellow-400"required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" value={selectedProduct.price} onChange={(e) =>setSelectedProduct({ ...selectedProduct, price: e.target.value })}className=" text-black mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-yellow-400"required/>
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setSelectedProduct(null)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" >Cancel</button>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" >Update</button>
          </div>
        </form>
      )}

      {/* Product List */}
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.documentId} className="p-5 border rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-teal-700">{product.name}</h2>
            <p className="text-gray-700">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">ID: {product.documentId}</p>
            <div className="mt-3 flex space-x-2">
              <button onClick={() => handleUpdateProduct(product)} className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" > Update </button> 
              <button onClick={() => handleDeleteProduct(product.documentId)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600" >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;

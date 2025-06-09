"use client";

import { createProduct, deleteProduct, fetchProducts, updateProduct } from "@/redux-counter/curd/postthunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function home3() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [newProduct, setNewProduct] = useState({
    title: "",
    body: "",
    price: "",
    category: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => 
  {
    dispatch(fetchProducts());

  }, [dispatch]);

  const handleCreate = () => 
  {
    if (newProduct.title && newProduct.price && newProduct.category && newProduct.image) 
    {
      dispatch(createProduct(newProduct));
      setNewProduct({ title: "", body: "", price: "", category: "", image: "" });
    }
  };

  const handleEdit = (product) => 
  {
    setEditProduct(product); 
  };

  const handleUpdateSubmit = () => 
  {
    if (editProduct)
    {
      dispatch(updateProduct({ id: editProduct.id, data: editProduct }));
      setEditProduct(null);
    }
  };

  const handleDelete = (id) => 
  {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">


      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Product List</h1>


      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editProduct ? "Update Product" : "Add Product"}</h2>
        <input type="text" placeholder="Title" value={editProduct ? editProduct.title : newProduct.title} onChange={(e) => editProduct ? setEditProduct({ ...editProduct, title: e.target.value }) : setNewProduct({ ...newProduct, title: e.target.value })} className="w-full mb-4 p-2 border text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="text" placeholder="Body" value={editProduct ? editProduct.body : newProduct.body} onChange={(e) => editProduct ? setEditProduct({ ...editProduct, body: e.target.value }) : setNewProduct({ ...newProduct, body: e.target.value }) } className="w-full mb-4 p-2 border text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="number" placeholder="Price" value={editProduct ? editProduct.price : newProduct.price} onChange={(e) => editProduct ? setEditProduct({ ...editProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })}className="w-full mb-4 p-2 border text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="text" placeholder="Category" value={editProduct ? editProduct.category : newProduct.category} onChange={(e) => editProduct ? setEditProduct({ ...editProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value }) } className="w-full mb-4 p-2 border text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" placeholder="Image URL" value={editProduct ? editProduct.image : newProduct.image} onChange={(e) => editProduct ? setEditProduct({ ...editProduct, image: e.target.value }) : setNewProduct({ ...newProduct, image: e.target.value }) } className="w-full mb-4 p-2 border text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={editProduct ? handleUpdateSubmit : handleCreate} className={`w-full py-2 rounded-md ${editProduct ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white transition`}>{editProduct ? "Update Product" : "Add Product"}</button>
      </div>

   
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.body}</p>
            <div className="text-sm text-gray-500 mb-4">Category: {product.category}</div>
            <div className="text-lg font-bold text-gray-800 mb-4">${product.price}</div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" >Edit</button>
              <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

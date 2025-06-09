"use client";

import { useState } from 'react';

export default function ProductForm({ onSubmit, initialData, onCancel }) 
{
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    quantity: initialData?.quantity || 0,
    dailySales: initialData?.dailySales || 0,
    price: initialData?.price || 0,
    salesHistory: Array.isArray(initialData?.salesHistory) ? initialData.salesHistory : [],
    _id: initialData?._id || undefined,
  });

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    if (!formData.name || formData.quantity < 0 || formData.dailySales < 0 || formData.price < 0) 
    {
      alert('Please fill in all fields with valid values.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="card max-w-md w-full">

        <h2 className="text-2xl font-bold mb-4">
          {initialData ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit}>
          {initialData 
          && 
          (
            <div className="mb-4">
              <label className="block text-gray-700">ID</label>
              <input type="text" className="w-full p-2 border rounded-lg bg-gray-100" value={formData._id} disabled readOnly />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border rounded-lg" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input type="number" min="0" className="w-full p-2 border rounded-lg" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })} required/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Daily Sales</label>
            <input type="number" min="0" step="0.01" className="w-full p-2 border rounded-lg" value={formData.dailySales} onChange={e => setFormData({ ...formData, dailySales: Number(e.target.value) })} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input type="number" min="0" step="0.01" className="w-full p-2 border rounded-lg" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Sales History (comma-separated)</label>
            <input type="text" className="w-full p-2 border rounded-lg" value={Array.isArray(formData.salesHistory) ? formData.salesHistory.join(',') : ''} onChange={e => setFormData({ ...formData, salesHistory: e.target.value .split(',') .map(Number) .filter(n => !isNaN(n)),})}/>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" className="btn-primary bg-gray-500" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn-primary">{initialData ? 'Update' : 'Add'}</button>
          </div>

        </form>

      </div>
      
    </div>
  );
}
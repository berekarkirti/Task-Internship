// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import ProductComponent from '@/component/product';

// const ProductPage = () =>  
// {
//   const router = useRouter();
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() =>
//   {
//     const token = localStorage.getItem('token');

//     if (!token) 
//     {
//       router.push('/login'); 
//     } 
//     else 
//     {
//       setIsAuth(true);
//     }

//   }, []);

//   if (!isAuth) 
//   {
//     return null;
//   }

//   return (
//     <>
//       <ProductComponent />
//     </>
//   );
// }

// export default ProductPage;




'use client';
import { create as createProduct, get as getProducts, update as updateProduct, deleteProduct } from '../../lib/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addImagePreviews, setAddImagePreviews] = useState({ en: [], 'gu-IN': [], pa: [], ko: [] });
  const [updateImagePreviews, setUpdateImagePreviews] = useState([]);
  const [selectedLocale, setSelectedLocale] = useState('en');

  // Define supported locales
  const locales = [
    { code: 'en', name: 'English' },
    { code: 'gu-IN', name: 'Gujarati' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ko', name: 'Korean' },
  ];

  // Add Product form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [addNames, setAddNames] = useState({ en: '', 'gu-IN': '', pa: '', ko: '' });
  const [addPrice, setAddPrice] = useState('');
  const [addImages, setAddImages] = useState({ en: [], 'gu-IN': [], pa: [], ko: [] });

  // Update Product form states
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateImages, setUpdateImages] = useState([]);
  const [updateLocale, setUpdateLocale] = useState(''); 

  // Fetch products based on selected locale
  const fetchProducts = async () => 
  {
    setLoading(true);
    try 
    {
      const url = `http://localhost:1337/api/products?populate=*&locale=${selectedLocale}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(`Products for ${selectedLocale}:`, data);
      setProducts(data?.data || []);
    } 
    catch (error) 
    {
      console.error('Error fetching products:', error);
      setProducts([]);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  useEffect(() => 
  {
    fetchProducts();
  }, [selectedLocale]);

  // Delete a product
  const handleDelete = async (id) => 
  {
    try 
    {
      const isDeleted = await deleteProduct(id);
      if (isDeleted) 
      {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert('Product deleted');
      } 
      else 
      {
        alert('Failed to delete product. Please try again.');
      }
    } 
    catch (error) 
    {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  // Add product with localization
  const handleAddSubmit = async (e) => 
  {
    e.preventDefault();

    console.log('addNames:', addNames, 'addImages:', addImages);
    
    if (!addNames.en.trim() || !addPrice.trim() || addImages.en.length === 0)
    {
      alert('Please enter English name, price, and at least one image for English.');
      return;
    }

    try 
    {
      const token = localStorage.getItem('jwt');
      if (!token) 
      {
        alert('User is not authenticated. Please log in again.');
        return;
      }

      const uploadedImageIds = {};
      for (const locale of locales) 
      {
        const localeCode = locale.code;

        if (addImages[localeCode].length > 0) 
        {
          const formData = new FormData();
          addImages[localeCode].forEach((image) => formData.append('files', image));
          const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, 
          {
            headers: 
            {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          uploadedImageIds[localeCode] = uploadResponse.data.map((file) => file.id);
        } 
        else 
        {
          uploadedImageIds[localeCode] = [];
        }
      }

      const createdProductIds = {};
      for (const locale of locales) 
      {
        const localeCode = locale.code;

        if (addNames[localeCode].trim()) 
        {
          const productResponse = await axios.post(`http://localhost:1337/api/products?populate=*&locale=${localeCode}`,
          {
              data: 
              {
                name: addNames[localeCode],
                price: addPrice || 0,
                images: uploadedImageIds[localeCode].length > 0 ? uploadedImageIds[localeCode] : uploadedImageIds.en,
                locale: localeCode,
              },
          },
          {
              headers: 
              {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
          }
          );
          createdProductIds[localeCode] = productResponse.data.data.documentId;
        }
      }

      console.log('Products created successfully for each locale:', createdProductIds);
      setAddNames({ en: '', 'gu-IN': '', pa: '', ko: '' });
      setAddPrice('');
      setAddImages({ en: [], 'gu-IN': [], pa: [], ko: [] });
      setAddImagePreviews({ en: [], 'gu-IN': [], pa: [], ko: [] });
      setShowAddForm(false);
      fetchProducts();
      alert('Products created successfully for the specified locales!');
    } 
    catch (error) 
    {
      console.error('Error:', error.response?.data || error.message);
      alert('An error occurred while creating the products. Please try again.');
    }
  };

  // Create product with localization
  const handleUpdateSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const token = localStorage.getItem('jwt');
      if (!token) 
      {
        alert('User is not authenticated. Please log in again.');
        return;
      }

      let imageIds = [];
      if (updateImages.length > 0) 
      {
        const formData = new FormData();
        updateImages.forEach((img) => formData.append('files', img));
        const uploadRes = await axios.post('http://localhost:1337/api/upload', formData, 
        {
          headers: 
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        imageIds = uploadRes.data.map((file) => file.id);
      }

      const updated = await axios.put(`http://localhost:1337/api/products/${updateId}?populate=*&locale=${updateLocale}`,
      {
          data: 
          {
            name: updateName,
            price: updatePrice,
            ...(imageIds.length > 0 && { images: imageIds }),
            locale: updateLocale,
          },
      },
      {
          headers: 
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Product updated:', updated.data);
      alert('Product updated successfully!');
      setShowUpdateForm(false);
      setUpdateId(null);
      setUpdateName('');
      setUpdatePrice('');
      setUpdateImages([]);
      setUpdateImagePreviews([]);
      setUpdateLocale('');
      fetchProducts();
    } 
    catch (error) 
    {
      console.error('Update error:', error.response?.data || error.message);
      alert('Error updating product. Please try again.');
    }
  };

  const handleEdit = (product) => 
  {
    setUpdateId(product.documentId);
    setUpdateName(product.name);
    setUpdatePrice(product.price);
    setUpdateImages([]);
    setUpdateImagePreviews([]);
    setUpdateLocale(product.locale || selectedLocale);
    setShowUpdateForm(true);
  };

  return (
    <div className="text-center p-8 rounded-xl shadow-lg">

      {/* Select Language Dropdown */}
      <div className="mb-6">
        <label htmlFor="locale" className="text-white mr-2">Select Language:</label>
        <select id="locale" value={selectedLocale} onChange={(e) => setSelectedLocale(e.target.value)} className="p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" >
          {locales.map((locale) => 
          (
            <option key={locale.code} value={locale.code}>{locale.name}</option>
          ))}
        </select>
      </div>

      <button onClick={() => setShowAddForm(!showAddForm)} className="bg-teal-600 text-white py-3 px-6 rounded-md mb-4 mt-8 hover:bg-teal-700 transition duration-300 shadow-md" >{showAddForm ? 'Close Add Form' : 'Add Product'}</button>

      {/* Add Forms */}
      {showAddForm && (
        <div className="my-8">
          <h2 className="text-2xl mb-4 font-semibold text-white">Add Product</h2>
          <form onSubmit={handleAddSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6 text-black border border-gray-200" encType="multipart/form-data" >

            {/* English Form */}
            <div>{selectedLocale === 'en' &&
            <div>
              <h3 className="text-lg font-semibold text-gray-700">English</h3>
              <label htmlFor="addNameEn" className="block text-gray-700 font-medium">Name:</label>
              <input type="text" id="addNameEn" value={addNames.en} onChange={(e) => setAddNames({ ...addNames, en: e.target.value })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" placeholder="Enter product name in English" required/>
              <label htmlFor="addImageEn" className="block text-gray-700 font-medium mt-2">Image:</label>
              <input type="file" id="addImageEn" accept="image/*" multiple onChange={(e) => {const files = Array.from(e.target.files);setAddImages({ ...addImages, en: files });setAddImagePreviews({ ...addImagePreviews, en: files.map((file) => URL.createObjectURL(file)) }); }}className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800"required/>
              <div className="flex flex-wrap gap-4 mt-4">
                {addImagePreviews.en.map((preview, index) => (
                  <div key={index} className="relative group w-1/2 p-2">
                    <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md border border-gray-200 shadow-sm mx-auto flex justify-evenly items-center"/>
                    <button type="button" onClick={() => { const newFiles = addImages.en.filter((_, i) => i !== index); const newPreviews = addImagePreviews.en.filter((_, i) => i !== index); setAddImagePreviews({ ...addImagePreviews, en: newPreviews }); setAddImages({ ...addImages, en: newFiles }); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600" >×</button>
                  </div>
                ))}
              </div>
            </div>
            }</div>

            {/* Gujarati Form */}
            <div>{selectedLocale === 'gu-IN' &&
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Gujarati</h3>
              <label htmlFor="addNameGu" className="block text-gray-700 font-medium">Name:</label>
              <input type="text" id="addNameGu" value={addNames['gu-IN']} onChange={(e) => setAddNames({ ...addNames, 'gu-IN': e.target.value })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" placeholder="Enter product name in Gujarati" />
              <label htmlFor="addImageGu" className="block text-gray-700 font-medium mt-2">Image:</label>
              <input type="file" id="addImageGu" accept="image/*" multiple onChange={(e) => {const files = Array.from(e.target.files); setAddImages({ ...addImages, 'gu-IN': files }); setAddImagePreviews({ ...addImagePreviews, 'gu-IN': files.map((file) => URL.createObjectURL(file)) });}} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" />
              <div className="flex flex-wrap gap-4 mt-4">
                {addImagePreviews['gu-IN'].map((preview, index) => (
                  <div key={index} className="relative group w-1/2 p-2">
                    <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md border border-gray-200 shadow-sm mx-auto flex justify-evenly items-center" />
                    <button type="button" onClick={() => { const newPreviews = addImagePreviews['gu-IN'].filter((_, i) => i !== index); const newFiles = addImages['gu-IN'].filter((_, i) => i !== index); setAddImagePreviews({ ...addImagePreviews, 'gu-IN': newPreviews }); setAddImages({ ...addImages, 'gu-IN': newFiles }); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600" >×</button>
                  </div>
                ))}
              </div>
            </div>
            }</div>

            {/* Punjabi Form */}
            <div>{selectedLocale === 'pa' &&
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Punjabi</h3>
              <label htmlFor="addNamePa" className="block text-gray-700 font-medium">Name:</label>
              <input type="text" id="addNamePa" value={addNames.pa} onChange={(e) => setAddNames({ ...addNames, pa: e.target.value })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" placeholder="Enter product name in Punjabi"/>
              <label htmlFor="addImagePa" className="block text-gray-700 font-medium mt-2">Image:</label>
              <input type="file" id="addImagePa" accept="image/*" multiple onChange={(e) => { const files = Array.from(e.target.files); setAddImages({ ...addImages, pa: files });setAddImagePreviews({ ...addImagePreviews, pa: files.map((file) => URL.createObjectURL(file)) });}}className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800"/>
              <div className="flex flex-wrap gap-4 mt-4">
                {addImagePreviews.pa.map((preview, index) => (
                  <div key={index} className="relative group w-1/2 p-2">
                    <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md border border-gray-200 shadow-sm mx-auto flex justify-evenly items-center" />
                    <button type="button" onClick={() => { const newPreviews = addImagePreviews.pa.filter((_, i) => i !== index); const newFiles = addImages.pa.filter((_, i) => i !== index); setAddImagePreviews({ ...addImagePreviews, pa: newPreviews }); setAddImages({ ...addImages, pa: newFiles }); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">×</button>
                  </div>
                ))}
              </div>
            </div>
            }</div>

            {/* Korean Form */}
            <div>{selectedLocale === 'ko' &&
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Korean</h3>
              <label htmlFor="addNameKo" className="block text-gray-700 font-medium">Name:</label>
              <input type="text" id="addNameKo" value={addNames.ko} onChange={(e) => setAddNames({ ...addNames, ko: e.target.value })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" placeholder="Enter product name in Korean" />
              <label htmlFor="addImageKo" className="block text-gray-700 font-medium mt-2">Image:</label>
              <input type="file" id="addImageKo" accept="image/*" multiple onChange={(e) => { const files = Array.from(e.target.files); setAddImages({ ...addImages, ko: files }); setAddImagePreviews({ ...addImagePreviews, ko: files.map((file) => URL.createObjectURL(file)) }); }} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" />
              <div className="flex flex-wrap gap-4 mt-4">
                {addImagePreviews.ko.map((preview, index) => (
                  <div key={index} className="relative group w-1/2 p-2">
                    <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md border border-gray-200 shadow-sm mx-auto flex justify-evenly items-center" />
                    <button type="button" onClick={() => { const newPreviews = addImagePreviews.ko.filter((_, i) => i !== index); const newFiles = addImages.ko.filter((_, i) => i !== index); setAddImagePreviews({ ...addImagePreviews, ko: newPreviews }); setAddImages({ ...addImages, ko: newFiles }); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600" >×</button>
                  </div>
                ))}
              </div>
            </div>
            }</div>

            <label htmlFor="addPrice" className="block text-gray-700 font-medium">Price:</label>
            <input type="number" id="addPrice" value={addPrice} onChange={(e) => setAddPrice(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" placeholder="Enter product price" required />

            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 shadow-md" >Submit</button>
          </form>
        </div>
      )}

      {/* Update Forms */}
      {showUpdateForm && (
        <div className="my-8">
          <h2 className="text-2xl mb-4 font-semibold text-white">Update Product ({updateLocale})</h2>
          <form onSubmit={handleUpdateSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6 text-black border border-gray-200" encType="multipart/form-data" >
            <label htmlFor="updateName" className="block text-gray-700 font-medium">Name:</label>
            <input type="text" id="updateName" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" placeholder="Enter product name" required/>
            <label htmlFor="updatePrice" className="block text-gray-700 font-medium">Price:</label>
            <input type="number" id="updatePrice" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800" placeholder="Enter product price" required />
            <label htmlFor="updateImage" className="block text-gray-700 font-medium">Image:</label>
            <input type="file" id="updateImage" accept="image/*" multiple onChange={(e) => {const files = Array.from(e.target.files);setUpdateImages(files);setUpdateImagePreviews(files.map((file) => URL.createObjectURL(file))); }} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-800"/>
            <div className="flex flex-wrap gap-4 mt-4">
              {updateImagePreviews.map((preview, index) => (
                <div key={index} className="w-1/2 p-2">
                  <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-md border border-gray-200 shadow-sm mx-auto flex justify-evenly items-center" />
                </div>
              ))}
            </div>
            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 shadow-md" >Submit</button>
          </form>
        </div>
      )}

      {/* Show Data */}
      <div className="flex justify-center gap-6 flex-wrap shadow-5xl">
        {loading ? 
        (
          <p className="text-gray-500">Loading products...</p>
        ) 
        : 
        products.length > 0 ? 
        (
          products.map((item) => 
          (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 w-1/3 p-6 space-y-4" >
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {item.images && Array.isArray(item.images) 
                ? 
                (
                  item.images.map((img, imgIndex) => 
                  {
                    const imageUrl = img?.formats?.medium?.url || img?.formats?.small?.url || img?.formats?.thumbnail?.url || img?.url;
                    const finalUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
                    
                    return (
                      <div key={imgIndex} className="w-1/3 p-2">
                        <img src={`http://localhost:1337${finalUrl}`} alt={img.name || 'Product Image'} className="w-full h-32 object-cover rounded-md border border-gray-200 shadow-sm" />
                      </div>
                    );
                  })
                ) 
                : (
                  <div className="text-gray-400 p-2 w-full text-center">No images</div>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{item?.name}</h2>
              <h2 className="text-lg text-gray-600">${item?.price}</h2>
              <p className="text-md font-semibold text-gray-600">Category : {item?.category?.category}</p>
              <div className="space-x-4"> 
                <button onClick={() => handleEdit(item)} className="bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition duration-300 shadow-md" > Edit </button> 
                <button onClick={() => handleDelete(item.documentId)} className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition duration-300 shadow-md" > Delete </button>
              </div>
            </div>
          ))
        ) 
        : 
        (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
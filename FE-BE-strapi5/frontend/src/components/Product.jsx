"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import axios from "axios";

const Product = () => 
{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add"); 
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [formData, setFormData] = useState({ Name: "", Price: "", Stock: "", category: "", Image: [], });

    useEffect(() => 
    {
        const fetchData = async () => 
        {
            try 
            {
                const [productsResponse, categoriesResponse] = await Promise.all([ axios.get("http://localhost:1337/api/products?populate=*"), axios.get("http://localhost:1337/api/categories?populate=*"), ]);
                // console.log("Fetched products:", productsResponse.data.data);
                // console.log("Fetched categories:", categoriesResponse.data.data);
                setProducts(productsResponse.data.data);
                setCategories(categoriesResponse.data.data);
                setLoading(false);
            } 
            catch (err) 
            {
                setError("Failed to fetch data: " + err.message);
                setLoading(false);
            }
        };

        fetchData();

    }, []);


    const handleDelete = async (documentId) => 
    {
        try 
        {
            await axios.delete(`http://localhost:1337/api/products/${documentId}`);
            setProducts(products.filter((product) => product.documentId !== documentId));
        } 
        catch (err) 
        {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product");
        }
    };


    const handleInputChange = (e) => 
    {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? Array.from(files) : value, });
    };


    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
            const token = localStorage.getItem("token");
            // console.log("Authorization token:", token);

            if (!token) 
            {
                throw new Error("No authentication token found in localStorage");
            }

            let imageIds = [];

            if (formData.Image && formData.Image.length > 0) 
            {
                // console.log("Uploading images:", formData.Image.map((file) => file.name));
                const imageFormData = new FormData();

                formData.Image.forEach((file) => 
                {
                    imageFormData.append("files", file);
                });

                const uploadResponse = await axios.post("http://localhost:1337/api/upload", imageFormData, 
                {
                    headers: 
                    {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log("Upload response:", uploadResponse.data);
                imageIds = uploadResponse.data.map((file) => file.id);
            }

            const categoryId = formData.category && !isNaN(parseInt(formData.category)) ? parseInt(formData.category) : null;
            // console.log("Selected category ID:", categoryId);
            // console.log("Image IDs:", imageIds);

            const productData = 
            {
                data:
                {
                    Name: formData.Name,
                    Price: parseFloat(formData.Price),
                    Stock: parseInt(formData.Stock),
                    category: categoryId ? { connect: [{ id: categoryId }] } : null,
                    Image: imageIds.length > 0 ? imageIds : null,
                },
            };

            // console.log("Creating product with data:", productData);
            const response = await axios.post("http://localhost:1337/api/products", productData, 
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("Create product response:", response.data);
            setShowModal(false);
            setFormData({ Name: "", Price: "", Stock: "", category: "", Image: [] });
            alert("Product added successfully");
            window.location.reload(); 
        } 
        catch (err) 
        {
            console.error("Failed to add product:", err);
            console.error("Error response:", err.response?.data);
            alert("Failed to add product: " + (err.response?.data?.error?.message || err.message));
        }
    };


    const handleEditSubmit = async (e) => 
    {
        e.preventDefault();

        try 
        {
            const token = localStorage.getItem("token");
            // console.log("Authorization token:", token);

            if (!token) 
            {
                throw new Error("No authentication token found in localStorage");
            }

            let imageIds = [];

            if (formData.Image && formData.Image.length > 0) 
            {
                // console.log("Uploading images:", formData.Image.map((file) => file.name));
                const imageFormData = new FormData();

                formData.Image.forEach((file) => 
                {
                    imageFormData.append("files", file);
                });

                const uploadResponse = await axios.post("http://localhost:1337/api/upload", imageFormData, 
                {
                    headers: 
                    {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log("Upload response:", uploadResponse.data);
                imageIds = uploadResponse.data.map((file) => file.id);
            }

            const categoryId = formData.category && !isNaN(parseInt(formData.category)) ? parseInt(formData.category) : null;
            // console.log("Selected category ID:", categoryId);
            // console.log("Image IDs:", imageIds);

            const productData = 
            {
                data: 
                {
                    Name: formData.Name,
                    Price: parseFloat(formData.Price),
                    Stock: parseInt(formData.Stock),
                    category: categoryId ? { connect: [{ id: categoryId }] } : { disconnect: [] },
                    Image: imageIds.length > 0 ? imageIds : null,
                },
            };

            // console.log("Updating product with data:", productData);
            const response = await axios.put(`http://localhost:1337/api/products/${selectedProductId}`, productData, 
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("Update product response:", response.data);


            setProducts
            (
                products.map((product) => product.documentId === selectedProductId ? { ...product, ...response.data.data } : product)
            );

            setShowModal(false);
            setFormData({ Name: "", Price: "", Stock: "", category: "", Image: [] });
            setModalMode("add");
            setSelectedProductId(null);
            alert("Product updated successfully");
            window.location.reload();

        } 
        catch (err) 
        {
            console.error("Failed to update product:", err);
            console.error("Error response:", err.response?.data);
            alert("Failed to update product: " + (err.response?.data?.error?.message || err.message));
        }
    };


    const handleEditClick = (product) => 
    {
        setModalMode("edit");
        setSelectedProductId(product.documentId);
        setFormData({ Name: product.Name || "", Price: product.Price?.toString() || "", Stock: product.Stock?.toString() || "", category: product.category?.id?.toString() || "", Image: [], });
        setShowModal(true);
    };


    const filteredProducts = products.filter((product) => 
    {
        const matchesSearch = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category?.Name === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });


    if (loading) 
    {
        return(
            <Layout>
                <div className="text-center p-6">Loading...</div>
            </Layout>
        );
    }


    if (error) 
    {
        return (
            <Layout>
                <div className="text-center p-6 text-red-600">{error}</div>
            </Layout>
        );
    }


    return (
        <Layout>
            <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-6 rounded-lg shadow-lg">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-800 drop-shadow-md">Product Management</h2>
                    <button onClick={() => { setModalMode("add"); setFormData({ Name: "", Price: "", Stock: "", category: "", Image: [] }); setShowModal(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg" >+ Add Product</button>
                </div>

                <div className="mb-6 flex flex-wrap gap-4 items-center">
                    <input type="text" placeholder="Search products..." aria-label="Search products" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/3 bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                    <select aria-label="Filter by category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" >
                        <option value="">All Categories</option>
                        {[...new Set(products.map((product) => product.category?.Name))] .filter(Boolean) .map((category) => 
                        (
                            <option key={category} value={category} className="capitalize">
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <table className="w-full text-left bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" className="accent-blue-600" />
                            </th>
                            <th className="p-3 text-gray-700 font-semibold">IMAGES</th>
                            <th className="p-3 text-gray-700 font-semibold">ID</th>
                            <th className="p-3 text-gray-700 font-semibold">NAME</th>
                            <th className="p-3 text-gray-700 font-semibold">PRICE</th>
                            <th className="p-3 text-gray-700 font-semibold">STOCK</th>
                            <th className="p-3 text-gray-700 font-semibold">CATEGORY</th>
                            <th className="p-3 text-gray-700 font-semibold">ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50 transition duration-200">

                                <td className="p-3"><input type="checkbox" className="accent-blue-600" /></td>

                                <td className="p-3">
                                    {product.Image && product.Image.length > 0 ? (
                                        <div className="flex space-x-1 h-[35px] w-[35px]">
                                            {product.Image.map((img, index) => (
                                                <Image key={index} src={`http://localhost:1337${img.url}`} alt={`${product.Name} ${index + 1}`} width={40} height={40} className="rounded-full object-cover border-1" />
                                            ))}
                                        </div>
                                    ) 
                                    : 
                                    (
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">No Image</div>
                                    )}
                                </td>

                                <td className="p-3 text-gray-800">{product.id}</td>
                                <td className="p-3 text-gray-800">{product.Name}</td>
                                <td className="p-3 text-gray-800">${product.Price.toFixed(2)}</td>
                                <td className="p-3 text-gray-800">{product.Stock}</td>
                                <td className="p-3 text-gray-800">{product.category?.Name || "N/A"}</td>

                                <td className="p-3 flex space-x-4">

                                    <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:text-blue-800 transition duration-200" >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>

                                    <button onClick={() => handleDelete(product.documentId)} className="text-red-600 hover:text-red-800 transition duration-200" >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

                        <h3 className="text-xl font-bold text-gray-800 mb-4"> {modalMode === "add" ? "Add New Product" : "Edit Product"} </h3>

                        <form onSubmit={modalMode === "add" ? handleSubmit : handleEditSubmit}>

                            <div className="mb-4">
                                <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="Price" className="block text-sm font-medium text-gray-700">Price</label>
                                <input type="number" id="Price" name="Price" value={formData.Price} onChange={handleInputChange} step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="Stock" className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <input type="number" id="Stock" name="Stock" value={formData.Stock} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => 
                                    {
                                        const attributes = category.attributes || {};
                                        const name = attributes.name || attributes.Name || attributes.title || attributes.categoryName || `${category.Name}`;

                                        return (
                                            <option key={category.id} value={category.id} className="capitalize">{name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="Image" className="block text-sm font-medium text-gray-700">Images</label>
                                <input type="file" id="Image" name="Image" onChange={handleInputChange} accept="image/*" multiple className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => { setShowModal(false); setFormData({ Name: "", Price: "", Stock: "", category: "", Image: [] }); setModalMode("add"); setSelectedProductId(null); }} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200" >Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200" >{modalMode === "add" ? "Add Product" : "Update Product"}</button>
                            </div>

                        </form>
                        
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Product;
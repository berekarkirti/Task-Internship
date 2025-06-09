"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Category = () => 
{
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState("");


    useEffect(() => 
    {
        const getCategories = async () => 
        {
            try 
            {
              const response = await axios.get("http://localhost:1337/api/categories");
              setCategories(response.data.data);
              setLoading(false);
            } 
            catch (err) 
            {
              setError("Could not load categories");
              setLoading(false);
            }
        };

        getCategories();

    }, []);


    const handleDelete = async (documentId) => 
    {
        try 
        {
          await axios.delete(`http://localhost:1337/api/categories/${documentId}`);
          setCategories(categories.filter((category) => category.documentId !== documentId));
          alert("Category deleted!");
        } 
        catch (err) 
        {
          alert("Failed to delete category");
        }
    };


    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
            const token = localStorage.getItem("token");

            if (!token) 
            {
                alert("Please log in first");
                return;
            }

            const categoryData = 
            {
                data: 
                {
                    Name: categoryName,
                },
            };

            if (isEditing) 
            {
                const response = await axios.put( `http://localhost:1337/api/categories/${editCategoryId}`, categoryData,
                {
                  headers: 
                  {
                    Authorization: `Bearer ${token}`,
                  },
                }
                );

                setCategories(categories.map((category) => category.documentId === editCategoryId ? response.data.data : category));
                alert("Category updated!");

            } 
            else 
            {
                const response = await axios.post("http://localhost:1337/api/categories", categoryData, 
                {
                  headers: 
                  {
                    Authorization: `Bearer ${token}`,
                  },
                });
                setCategories([...categories, response.data.data]);
                alert("Category added!");
            }


            setShowModal(false);
            setCategoryName("");
            setIsEditing(false);
            setEditCategoryId(null);
        } 
        catch (err) 
        {
            alert("Something went wrong: " + (err.response?.data?.error?.message || err.message));
        }
    };


    const handleEditClick = (category) => 
    {
        setIsEditing(true);
        setEditCategoryId(category.documentId);
        setCategoryName(category.attributes?.Name || category.Name || "");
        setShowModal(true);
    };


    const handleAddClick = () => {
        setIsEditing(false);
        setCategoryName("");
        setShowModal(true);
    };


    const filteredCategories = categories.filter((category) =>(category.attributes?.Name || category.Name || "") .toLowerCase() .includes(searchTerm.toLowerCase()));


    if (loading) 
    {
        return (
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
                  
                    <h2 className="text-2xl font-extrabold text-gray-800">Category Management</h2>
                    <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" > + Add Category </button>

                </div>


                <div className="mb-6">
                    <input type="text" placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/3 bg-white" />
                </div>


                <table className="w-full bg-white rounded-lg text-left">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" />
                            </th>
                            <th className="p-3 text-gray-700 font-semibold">ID</th>
                            <th className="p-3 text-gray-700 font-semibold">NAME</th>
                            <th className="p-3 text-gray-700 font-semibold">ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id} className="border-b hover:bg-gray-50">

                                <td className="p-3"><input type="checkbox" /></td>
                                <td className="p-3">{category.id}</td>
                                <td className="p-3">{category.attributes?.Name || category.Name || "N/A"}</td>
                                <td className="p-3 flex space-x-4">
                                    <button onClick={() => handleEditClick(category)} className="text-blue-600 hover:text-blue-800" >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleDelete(category.documentId)} className="text-red-600 hover:text-red-800" >
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">

                        <h3 className="text-xl font-bold mb-4">
                            {isEditing ? "Edit Category" : "Add New Category"}
                        </h3>

                        <form onSubmit={handleSubmit}>
                        
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required className="mt-1 w-full border border-gray-300 rounded-lg p-2" />
                            </div>


                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => { setShowModal(false); setCategoryName(""); setIsEditing(false); setEditCategoryId(null); }} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" >Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg" >{isEditing ? "Update Category" : "Add Category"}</button>
                            </div>

                        </form>

                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Category;
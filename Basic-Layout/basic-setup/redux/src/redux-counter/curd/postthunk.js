import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://fakestoreapi.com/products";

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const response = await axios.get(API_URL);
    console.log(response)
    return response.data;
});

// Create a new product
export const createProduct = createAsyncThunk("products/create", async (product) => {
    const response = await axios.post(API_URL, product);
    console.log(response)
    return response.data;
});

// Update a product
export const updateProduct = createAsyncThunk("products/update", async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    console.log(response);
    console.log("Update Response:", response.data);
    return response.data;
});

// Delete a product
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    console.log("Delete Response:", id);
    return id;
});
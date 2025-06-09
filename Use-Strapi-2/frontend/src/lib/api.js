import axios from "axios";

const API_URL = "http://localhost:1337/api/products";


export const get = async (locale = 'en') =>
{
  try 
  {
    const response = await axios.get(`${API_URL}?populate=*`);
    return response.data.data;
  } 
  catch (error) 
  {
    console.error("Error fetching products:", error);
    return null;
  }
};


export const getById = async (documentId) => 
{
  try 
  {
    const response = await axios.get(`${API_URL}/${documentId}?populate=*`);
    console.log(response)
    return response.data.data;
  } 
  catch (error) 
  {
    console.error(`Error fetching product with ID ${documentId}:`, error);
    return null;
  }
};


export const create = async (productData) => 
{
  try 
  {
    const response = await axios.post(API_URL, { data: productData });
    return response.data.data;
  } 
  catch (error) 
  {
    console.error("Error creating product:", error);
    return null;
  }
};


export const update = async (documentId, updatedData) => 
{
    try 
    {
      const response = await axios.put(`${API_URL}/${documentId}`, 
      {
        data: {name: updatedData.name,price: updatedData.price,},
      });
      // console.log(response.data.data);
      return response.data.data;
    } 
    catch (error) 
    {
      console.error(`Error updating product with ID ${documentId}:`, error);
      return null;
    }
  };


export const deleteProduct = async (documentId) => 
{
  try 
  {
    await axios.delete(`${API_URL}/${documentId}`);
    return true;  
  } 
  catch (error) 
  {
    console.error(`Error deleting product with ID ${documentId}:`, error);
    return false;
  }
};



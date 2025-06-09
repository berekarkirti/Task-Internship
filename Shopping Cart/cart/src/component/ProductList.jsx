'use client';

import { addToCart } from '@/Redux/cart/cartSlice';
import { useDispatch } from 'react-redux';


const productList = [
  { id: 1, name: 'Product 1', price: 30 },
  { id: 2, name: 'Product 2', price: 50 },
  { id: 3, name: 'Product 3', price: 70 },
  { id: 4, name: 'Product 1', price: 30 },
  { id: 5, name: 'Product 2', price: 50 },
  { id: 6, name: 'Product 3', price: 70 },
  { id: 7, name: 'Product 1', price: 30 },
  { id: 8, name: 'Product 2', price: 50 },
  { id: 9, name: 'Product 3', price: 70 },
  { id: 10, name: 'Product 3', price: 70 },
];

const ProductList = () => 
{
  const dispatch = useDispatch();

  return (
    <div className="product-list">
      {productList.map((product) => 
      (
        <div key={product.id} className="product-card">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <button onClick={() => dispatch(addToCart(product))} className="add-button">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

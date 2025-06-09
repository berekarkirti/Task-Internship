'use client';

import { removeFromCart } from '@/Redux/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';


export default function Cart() {
  const { cartItems, total, discountAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart</h1>
      {cartItems.length === 0 
      ? 
      ( <p className="empty-message">Cartlist is empty</p>) 
      : 
      (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-info">${item.price} x {item.quantity}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="remove-button">Remove</button>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total: ${total.toFixed(2)}</p>
            <p>Discount: -${discountAmount.toFixed(2)}</p>
            <p className="final-amount">Final: ${(total - discountAmount).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

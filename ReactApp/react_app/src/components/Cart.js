import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/App.css';

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div className="container">
            <h2>Koszyk</h2>
            <ul className="cart-list">
                {cart.map(item => (
                    <li key={item.id} className="cart-item">
                        <span>{item.name} - {item.price} PLN</span>
                        <button onClick={() => removeFromCart(item.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
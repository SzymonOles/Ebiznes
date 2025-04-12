import React from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../styles/App.css';

const Checkout = () => {
    const { cart, clearCart } = useCart();

    const handlePayment = () => {
        axios.post('http://localhost:8080/carts', { products: cart })
            .then(() => {
                alert('Płatność zakończona sukcesem!');
                clearCart();
            })
            .catch(error => console.error('Payment error:', error));
    };

    return (
        <div className="container">
            <h2>Płatności</h2>
            <button className="pay-button" onClick={handlePayment}>Zapłać</button>
        </div>
    );
};

export default Checkout;
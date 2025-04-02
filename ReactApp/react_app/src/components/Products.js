import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../styles/App.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { cart, addToCart } = useCart();

    useEffect(() => {
        axios.get('http://localhost:8080/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="container">
            <h2>Produkty</h2>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        <span>{product.name} - {product.price} PLN</span>
                        {!cart.some(item => item.id === product.id) && (
                            <button onClick={() => addToCart(product)}>Dodaj do koszyka</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
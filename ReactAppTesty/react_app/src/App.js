import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './styles/App.css';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <nav className="navbar">
                    <Link to="/">Produkty</Link>
                    <Link to="/cart">Koszyk</Link>
                    <Link to="/checkout">Płatności</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
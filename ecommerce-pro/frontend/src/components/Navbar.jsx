import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export const Navbar = ({ setView }) => {
    const { cart } = useContext(CartContext);
    const totalItems = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-4">
            <div className="container-fluid">
                <span className="navbar-brand" onClick={() => setView('home')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    🚀 ProShop Premium
                </span>
                <div className="ms-auto">
                    <button className="btn btn-outline-light" onClick={() => setView('cart')}>
                        🛒 Carrito <span className="badge bg-danger ms-1">{totalItems}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};
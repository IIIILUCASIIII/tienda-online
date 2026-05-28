import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const Navbar = ({ setView }) => {
    const { cart } = useContext(CartContext);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-4========">
            <span className="navbar-brand cursor-pointer" onClick={() => setView('home')} style={{cursor: 'pointer'}}>
                🚀 ProShop
            </span>
            <div className="ms-auto">
                <button className="btn btn-outline-light" onClick={() => setView('cart')}>
                    🛒 Carrito <span className="badge bg-danger ms-1">{totalItems}</span>
                </button>
            </div>
        </nav>
    );
};
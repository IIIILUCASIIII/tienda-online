import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export const Cart = ({ setView }) => {
    const { cart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

    const cleanCart = cart || [];

    return (
        <div className="container">
            <h2 className="mb-4 fw-bold">Tu Carrito de Compras</h2>
            {cleanCart.length === 0 ? (
                <div className="alert alert-info shadow-sm">
                    Tu carrito está vacío actualmente.{" "}
                    <button className="btn btn-link p-0 pb-1" onClick={() => setView('home')}>
                        Volver al catálogo
                    </button>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-8 mb-4">
                        <ul className="list-group shadow-sm mb-3">
                            {cleanCart.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <div>
                                        <h6 className="my-0 fw-bold">{item.name}</h6>
                                        <small className="text-muted">Cantidad: {item.quantity} x ${item.price}</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="text-muted fw-bold me-3">${(item.price * item.quantity).toFixed(2)}</span>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>Vaciar Carrito</button>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4 bg-white">
                            <h4 className="fw-bold mb-3">Resumen de Compra</h4>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5 my-3">
                                <span>Total:</span>
                                <span className="text-success">${getCartTotal ? getCartTotal().toFixed(2) : "0.00"}</span>
                            </div>
                            <button className="btn btn-success w-100 p-2 fw-bold" onClick={() => alert("¡Procesando pago simulado de e-commerce senior!")}>
                                Proceder al Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
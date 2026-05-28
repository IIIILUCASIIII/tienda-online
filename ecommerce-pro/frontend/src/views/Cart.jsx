import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const Cart = ({ setView }) => {
    const { cart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

    return (
        <div className="container">
            <h2 className="mb-4">Tu Carrito de Compras</h2>
            {cart.length === 0 ? (
                <div className="alert alert-info">
                    Tu carrito está vacío. <button className="btn btn-link" onClick={() => setView('home')}>Volver a la tienda</button>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        <ul className="list-group mb-3">
                            {cart.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="my-0">{item.name}</h6>
                                        <small className="text-muted">Cantidad: {item.quantity} x ${item.price}</small>
                                    </div>
                                    <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>Vaciar Carrito</button>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3">
                            <h4>Resumen</h4>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <span>Total:</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <button className="btn btn-success w-100 mt-3" onClick={() => alert("¡Procesando pago simulado!")}>
                                Proceder al Pago
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img src={product.image} className="card-img-top" alt={product.name} style={{height: "200px", objectFit: "cover"}} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-success fw-bold">${product.price.toFixed(2)}</p>
                    <button className="btn btn-primary mt-auto w-100" onClick={() => addToCart(product)}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};
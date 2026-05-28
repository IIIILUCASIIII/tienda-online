import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const defaultImage = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500";

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0 position-relative transition-all hover-shadow">
                {/* Insignia de Categoría flotante */}
                <span className="badge bg-dark position-absolute top-0 end-0 m-3 shadow-sm px-2.5 py-1.5" style={{ zIndex: 2 }}>
                    {product.category || "General"}
                </span>
                
                <div className="overflow-hidden" style={{ height: "200px" }}>
                    <img 
                        src={product.image || defaultImage} 
                        className="card-img-top img-fluid h-100 w-100" 
                        alt={product.name} 
                        style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                    />
                </div>
                
                <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold text-dark fs-6 text-truncate-2" style={{ minHeight: "44px" }}>
                        {product.name}
                    </h5>
                    <p className="card-text text-success fw-extrabold fs-5 mb-3">${product.price.toFixed(2)}</p>
                    
                    <button 
                        className="btn btn-primary mt-auto w-100 fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2" 
                        onClick={() => addToCart(product)}
                    >
                        <span>🛒 Añadir al Carrito</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
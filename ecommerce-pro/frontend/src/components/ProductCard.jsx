import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const defaultImage = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500";

    return (
        <div className="card h-100 shadow-sm border-0 position-relative bg-white" style={{ borderRadius: "12px", overflow: "hidden" }}>
            {/* Tag de categoría */}
            <span className="badge bg-dark position-absolute top-0 end-0 m-3 shadow-sm px-2.5 py-1.5" style={{ zIndex: 2, fontSize: "0.75rem" }}>
                {product.category}
            </span>
            
            <div style={{ height: "180px", overflow: "hidden" }}>
                <img 
                    src={product.image || defaultImage} 
                    className="card-img-top w-100 h-100" 
                    alt={product.name} 
                    style={{ objectFit: "cover" }}
                />
            </div>
            
            <div className="card-body d-flex flex-column p-3">
                <h6 className="card-title fw-bold text-dark mb-1 text-truncate" title={product.name}>
                    {product.name}
                </h6>
                
                {/* DESCRIPCIÓN DETALLADA PROFESIONAL */}
                <p className="card-text text-muted small mb-3" style={{ display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "54px", fontSize: "0.82rem" }}>
                    {product.desc || "Sin descripción detallada disponible para este lote de producto."}
                </p>
                
                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                    <span className="text-success fw-bold fs-5">${product.price.toFixed(2)}</span>
                    <button 
                        className="btn btn-sm btn-primary fw-bold px-3 py-1.5"
                        onClick={() => addToCart(product)}
                    >
                        🛒 Añadir
                    </button>
                </div>
            </div>
        </div>
    );
};
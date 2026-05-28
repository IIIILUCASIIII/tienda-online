import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/products/')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => console.error("Error cargando productos:", err));
    }, []);

    if (loading) return <div className="text-center mt-5"><h3>Cargando catálogo premium...</h3></div>;

    return (
        <div className="container">
            <h2 className="mb-4">Catálogo de Productos</h2>
            <div className="row">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
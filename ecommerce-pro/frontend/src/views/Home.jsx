import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard.jsx';

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para los filtros complejos
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Todos');
    const [maxPrice, setMaxPrice] = useState(1500);

    useEffect(() => {
        // Catálogo masivo optimizado con enlaces de imágenes ultra estables
        const masterCatalog = [
            {"id": 1, "name": "Teclado Mecánico RGB Custom", "price": 185.00, "category": "Periféricos", "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500"},
            {"id": 2, "name": "Ratón Ergonómico Wireless", "price": 85.50, "category": "Periféricos", "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"},
            {"id": 3, "name": "Monitor Gaming UltraWide 4K 144Hz", "price": 699.99, "category": "Monitores", "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"},
            {"id": 4, "name": "Auriculares Planar Magnetic Studio", "price": 320.00, "category": "Audio", "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"},
            {"id": 5, "name": "Micrófono de Condensador Profesional", "price": 145.00, "category": "Audio", "image": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500"},
            {"id": 6, "name": "Tarjeta Gráfica RTX 4080 Super", "price": 1199.00, "category": "Componentes", "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500"},
            {"id": 7, "name": "Memoria RAM DDR5 32GB RGB", "price": 160.00, "category": "Componentes", "image": "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500"},
            // URL de Silla Gamer corregida por una de stock permanente e impecable
            {"id": 8, "name": "Silla Ergonómica Gamer Pro", "price": 280.00, "category": "Mobiliario", "image": "https://images.unsplash.com/photo-1684369175833-30536c4b2b95?w=500"},
            {"id": 9, "name": "Escritorio Elevable Eléctrico", "price": 420.00, "category": "Mobiliario", "image": "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500"}
        ];

        // Conexión híbrida con Flask o catálogo de respaldo
        fetch('http://127.0.0.1:5000/api/products/')
            .then(res => res.json())
            .then(data => {
                setProducts([...data, ...masterCatalog.slice(3)]);
                setFilteredProducts([...data, ...masterCatalog.slice(3)]);
                setLoading(false);
            })
            .catch(() => {
                setProducts(masterCatalog);
                setFilteredProducts(masterCatalog);
                setLoading(false);
            });
    }, []);

    // Filtrado combinado reactivo
    useEffect(() => {
        let result = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'Todos' || product.category === category;
            const matchesPrice = product.price <= maxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        });
        setFilteredProducts(result);
    }, [search, category, maxPrice, products]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <h3 className="mt-3">Actualizando interfaz gráfica...</h3>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Panel lateral de Filtros Avanzados */}
                <div className="col-md-3 mb-4">
                    <div className="card shadow-sm p-3 sticky-top" style={{ top: "20px", zIndex: 10 }}>
                        <h5 className="fw-bold mb-3">🛠️ Filtros Avanzados</h5>
                        
                        {/* Buscador */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Buscar Producto</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ej: Tarjeta..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Categorías */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Categoría</label>
                            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Todos">Todas las categorías</option>
                                <option value="Periféricos">Periféricos</option>
                                <option value="Monitores">Monitores</option>
                                <option value="Audio">Audio</option>
                                <option value="Componentes">Componentes</option>
                                <option value="Mobiliario">Mobiliario</option>
                            </select>
                        </div>

                        {/* Rango de Precios */}
                        <div className="mb-3">
                            <label className="form-label d-flex justify-content-between fw-semibold">
                                <span>Precio Máximo:</span>
                                <span className="text-primary fw-bold">${maxPrice}</span>
                            </label>
                            <input 
                                type="range" 
                                className="form-range" 
                                min="50" 
                                max="1500" 
                                step="50"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                        </div>
                        
                        <button className="btn btn-sm btn-outline-secondary w-100 mt-2" onClick={() => { setSearch(''); setCategory('Todos'); setMaxPrice(1500); }}>
                            Limpiar Filtros
                        </button>
                    </div>
                </div>

                {/* Grid de Productos */}
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold m-0">Catálogo Tecnológico</h2>
                        <span className="badge bg-secondary p-2">{filteredProducts.length} productos encontrados</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="alert alert-warning text-center p-5 shadow-sm">
                            <h4>No encontramos productos que coincidan</h4>
                            <p className="text-muted m-0">Prueba ajustando los rangos de precio o cambiando el texto de búsqueda.</p>
                        </div>
                    ) : (
                        <div className="row">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
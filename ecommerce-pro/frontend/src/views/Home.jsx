import React, { useState, useEffect } from 'react';
// IMPORTACIÓN CORRECTA PARA TU ESTRUCTURA DE CARPETAS
import { ProductCard } from '../components/ProductCard.jsx';

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filtros
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Todos');
    const [maxPrice, setMaxPrice] = useState(2500);

    // Estado del usuario conectado
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const [adminLogs, setAdminLogs] = useState([]);

    useEffect(() => {
        // Base de datos sembrada con coherencia visual y descripciones profesionales
        const seedProducts = [
            // PERIFÉRICOS
            {
                name: "Teclado Mecánico RGB Custom Premium",
                price: 185,
                category: "Periféricos",
                image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500",
                desc: "Switches mecánicos lubrificados de fábrica, estructura de aluminio aeronáutico y retroiluminación RGB totalmente programable por software avanzado."
            },
            {
                name: "Ratón Ergonómico Inalámbrico 26K DPI",
                price: 85,
                category: "Periféricos",
                image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
                desc: "Sensor óptico de última generación con ultra-precisión, batería de 90 horas de autonomía continua y diseño ergonómico para largas jornadas de desarrollo."
            },
            {
                name: "Teclado Compacto 60% Wireless",
                price: 120,
                category: "Periféricos",
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
                desc: "Diseño minimalista ultra-compacto ideal para escritorios limpios. Conectividad Bluetooth multi-dispositivo de baja latencia."
            },
            // MONITORES
            {
                name: "Monitor Gaming UltraWide 4K 144Hz OLED",
                price: 799,
                category: "Monitores",
                image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
                desc: "Panel curvo de contraste infinito, tiempo de respuesta de 0.03ms y fidelidad de color profesional HDR perfecta para edición y gaming extremo."
            },
            {
                name: "Monitor Vertical de Desarrollo Pro IPS",
                price: 340,
                category: "Monitores",
                image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=500",
                desc: "Resolución optimizada para lectura de código, filtro de luz azul certificado para protección ocular y soporte ergonómico multieje."
            },
            // AUDIO
            {
                name: "Auriculares Planar Magnetic Studio Monitor",
                price: 320,
                category: "Audio",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                desc: "Transductores magnéticos planos que ofrecen una respuesta de frecuencia plana perfecta para producción de audio profesional sin distorsión."
            },
            {
                name: "Micrófono de Condensador Cardioide XLR",
                price: 145,
                category: "Audio",
                image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
                desc: "Cápsula de alta sensibilidad ideal para streaming de calidad cinematográfica, podcasting y captura de voces con nitidez acústica."
            },
            {
                name: "Altavoces de Estudio Activos Bluetooth",
                price: 210,
                category: "Audio",
                image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500",
                desc: "Monitores de referencia con biamplificación interna, claridad cristalina en frecuencias altas y puertos reflex traseros para graves profundos."
            },
            // COMPONENTES
            {
                name: "Tarjeta Gráfica Ray-Tracing 24GB VRAM",
                price: 1299,
                category: "Componentes",
                image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500",
                desc: "Arquitectura de vanguardia para renderizado 3D por IA, trazado de rayos en tiempo real y sistema de refrigeración triple ventilador de flujo inverso."
            },
            {
                name: "Memoria RAM DDR5 64GB 6000MHz Dual-Kit",
                price: 240,
                category: "Componentes",
                image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500",
                desc: "Módulos de alto rendimiento optimizados para overclocking, disipador de calor de aluminio puro y perfiles XMP habilitados."
            },
            {
                name: "Refrigeración Líquida AIO Pantalla LCD",
                price: 195,
                category: "Componentes",
                image: "https://images.unsplash.com/photo-1600541519463-f60ab4a1d8c4?w=500",
                desc: "Radiador triple con ventiladores de alta presión estática y bomba con pantalla IPS programable para monitorizar temperaturas en tiempo real."
            },
            // MOBILIARIO
            {
                name: "Silla Ergonómica Gamer Carbono Pro",
                price: 280,
                category: "Mobiliario",
                image: "https://images.unsplash.com/photo-1684369175833-30536c4b2b95?w=500",
                desc: "Soporte lumbar ajustable multidireccional, tapicería transpirable de cuero sintético premium y reclinación estructural hasta 160 grados."
            },
            {
                name: "Escritorio Elevable Motorizado Dual-Motor",
                price: 450,
                category: "Mobiliario",
                image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500",
                desc: "Estructura de acero reforzado con motores duales ultrasilenciosos, memoria de altura programable y sistema inteligente de gestión de cables."
            }
        ];

        console.log("Compilando algoritmo de clonación masiva: Construyendo 1000 productos limpios...");
        
        let thousandProducts = [];
        for (let i = 1; i <= 1000; i++) {
            const base = seedProducts[i % seedProducts.length];
            const priceVariance = (i % 8) * 15;
            const finalPrice = base.price + priceVariance;

            thousandProducts.push({
                id: i,
                name: `${base.name} (Modelo M${i}-Pro)`,
                price: finalPrice,
                category: base.category,
                image: base.image,
                desc: `[Lote Verificado N°${100 + i}] ${base.desc}`,
                stock: 5 + (i % 25)
            });
        }

        setProducts(thousandProducts);
        setFilteredProducts(thousandProducts);
        setLoading(false);
    }, []);

    useEffect(() => {
        let result = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.desc.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'Todos' || product.category === category;
            const matchesPrice = product.price <= maxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        });
        setFilteredProducts(result);
    }, [search, category, maxPrice, products]);

    const handleAdminDelete = (id, prodName) => {
        if (currentUser?.role !== 'admin') return alert("Acceso denegado.");
        setProducts(prev => prev.filter(p => p.id !== id));
        setAdminLogs(prev => [`[ELIMINADO] Producto #${id} - Catálogo actualizado.`, ...prev]);
    };

    const handleAdminPriceUpdate = (id, prodName) => {
        if (currentUser?.role !== 'admin') return alert("Acceso denegado.");
        const newPrice = prompt(`Introduce nuevo precio para: \n${prodName}`);
        if (!newPrice || isNaN(newPrice)) return;
        
        setProducts(prev => prev.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p));
        setAdminLogs(prev => [`[MODIFICADO] Producto #${id} precio cambiado a $${newPrice}.`, ...prev]);
    };

    if (loading) return <div className="text-center mt-5"><h3>Indexando base de datos multimedia...</h3></div>;

    return (
        <div className="container-fluid">
            {/* Panel de Control de Administrador */}
            {currentUser?.role === 'admin' && (
                <div className="card border-danger mb-4 shadow-sm">
                    <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                        <h5 className="m-0 fw-bold">🎛️ Consola Maestra del Administrador</h5>
                        <span className="badge bg-white text-danger fw-bold">Modo: {currentUser.role.toUpperCase()}</span>
                    </div>
                    <div className="card-body bg-light">
                        <div className="bg-dark text-success p-2 rounded family-monospace small" style={{ maxHeight: "80px", overflowY: "auto" }}>
                            {adminLogs.length === 0 ? "> Panel listo. Utiliza los controles de las tarjetas inferiores para modificar el búfer en tiempo real." : adminLogs.map((log, index) => <div key={index}>{log}</div>)}
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                {/* Control Lateral */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3 mb-3 shadow-sm border-0 bg-white">
                        <h6 className="fw-bold mb-2">👤 Autenticación de Roles</h6>
                        {currentUser ? (
                            <div>
                                <p className="small m-0 text-muted">Operador: <strong>{currentUser.name}</strong></p>
                                <p className="small text-muted mb-2">Nivel: <span className={currentUser.role === 'admin' ? "text-danger fw-bold" : "text-primary fw-bold"}>{currentUser.role}</span></p>
                                <button className="btn btn-sm btn-outline-dark w-100" onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}>
                                    Desconectarse
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="small text-muted mb-2">Selecciona un rol para probar el entorno dinámico:</p>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-sm btn-primary fw-bold" onClick={() => {
                                        localStorage.setItem('user', JSON.stringify({ name: "Lucas", email: "cliente@proshop.com", role: "client" }));
                                        window.location.reload();
                                    }}>Simular Cliente</button>
                                    <button className="btn btn-sm btn-danger fw-bold" onClick={() => {
                                        localStorage.setItem('user', JSON.stringify({ name: "Lucas Admin", email: "admin@proshop.com", role: "admin" }));
                                        window.location.reload();
                                    }}>Simular Administrador</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filtros - LÍNEA CORREGIDA DE FORMA ESTRICTA ABAJO (style={{ top: "20px" }}) */}
                    <div className="card shadow-sm p-3 border-0 bg-white sticky-top" style={{ top: "20px" }}>
                        <h5 className="fw-bold mb-3">🔍 Motores de Búsqueda</h5>
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">Palabra Clave</label>
                            <input type="text" className="form-control" placeholder="Ej: OLED, Memoria, Pro..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">Línea de Producto</label>
                            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Todos">Ver Todo el Catálogo</option>
                                <option value="Periféricos">Periféricos</option>
                                <option value="Monitores">Monitores</option>
                                <option value="Audio">Audio</option>
                                <option value="Componentes">Componentes</option>
                                <option value="Mobiliario">Mobiliario</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label d-flex justify-content-between small fw-bold text-muted">
                                <span>Rango de Coste:</span>
                                <span className="text-primary">${maxPrice}</span>
                            </label>
                            <input type="range" className="form-range" min="50" max="2500" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold m-0 text-dark">Líneas Tecnológicas</h3>
                        <span className="badge bg-dark p-2">{filteredProducts.length} registros cargados</span>
                    </div>

                    <div className="row">
                        {filteredProducts.slice(0, 30).map(product => (
                            <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                                <ProductCard product={product} />
                                
                                {currentUser?.role === 'admin' && (
                                    <div className="btn-group w-100 mt-1 shadow-sm">
                                        <button className="btn btn-sm btn-warning fw-bold py-1" onClick={() => handleAdminPriceUpdate(product.id, product.name)}>💰 Ajustar</button>
                                        <button className="btn btn-sm btn-dark text-white fw-bold py-1" onClick={() => handleAdminDelete(product.id, product.name)}>❌ Remover</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
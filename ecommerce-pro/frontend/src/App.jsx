import React, { useState } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Home } from './views/Home.jsx';
import { Cart } from './views/Cart.jsx';

function App() {
    const [view, setView] = useState('home');

    return (
        <CartProvider>
            <Navbar setView={setView} />
            <div className="container mt-4">
                {view === 'home' ? <Home setView={setView} /> : <Cart setView={setView} />}
            </div>
        </CartProvider>
    );
}

export default App;
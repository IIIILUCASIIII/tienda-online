import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { Cart } from './views/Cart';

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
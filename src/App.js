
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import { allProducts } from './data/products';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';

function App() {
  const [cart, setCart] = useState([]);
  
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddToCart = (productToAdd) => {
    const newItem = { ...productToAdd, cartId: Date.now() + Math.random() };
    setCart(prevCart => [...prevCart, newItem]);
    alert(`${productToAdd.name} has been added to your cart!`);
  };

  const handleRemoveFromCart = (cartIdToRemove) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartIdToRemove));
  };
  
  const handleLogin = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const handleLogout = () => {
    setCurrentUser(null);

  };

  return (
    <Router>
      <Layout cartCount={cart.length} user={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage products={allProducts.slice(0, 6)} />} 
          />
          <Route 
            path="/shop" 
            element={<ShopPage products={allProducts} onAddToCart={handleAddToCart} />} 
          />
          <Route 
            path="/shop/:type" 
            element={<ShopPage products={allProducts} onAddToCart={handleAddToCart} />} 
          />
          <Route 
            path="/cart" 
            element={<CartPage cartItems={cart} onRemoveItem={handleRemoveFromCart} />} 
          />
          
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
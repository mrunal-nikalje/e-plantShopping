import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();

    // ✅ Get cart items from Redux
    const cart = useSelector(state => state.cart.items);

    // ✅ Calculate total quantity for cart icon
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // ✅ Check if item already in cart
    const isInCart = (plant) => {
        return cart.some(item => item.name === plant.name);
    };

    // ✅ Add to cart
    const handleAddToCart = (plant) => {
        dispatch(addItem({
            ...plant,
            quantity: 1
        }));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const plantsArray = [/* SAME DATA (no change) */];

    return (
        <div>
            {/* ✅ Navbar */}
            <div className="navbar" style={{ backgroundColor: '#4CAF50', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
                
                <a href="/" onClick={(e) => handleHomeClick(e)} style={{ color: 'white', textDecoration: 'none' }}>
                    <h3>Paradise Nursery</h3>
                </a>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a href="#" onClick={(e) => handlePlantsClick(e)} style={{ color: 'white' }}>Plants</a>

                    {/* ✅ Cart Icon with Count */}
                    <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white' }}>
                        🛒 {totalItems}
                    </a>
                </div>
            </div>

            {/* ✅ Show Products */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map(category => (
                        <div key={category.category}>
                            <h2>{category.category}</h2>

                            <div className="plants-container">
                                {category.plants.map(plant => (
                                    <div className="plant-card" key={plant.name}>
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p>{plant.cost}</p>

                                        {/* ✅ Add to Cart Button */}
                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={isInCart(plant)}
                                            style={{
                                                backgroundColor: isInCart(plant) ? 'gray' : 'green',
                                                color: 'white',
                                                padding: '8px'
                                            }}
                                        >
                                            {isInCart(plant) ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    // Provide the cart items and the fetch function to the context
    return (
        <CartContext.Provider value={{ cartItems, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import orderService from '../services/orderService';
import useAuth from '../services/useAuth';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const response = await orderService.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  const addItemToCart = async (productId, quantity) => {
    try {
      await orderService.addItemToCart(productId, quantity);
      fetchCart();
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      await orderService.removeItemFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      await orderService.updateCartItemQuantity(productId, quantity);
      fetchCart();
    } catch (error) {
      console.error('Failed to update item quantity', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addItemToCart, removeItemFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

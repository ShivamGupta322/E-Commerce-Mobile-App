import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCart = async (newCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...currentCart, { ...product, quantity: 1 }];
      }
      
      saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => {
      const newCart = currentCart.filter(item => item.id !== productId);
      saveCart(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart => {
      const newCart = currentCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      saveCart(newCart);
      return newCart;
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return { cart, addToCart, removeFromCart, updateQuantity, getTotal };
}
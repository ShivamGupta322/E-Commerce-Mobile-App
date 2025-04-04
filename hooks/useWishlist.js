import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const saved = await AsyncStorage.getItem('wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const saveWishlist = async (newWishlist) => {
    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  };

  const toggleWishlist = (product) => {
    setWishlist(current => {
      const exists = current.some(item => item.id === product.id);
      let newWishlist;
      
      if (exists) {
        newWishlist = current.filter(item => item.id !== product.id);
      } else {
        newWishlist = [...current, product];
      }
      
      saveWishlist(newWishlist);
      return newWishlist;
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return { wishlist, toggleWishlist, isInWishlist };
}
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const navigation = useNavigation();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
    navigation.navigate('MainTabs', { screen: 'Cart' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{product.title}</Text>
            <TouchableOpacity
              style={styles.wishlistButton}
              onPress={() => toggleWishlist(product)}
            >
              <Ionicons
                name={isWishlisted ? 'heart' : 'heart-outline'}
                size={28}
                color={isWishlisted ? '#ff4444' : '#666'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.category}>
            Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
    marginTop: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginTop: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  addToCartButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wishlistButton: {
    padding: 4,
  },
});
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price} USD</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Button
        title="Add to cart"
        onPress={() => alert('Added to cart!')}
      />
    </View>
  );
}

// Định nghĩa CSS (StyleSheet)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 20
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  productPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 15
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20
  }
});

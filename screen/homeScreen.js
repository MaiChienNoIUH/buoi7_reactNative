import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data từ MockAPI
    axios.get('https://66fc1f44c3a184a84d1627ea.mockapi.io/products') 
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filterProducts = (category) => {
    if (category === '') {
      setFilteredProducts(products); // Hiển thị tất cả sản phẩm
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productContainer} 
      onPress={() => navigation.navigate('Details', { product: item })}
    >
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} USD</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search food"
        style={styles.searchInput}
        onChangeText={(text) => {
          setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(text.toLowerCase())));
        }}
      />
      <View style={styles.buttonGroup}>
        <Button title="All" onPress={() => filterProducts('')} />
        <Button title="Donut" onPress={() => filterProducts('donut')} />
        <Button title="Pink Donut" onPress={() => filterProducts('pink donut')} />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
      />
    </View>
  );
}

// Định nghĩa CSS (StyleSheet)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productPrice: {
    fontSize: 16,
    color: '#555'
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16
  }
});

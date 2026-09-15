import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export default function Bai11Screen() {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (
    keyword: string,
    limit: number
  ) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(
          keyword
        )}&limit=${limit}`
      );

      const data =
        (await response.json()) as ProductResponse;

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts(keyword, 10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bài 11 - Product Search
      </Text>

      <Text style={styles.subtitle}>
        Async Function + Typed Parameters
      </Text>

      <View style={styles.searchRow}>
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Nhập tên sản phẩm..."
          style={styles.input}
        />

        <Pressable
          onPress={handleSearch}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Tìm kiếm
          </Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.productName}>
                {item.title}
              </Text>

              <Text style={styles.price}>
                ${item.price}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Chưa có kết quả
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },

  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
  },

  button: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.6,
  },

  loading: {
    marginTop: 30,
  },

  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },
});
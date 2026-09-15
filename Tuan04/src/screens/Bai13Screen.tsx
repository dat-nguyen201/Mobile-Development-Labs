import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 15000000 },
  { id: 2, name: 'Điện thoại', price: 10000000 },
  { id: 3, name: 'Tai nghe', price: 1500000 },
  { id: 4, name: 'Bàn phím', price: 800000 },
  { id: 5, name: 'Chuột', price: 500000 },
];

function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string
): T[] {
  return items.filter((item) =>
    item.name
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );
}

export default function Bai13Screen() {
  const [keyword, setKeyword] = useState('');

  const filteredProducts = filterByName<Product>(
    products,
    keyword
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bài 13 - Generic Filter
      </Text>

      <Text style={styles.subtitle}>
        Generic &lt;T&gt; + Filter
      </Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên sản phẩm..."
        style={styles.input}
      />

      <Text style={styles.result}>
        Kết quả: {filteredProducts.length}
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.price}>
              {item.price.toLocaleString('vi-VN')} đ
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy sản phẩm
          </Text>
        }
      />
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

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  result: {
    fontWeight: '600',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    fontSize: 15,
  },

  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },
});
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
};

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

type DummyResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export default function Bai14Screen() {
  const [response, setResponse] =
    useState<ApiResponse<Product> | null>(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 5;

  const fetchProducts = async (pageNumber: number) => {
    try {
      setLoading(true);

      const skip = (pageNumber - 1) * limit;

      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );

      const data = (await res.json()) as DummyResponse;

      const apiResponse: ApiResponse<Product> = {
        data: data.products,
        total: data.total,
        page: pageNumber,
      };

      setResponse(apiResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const nextPage = () => {
    if (response && page * limit < response.total) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bài 14 - Pagination
      </Text>

      <Text style={styles.subtitle}>
        Generic Interface ApiResponse&lt;T&gt;
      </Text>

      <View style={styles.info}>
        <Text>
          Trang: {response?.page ?? page}
        </Text>

        <Text>
          Tổng sản phẩm: {response?.total ?? 0}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={response?.data ?? []}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text style={styles.price}>
                ${item.price}
              </Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttons}>
        <Pressable
          onPress={previousPage}
          disabled={page === 1}
          style={[
            styles.button,
            page === 1 && styles.disabled,
          ]}
        >
          <Text style={styles.buttonText}>
            ← Trước
          </Text>
        </Pressable>

        <Text style={styles.page}>
          {page}
        </Text>

        <Pressable
          onPress={nextPage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Sau →
          </Text>
        </Pressable>
      </View>
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
    marginBottom: 15,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
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
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    fontWeight: 'bold',
    marginLeft: 10,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 15,
  },

  button: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  disabled: {
    opacity: 0.3,
  },

  page: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type CustomError = {
  message: string;
};

export default function Bai12Screen() {
  const [status, setStatus] = useState(
    'Chưa gọi API'
  );

  const fetchWrongApi = async () => {
    try {
      setStatus('Đang gọi API...');

      // URL sai có chủ đích
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/SAI_URL'
      );

      if (!response.ok) {
        throw new Error(
          `API lỗi - HTTP ${response.status}`
        );
      }

      await response.json();

      setStatus('Gọi API thành công');
    } catch (error) {
      const customError = error as CustomError;

      setStatus('Gọi API thất bại');

      Alert.alert(
        'Lỗi API',
        customError.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bài 12 - API Error Handling
      </Text>

      <Text style={styles.subtitle}>
        Try/Catch + CustomError + Alert
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Trạng thái:
        </Text>

        <Text style={styles.status}>
          {status}
        </Text>

        <Pressable
          onPress={fetchWrongApi}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Gọi API lỗi
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
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 12,
  },

  label: {
    color: '#777',
  },

  status: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.6,
  },
});
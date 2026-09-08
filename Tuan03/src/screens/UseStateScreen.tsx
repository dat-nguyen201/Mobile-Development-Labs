import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function UseStateScreen() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const handleReset = () => {
    setFullName('');
    setAge('');
  };

  const ageNumber = Number(age);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 1 - useState</Text>
      <Text style={styles.subtitle}>Form nhập thông tin</Text>

      <Text style={styles.label}>Họ và tên</Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ tên"
        style={styles.input}
      />

      <Text style={styles.label}>Tuổi</Text>

      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Nhập tuổi"
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.result}>
        <Text style={styles.greeting}>
          {fullName
            ? `Xin chào, ${fullName}!`
            : 'Vui lòng nhập họ tên'}
        </Text>

        {age !== '' && ageNumber < 18 && (
          <Text style={styles.warning}>
            Bạn chưa đủ 18 tuổi
          </Text>
        )}

        {age !== '' && ageNumber >= 18 && (
          <Text style={styles.success}>
            Bạn đã đủ 18 tuổi
          </Text>
        )}
      </View>

      <Pressable
        onPress={handleReset}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          Xóa toàn bộ dữ liệu
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  result: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
  },

  greeting: {
    fontSize: 18,
    fontWeight: '600',
  },

  warning: {
    marginTop: 8,
    color: 'red',
  },

  success: {
    marginTop: 8,
    color: 'green',
  },

  button: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
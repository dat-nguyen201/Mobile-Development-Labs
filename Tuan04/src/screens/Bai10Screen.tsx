import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default function Bai10Screen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      );

      const data = await response.json();

      setUser(data as User);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải người dùng...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bài 10 - User Profile
      </Text>

      <Text style={styles.subtitle}>
        User | null + Optional Chaining
      </Text>

      {user ? (
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)}
            </Text>
          </View>

          <Text style={styles.name}>
            {user?.name}
          </Text>

          <Text style={styles.username}>
            @{user?.username}
          </Text>

          <View style={styles.info}>
            <Text style={styles.label}>Email</Text>
            <Text>{user?.email}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Điện thoại</Text>
            <Text>{user?.phone}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Website</Text>
            <Text>{user?.website}</Text>
          </View>
        </View>
      ) : (
        <Text>Không có dữ liệu người dùng</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
    borderRadius: 14,
    padding: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },

  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  username: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },

  info: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  label: {
    color: '#777',
    fontSize: 12,
    marginBottom: 3,
  },
});
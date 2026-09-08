import React, {
    createContext,
    useContext,
    useState,
  } from 'react';
  
  import {
    View,
    Text,
    Pressable,
    StyleSheet,
  } from 'react-native';
  
  type User = {
    name: string;
    email: string;
  };
  
  type UserContextType = {
    user: User;
    logout: () => void;
  };
  
  const UserContext = createContext<UserContextType | null>(null);
  
  // Component con nhận dữ liệu bằng useContext
  function ProfileScreen() {
    const context = useContext(UserContext);
  
    if (!context) {
      return null;
    }
  
    const { user, logout } = context;
  
    return (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0)}
          </Text>
        </View>
  
        <Text style={styles.greeting}>
          Xin chào, {user.name}
        </Text>
  
        <Text style={styles.email}>
          {user.email}
        </Text>
  
        <Pressable
          onPress={logout}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Đăng xuất
          </Text>
        </Pressable>
      </View>
    );
  }
  
  export default function UseContextScreen() {
    const [user, setUser] = useState<User>({
      name: 'Nguyễn Trọng Đạt',
      email: 'dat@example.com',
    });
  
    const handleLogout = () => {
      setUser({
        name: 'Khách',
        email: 'Chưa đăng nhập',
      });
    };
  
    return (
      <UserContext.Provider
        value={{
          user,
          logout: handleLogout,
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Bài 3 - useContext
          </Text>
  
          <Text style={styles.subtitle}>
            Chia sẻ thông tin người dùng
          </Text>
  
          <ProfileScreen />
  
          <Text style={styles.note}>
            ProfileScreen nhận dữ liệu trực tiếp từ UserContext,
            không truyền qua props.
          </Text>
        </View>
      </UserContext.Provider>
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
      color: '#666',
      marginBottom: 24,
    },
  
    card: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 14,
      padding: 24,
      alignItems: 'center',
    },
  
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#222',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
    },
  
    avatarText: {
      color: '#fff',
      fontSize: 28,
      fontWeight: 'bold',
    },
  
    greeting: {
      fontSize: 20,
      fontWeight: '700',
    },
  
    email: {
      color: '#777',
      marginTop: 6,
      marginBottom: 20,
    },
  
    button: {
      backgroundColor: '#222',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
  
    buttonPressed: {
      opacity: 0.6,
    },
  
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
  
    note: {
      marginTop: 20,
      color: '#777',
      textAlign: 'center',
    },
  });
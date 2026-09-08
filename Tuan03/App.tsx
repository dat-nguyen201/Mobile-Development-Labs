import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseContextScreen from './src/screens/UseContextScreen';
import UseReducerScreen from './src/screens/UseReducerScreen';
import OptimizationScreen from './src/screens/OptimizationScreen';
import TodoScreen from './src/screens/TodoScreen';

type ScreenName =
  | 'menu'
  | 'useState'
  | 'useEffect'
  | 'useContext'
  | 'useReducer'
  | 'optimization'
  | 'todo';

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('menu');

  const renderScreen = () => {
    switch (screen) {
      case 'useState':
        return <UseStateScreen />;

      case 'useEffect':
        return <UseEffectScreen />;

      case 'useContext':
        return <UseContextScreen />;

      case 'useReducer':
        return <UseReducerScreen />;

      case 'optimization':
        return <OptimizationScreen />;

      case 'todo':
        return <TodoScreen />;

      default:
        return <HomeMenu onSelect={setScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {screen !== 'menu' && (
        <View style={styles.topBar}>
          <Pressable
            onPress={() => setScreen('menu')}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.backText}>← Trang chủ</Text>
          </Pressable>

          <Text style={styles.weekText}>TUẦN 3</Text>
        </View>
      )}

      {renderScreen()}
    </SafeAreaView>
  );
}

function HomeMenu({
  onSelect,
}: {
  onSelect: (screen: ScreenName) => void;
}) {
  const exercises = [
    {
      id: 'useState' as ScreenName,
      number: '01',
      title: 'useState',
      description: 'Form nhập họ tên và tuổi',
    },
    {
      id: 'useEffect' as ScreenName,
      number: '02',
      title: 'useEffect',
      description: 'Theo dõi trạng thái kết nối',
    },
    {
      id: 'useContext' as ScreenName,
      number: '03',
      title: 'useContext',
      description: 'Chia sẻ thông tin người dùng',
    },
    {
      id: 'useReducer' as ScreenName,
      number: '04',
      title: 'useReducer',
      description: 'Quản lý form đăng nhập',
    },
    {
      id: 'optimization' as ScreenName,
      number: '05',
      title: 'useMemo & useCallback',
      description: 'Tìm kiếm và tính tổng sản phẩm',
    },
    {
      id: 'todo' as ScreenName,
      number: '06',
      title: 'Bài tổng hợp',
      description: 'Ứng dụng quản lý công việc',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.smallTitle}>
        MOBILE DEVELOPMENT
      </Text>

      <Text style={styles.title}>
        TUẦN 3
      </Text>

      <Text style={styles.subtitle}>
        HOOK TRONG REACT NATIVE
      </Text>

      <Text style={styles.student}>
        Nguyễn Trọng Đạt
      </Text>

      <View style={styles.list}>
        {exercises.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.numberBox}>
              <Text style={styles.number}>
                {item.number}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>

              <Text style={styles.cardDescription}>
                {item.description}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 24,
    paddingBottom: 50,
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#777',
    marginTop: 15,
  },

  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111',
    marginTop: 6,
  },

  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
    marginTop: 2,
  },

  student: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
    marginBottom: 28,
  },

  list: {
    gap: 12,
  },

  card: {
    minHeight: 88,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  cardPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.99 }],
  },

  numberBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  number: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  cardContent: {
    flex: 1,
    marginLeft: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },

  cardDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  arrow: {
    fontSize: 30,
    color: '#999',
  },

  topBar: {
    height: 58,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    paddingVertical: 10,
    paddingRight: 15,
  },

  backText: {
    fontSize: 15,
    fontWeight: '600',
  },

  weekText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#777',
  },

  pressed: {
    opacity: 0.5,
  },
});
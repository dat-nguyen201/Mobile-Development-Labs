import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Bai09Screen from './src/screens/Bai09Screen';
import Bai10Screen from './src/screens/Bai10Screen';
import Bai11Screen from './src/screens/Bai11Screen';
import Bai12Screen from './src/screens/Bai12Screen';
import Bai13Screen from './src/screens/Bai13Screen';
import Bai14Screen from './src/screens/Bai14Screen';
import Bai15Screen from './src/screens/Bai15Screen';

type ScreenName =
  | 'menu'
  | 'bai09'
  | 'bai10'
  | 'bai11'
  | 'bai12'
  | 'bai13'
  | 'bai14'
  | 'bai15';

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('menu');

  const renderScreen = () => {
    switch (screen) {
      case 'bai09':
        return <Bai09Screen />;

      case 'bai10':
        return <Bai10Screen />;

      case 'bai11':
        return <Bai11Screen />;

      case 'bai12':
        return <Bai12Screen />;

      case 'bai13':
        return <Bai13Screen />;

      case 'bai14':
        return <Bai14Screen />;

      case 'bai15':
        return <Bai15Screen />;

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
            <Text style={styles.backText}>
              ← Trang chủ
            </Text>
          </Pressable>

          <Text style={styles.weekText}>
            TUẦN 4
          </Text>
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
      id: 'bai09' as ScreenName,
      number: '09',
      title: 'News Feed',
      description: 'Fetch API + TypeScript + FlatList',
    },
    {
      id: 'bai10' as ScreenName,
      number: '10',
      title: 'User Profile',
      description: 'User | null + Optional Chaining',
    },
    {
      id: 'bai11' as ScreenName,
      number: '11',
      title: 'Product Search',
      description: 'Async Function + Typed Parameters',
    },
    {
      id: 'bai12' as ScreenName,
      number: '12',
      title: 'API Error Handling',
      description: 'Try/Catch + CustomError',
    },
    {
      id: 'bai13' as ScreenName,
      number: '13',
      title: 'Generic Filter',
      description: 'Generic <T> + Filter',
    },
    {
      id: 'bai14' as ScreenName,
      number: '14',
      title: 'Pagination',
      description: 'Generic Interface ApiResponse<T>',
    },
    {
      id: 'bai15' as ScreenName,
      number: '15',
      title: 'Pull to Refresh',
      description: 'Loading + Refreshing State',
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
        TUẦN 4
      </Text>

      <Text style={styles.subtitle}>
        TYPESCRIPT - API & ASYNC
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

            <Text style={styles.arrow}>
              ›
            </Text>
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
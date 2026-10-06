import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, FlatList, Switch, Alert,
  ActivityIndicator, RefreshControl,
  TouchableOpacity, StyleSheet
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

import MovieCard, { Movie } from './components/MovieCard';

const API = 'https://6ac4b67b54a61668c5f61722.mockapi.io/movies';
const LIMIT = 10;

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isTile, setIsTile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [errorPage, setErrorPage] = useState<number | null>(null);

  const page = useRef(1);
  const busy = useRef(false);

  const load = async (p: number, replace = false) => {
    if (busy.current) return;

    busy.current = true;
    if (p > 1) setLoadingMore(true);

    try {
      setErrorPage(null);

      const res = await fetch(`${API}?page=${p}&limit=${LIMIT}`);
      if (!res.ok) throw new Error();

      const data: Movie[] = await res.json();

      setMovies(old => {
        const list = replace ? data : [...old, ...data];

        // Không trùng id
        return list.filter(
          (m, i, a) => a.findIndex(x => x.id === m.id) === i
        );
      });

      page.current = p;
      setHasMore(data.length === LIMIT);
    } catch {
      setErrorPage(p);
    } finally {
      busy.current = false;
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load(1, true);
  }, []);

  const refresh = () => {
    setRefreshing(true);
    setHasMore(true);
    page.current = 1;
    load(1, true);
  };

  const loadMore = () => {
    if (!hasMore || busy.current || errorPage !== null) return;
    load(page.current + 1);
  };

  const selectMovie = (id: string) => {
    const m = movies.find(x => x.id === id);

    if (m) {
      Alert.alert(m.title, `${m.title} (${m.year})`);
    }
  };

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <Text style={s.heading}>Movie App</Text>

          <View style={s.switchRow}>
            <Text>Dạng lưới</Text>
            <Switch value={isTile} onValueChange={setIsTile} />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            numColumns={numColumns}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout={isTile ? 'tile' : 'row'}
                onSelect={selectMovie}
              />
            )}
            columnWrapperStyle={
              isTile ? s.columns : undefined
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
              />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <Text style={s.center}>Danh sách trống</Text>
            }
            ListFooterComponent={
              errorPage !== null ? (
                <View style={s.center}>
                  <Text>Tải thất bại</Text>
                  <TouchableOpacity
                    style={s.button}
                    onPress={() => load(errorPage)}
                  >
                    <Text style={s.buttonText}>Thử lại</Text>
                  </TouchableOpacity>
                </View>
              ) : loadingMore ? (
                <ActivityIndicator />
              ) : !hasMore ? (
                <Text style={s.center}>
                  — Đã hết danh sách —
                </Text>
              ) : null
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  header: {
    padding: 15
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  columns: {
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  center: {
    textAlign: 'center',
    padding: 15
  },
  button: {
    backgroundColor: '#333',
    padding: 8,
    marginTop: 5,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white'
  }
});
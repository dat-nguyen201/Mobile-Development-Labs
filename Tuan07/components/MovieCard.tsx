import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet
} from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isWatched: boolean;
};

type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({
  movie,
  layout = 'row',
  onSelect
}: MovieCardProps) {
  const tile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[s.card, tile && s.tile]}
      onPress={() => onSelect(movie.id)}
    >
      <View style={tile && s.posterBox}>
        <Image
          source={{ uri: movie.poster }}
          style={[s.poster, tile && s.posterTile]}
        />

        {tile && (
          <Text style={s.ratingTile}>
            ⭐ {Number(movie.rating).toFixed(1)}
          </Text>
        )}
      </View>

      <View style={s.info}>
        <Text numberOfLines={1} style={s.title}>
          {movie.title}
        </Text>

        {!tile && (
          <>
            <Text>{movie.genre} • {movie.year}</Text>
            <Text>⭐ {Number(movie.rating).toFixed(1)}</Text>
          </>
        )}

        <Text>{movie.isWatched ? '✅ Đã xem' : '⏳ Chưa xem'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MovieCard);

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8
  },
  tile: {
    flexDirection: 'column',
    width: '48%'
  },
  posterBox: {
    position: 'relative'
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 5
  },
  posterTile: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3
  },
  ratingTile: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    padding: 3
  },
  info: {
    flex: 1,
    padding: 8
  },
  title: {
    fontWeight: 'bold'
  }
});
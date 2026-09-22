import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { books, formatPrice } from "../data";

type Props = {
  columns?: 2 | 3;
};

export default function BookGrid({ columns = 2 }: Props) {
  const isThree = columns === 3;

  return (
    <View style={[styles.grid, isThree && styles.gridThree]}>
      {books.map((book) => (
        <View
          key={book.id}
          style={[
            styles.card,
            isThree ? styles.cardThree : styles.cardTwo,
          ]}
        >
          {/* ẢNH BÌA + BADGE */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: book.image }}
              style={styles.image}
            />

            {book.discount && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {book.discount}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.name} numberOfLines={2}>
            {book.name}
          </Text>

          <Text style={styles.price}>
            {formatPrice(book.price)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridThree: {
    justifyContent: "flex-start",
    gap: 8,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTwo: {
    width: "48%",
    marginBottom: 12,
  },

  cardThree: {
    width: "31%",
  },

  // VIEW CHA CỦA BADGE
  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },

  // BADGE ĐÈ LÊN ẢNH
  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#E53935",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
  },

  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginTop: 8,
    minHeight: 36,
  },

  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#25375B",
    marginTop: 6,
  },
});
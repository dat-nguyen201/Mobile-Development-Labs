import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Book, formatPrice } from "../data";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: book.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {book.name}
          </Text>

          <Text style={styles.author}>{book.author}</Text>
        </View>

        <Text style={styles.price}>
          {formatPrice(book.price)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  info: {
    flex: 1,
    height: 110,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  author: {
    marginTop: 6,
    color: "#666",
  },
  price: {
    color: "#25375B",
    fontSize: 16,
    fontWeight: "bold",
  },
});
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FloatingCart() {
  return (
    <View style={styles.cart}>
      <Text style={styles.icon}>🛒</Text>

      <View style={styles.countBadge}>
        <Text style={styles.countText}>4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // NÚT GIỎ HÀNG NỔI
  cart: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#405FC5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 10,
  },

  icon: {
    fontSize: 27,
    color: "white",
  },

  // BADGE SỐ LƯỢNG
  countBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  countText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
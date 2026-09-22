import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>📚 BookStore</Text>

      <View style={styles.icons}>
        <Text style={styles.icon}>⌕</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#25375B",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
  },
  icon: {
    color: "white",
    fontSize: 24,
  },
});
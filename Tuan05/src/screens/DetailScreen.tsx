import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import Header from "../components/Header";
import { books, formatPrice } from "../data";

export default function DetailScreen() {
  const book = books[0];

  return (
    <View style={styles.container}>
      {/* HEADER CỐ ĐỊNH */}
      <Header />

      {/* NỘI DUNG CUỘN */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ẢNH BÌA CĂN GIỮA */}
        <Image
          source={{ uri: book.image }}
          style={styles.image}
        />

        <Text style={styles.name}>
          {book.name}
        </Text>

        <Text style={styles.author}>
          Tác giả: {book.author}
        </Text>

        <Text style={styles.price}>
          {formatPrice(book.price)}
        </Text>

        <Text style={styles.heading}>
          Giới thiệu sách
        </Text>

        <Text style={styles.description}>
          {book.name} là một cuốn sách mang đến
          những câu chuyện và bài học thú vị cho
          người đọc.
          {"\n\n"}
          Nội dung sách giúp người đọc khám phá
          thêm những góc nhìn mới về cuộc sống,
          suy nghĩ và những lựa chọn của bản thân.
          {"\n\n"}
          Cuốn sách được trình bày dễ hiểu,
          phù hợp với những người yêu thích
          đọc sách và muốn mở rộng kiến thức.
          {"\n\n"}
          Đây là phần mô tả dài dùng để kiểm tra
          ScrollView trong React Native.
          {"\n\n"}
          Khi nội dung tăng lên, người dùng có
          thể cuộn để xem toàn bộ thông tin.
          Thanh thêm vào giỏ bên dưới vẫn phải
          đứng yên.
          {"\n\n"}
          Nội dung bổ sung để kiểm tra bố cục
          trên các thiết bị có chiều cao khác nhau.
        </Text>
      </ScrollView>

      {/* THANH DƯỚI CỐ ĐỊNH */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>
            Giá bán
          </Text>

          <Text style={styles.bottomPrice}>
            {formatPrice(book.price)}
          </Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            + Thêm vào giỏ
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },

  image: {
    alignSelf: "center",
    width: 190,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#25375B",
  },

  author: {
    fontSize: 15,
    color: "#666",
    marginTop: 8,
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E53935",
    marginTop: 12,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#25375B",
    marginTop: 24,
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 25,
  },

  // THANH CỐ ĐỊNH NGOÀI SCROLLVIEW
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  priceLabel: {
    color: "#666",
    fontSize: 13,
  },

  bottomPrice: {
    color: "#E53935",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#25375B",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
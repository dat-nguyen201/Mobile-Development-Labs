import React, {
    memo,
    useCallback,
    useMemo,
    useState,
  } from 'react';
  
  import {
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    StyleSheet,
  } from 'react-native';
  
  type Product = {
    id: string;
    name: string;
    price: number;
  };
  
  const products: Product[] = [
    {
      id: '1',
      name: 'Áo thun',
      price: 200000,
    },
    {
      id: '2',
      name: 'Quần jean',
      price: 450000,
    },
    {
      id: '3',
      name: 'Giày thể thao',
      price: 800000,
    },
  ];
  
  type ProductItemProps = {
    item: Product;
    onSelect: (product: Product) => void;
  };
  
  const ProductItem = memo(
    function ProductItem({
      item,
      onSelect,
    }: ProductItemProps) {
      return (
        <Pressable
          onPress={() => onSelect(item)}
          style={({ pressed }) => [
            styles.productCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.productName}>
            {item.name}
          </Text>
  
          <Text style={styles.price}>
            {item.price.toLocaleString('vi-VN')}đ
          </Text>
        </Pressable>
      );
    }
  );
  
  export default function OptimizationScreen() {
    const [keyword, setKeyword] = useState('');
    const [selectedName, setSelectedName] =
      useState('');
  
    // useMemo: lọc danh sách sản phẩm
    const filteredProducts = useMemo(() => {
      const normalizedKeyword =
        keyword.trim().toLocaleLowerCase('vi');
  
      return products.filter((product) =>
        product.name
          .toLocaleLowerCase('vi')
          .includes(normalizedKeyword)
      );
    }, [keyword]);
  
    // useMemo: tính tổng giá sản phẩm đang hiển thị
    const totalPrice = useMemo(() => {
      return filteredProducts.reduce(
        (total, product) =>
          total + product.price,
        0
      );
    }, [filteredProducts]);
  
    // useCallback: giữ nguyên tham chiếu của hàm
    const handleSelect = useCallback(
      (product: Product) => {
        setSelectedName(product.name);
        console.log(
          'Đã chọn:',
          product.name
        );
      },
      []
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Bài 5 - useMemo & useCallback
        </Text>
  
        <Text style={styles.subtitle}>
          Tìm kiếm và tính tổng sản phẩm
        </Text>
  
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Tìm sản phẩm..."
          style={styles.input}
        />
  
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>
            Sản phẩm đã chọn
          </Text>
  
          <Text style={styles.selected}>
            {selectedName || 'Chưa chọn'}
          </Text>
        </View>
  
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>
            Tổng giá
          </Text>
  
          <Text style={styles.total}>
            {totalPrice.toLocaleString(
              'vi-VN'
            )}đ
          </Text>
        </View>
  
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductItem
              item={item}
              onSelect={handleSelect}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Không tìm thấy sản phẩm
            </Text>
          }
          contentContainerStyle={
            styles.list
          }
        />
      </View>
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
      marginBottom: 20,
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#999',
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
    },
  
    infoBox: {
      backgroundColor: '#f2f2f2',
      borderRadius: 10,
      padding: 14,
      marginBottom: 10,
    },
  
    infoLabel: {
      color: '#777',
      fontSize: 13,
    },
  
    selected: {
      fontSize: 17,
      fontWeight: '600',
      marginTop: 3,
    },
  
    totalBox: {
      backgroundColor: '#222',
      borderRadius: 10,
      padding: 14,
      marginBottom: 16,
    },
  
    totalLabel: {
      color: '#bbb',
      fontSize: 13,
    },
  
    total: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 3,
    },
  
    list: {
      paddingBottom: 30,
    },
  
    productCard: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 16,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  
    productName: {
      fontSize: 16,
      fontWeight: '600',
    },
  
    price: {
      fontSize: 16,
      fontWeight: '700',
    },
  
    pressed: {
      opacity: 0.6,
    },
  
    empty: {
      textAlign: 'center',
      color: '#777',
      marginTop: 30,
    },
  });
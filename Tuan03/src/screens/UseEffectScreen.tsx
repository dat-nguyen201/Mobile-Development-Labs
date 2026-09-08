import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

export default function UseEffectScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Chưa kết nối');

  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 2 - useEffect</Text>

      <Text style={styles.subtitle}>
        Theo dõi trạng thái kết nối giả lập
      </Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>
              Kết nối thiết bị
            </Text>

            <Text style={styles.status}>
              {isConnected ? 'Đang bật' : 'Đang tắt'}
            </Text>
          </View>

          <Switch
            value={isConnected}
            onValueChange={setIsConnected}
          />
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      </View>

      <Text style={styles.note}>
        Thay đổi công tắc để kiểm tra useEffect
      </Text>
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
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    padding: 18,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 17,
    fontWeight: '600',
  },

  status: {
    marginTop: 5,
    color: '#777',
  },

  messageBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },

  message: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  note: {
    marginTop: 18,
    color: '#777',
    textAlign: 'center',
  },
});
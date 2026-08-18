import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';

// =====================================================
// BÀI 1 - CORE PRIMITIVES & INTERACTION
// Toàn bộ thực hiện trong App.tsx
// =====================================================

// =====================================================
// COMPONENT 1: HEADER
// =====================================================
function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        CORE PRIMITIVES & INTERACTION
      </Text>
    </View>
  );
}

// =====================================================
// COMPONENT 2: AVATAR
// =====================================================
function Avatar() {
  return (
    <Image
      source={{
        uri: 'https://i.pravatar.cc/200?img=12',
      }}
      style={styles.avatar}
      resizeMode="cover"
      accessibilityRole="image"
      accessibilityLabel="Ảnh đại diện sinh viên Nguyễn Trọng Đạt"
    />
  );
}

// =====================================================
// COMPONENT 3: INFO ROW
// =====================================================
type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

// =====================================================
// COMPONENT 4: SEARCH FIELD
// =====================================================
type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

function SearchField({
  value,
  onChangeText,
}: SearchFieldProps) {
  return (
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder="Tìm kiếm thông tin..."
      placeholderTextColor="#999999"
      accessibilityLabel="Ô tìm kiếm thông tin sinh viên"
      accessibilityHint="Nhập nội dung cần tìm kiếm"
    />
  );
}

// =====================================================
// COMPONENT 5: ACTION BUTTON
// =====================================================
type ActionButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

function ActionButton({
  title,
  onPress,
  disabled = false,
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: disabled,
      }}
      style={({ pressed }) => [
        styles.actionButton,

        pressed &&
          !disabled &&
          styles.actionButtonPressed,

        disabled &&
          styles.actionButtonDisabled,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.actionButtonText,

            disabled &&
              styles.actionButtonTextDisabled,
          ]}
        >
          {pressed && !disabled
            ? 'ĐANG NHẤN'
            : title}
        </Text>
      )}
    </Pressable>
  );
}

// =====================================================
// APP CHÍNH
// =====================================================
export default function App() {
  const [searchText, setSearchText] =
    useState('');

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1976d2"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <View style={styles.content}>
          <Text style={styles.exerciseLabel}>
            BÀI 1
          </Text>

          <Text style={styles.mainTitle}>
            Core Primitives & Interaction
          </Text>

          <Text style={styles.description}>
            Giao diện thông tin sinh viên sử dụng các
            thành phần cơ bản của React Native.
          </Text>

          {/* ================================================= */}
          {/* THẺ THÔNG TIN SINH VIÊN */}
          {/* ================================================= */}

          <View style={styles.studentCard}>
            <View style={styles.profileRow}>
              <Avatar />

              <View style={styles.profileInfo}>
                <Text style={styles.studentName}>
                  Nguyễn Trọng Đạt
                </Text>

                <Text style={styles.studentCode}>
                  MSSV: 23658241
                </Text>
              </View>
            </View>

            <SearchField
              value={searchText}
              onChangeText={setSearchText}
            />

            {searchText.trim().length > 0 && (
              <View style={styles.searchResult}>
                <Text style={styles.searchResultLabel}>
                  Nội dung đang nhập:
                </Text>

                <Text style={styles.searchResultText}>
                  {searchText}
                </Text>
              </View>
            )}

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>
                Thông tin sinh viên
              </Text>

              <InfoRow
                label="Họ tên:"
                value="Nguyễn Trọng Đạt"
              />

              <InfoRow
                label="MSSV:"
                value="23658241"
              />

              <InfoRow
                label="Email:"
                value="23658241@student.iuh.edu.vn"
              />

              <InfoRow
                label="Lớp:"
                value="DHKTPM19A"
              />
            </View>

            <ActionButton
              title="LƯU HỒ SƠ"
              onPress={() =>
                Alert.alert(
                  'Thông báo',
                  'Đã lưu hồ sơ sinh viên!'
                )
              }
            />
          </View>

          {/* ================================================= */}
          {/* INTERACTION */}
          {/* ================================================= */}

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              INTERACTION
            </Text>

            <Text style={styles.sectionTitle}>
              Phản hồi của Pressable
            </Text>

            <Text style={styles.sectionDescription}>
              Nhấn và giữ nút để quan sát trạng thái
              pressed. Nút vô hiệu hóa sẽ không thể
              tương tác.
            </Text>

            {/* PRESSABLE 1 */}

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Thông báo',
                  'Bạn vừa nhấn nút bình thường.'
                )
              }
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Nút bình thường"
              accessibilityHint="Nhấn để kiểm tra trạng thái Pressable"
              style={({ pressed }) => [
                styles.demoButton,

                pressed &&
                  styles.demoButtonPressed,
              ]}
            >
              {({ pressed }) => (
                <Text style={styles.demoButtonText}>
                  {pressed
                    ? 'ĐANG NHẤN'
                    : 'BÌNH THƯỜNG'}
                </Text>
              )}
            </Pressable>

            {/* PRESSABLE 2 */}

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Thông báo',
                  'Pressable hoạt động tốt.'
                )
              }
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Nút nhấn tôi"
              accessibilityHint="Nhấn và giữ để xem phản hồi trạng thái"
              style={({ pressed }) => [
                styles.demoButton,

                pressed &&
                  styles.demoButtonPressed,
              ]}
            >
              {({ pressed }) => (
                <Text style={styles.demoButtonText}>
                  {pressed
                    ? 'ĐANG NHẤN'
                    : 'NHẤN TÔI'}
                </Text>
              )}
            </Pressable>

            {/* DISABLED */}

            <Pressable
              disabled={true}
              accessibilityRole="button"
              accessibilityLabel="Nút vô hiệu hóa"
              accessibilityState={{
                disabled: true,
              }}
              style={[
                styles.demoButton,
                styles.disabledButton,
              ]}
            >
              <Text style={styles.disabledButtonText}>
                VÔ HIỆU
              </Text>
            </Pressable>
          </View>

          <Text style={styles.footer}>
            Nguyễn Trọng Đạt - 23658241
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// =====================================================
// STYLE
// =====================================================
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f6fa',
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 35,
  },

  // ==========================
  // HEADER
  // ==========================

  header: {
    backgroundColor: '#1976d2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#d9edff',
    fontSize: 13,
    marginTop: 5,
  },

  // ==========================
  // CONTENT
  // ==========================

  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  exerciseLabel: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: 'bold',
  },

  mainTitle: {
    color: '#1f2937',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },

  description: {
    color: '#667085',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 18,
  },

  // ==========================
  // STUDENT CARD
  // ==========================

  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,

    elevation: 3,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#1976d2',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },

  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flexShrink: 1,
  },

  studentCode: {
    color: '#777777',
    fontSize: 14,
    marginTop: 5,
  },

  // ==========================
  // SEARCH FIELD
  // ==========================

  searchInput: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#d4dbe5',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#f8fafc',
  },

  searchResult: {
    marginTop: 12,
    backgroundColor: '#eaf4ff',
    borderRadius: 8,
    padding: 12,
  },

  searchResultLabel: {
    color: '#1976d2',
    fontSize: 13,
    fontWeight: 'bold',
  },

  searchResultText: {
    color: '#333333',
    fontSize: 14,
    marginTop: 4,
  },

  // ==========================
  // INFO
  // ==========================

  infoBox: {
    backgroundColor: '#f3f8ff',
    borderRadius: 10,
    padding: 14,
    marginTop: 15,
  },

  infoTitle: {
    color: '#1976d2',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },

  infoLabel: {
    width: 80,
    fontSize: 13,
    color: '#667085',
  },

  infoValue: {
    flex: 1,
    flexShrink: 1,
    fontSize: 13,
    color: '#222222',
    fontWeight: '500',
  },

  // ==========================
  // ACTION BUTTON
  // ==========================

  actionButton: {
    minHeight: 48,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  actionButtonPressed: {
    opacity: 0.65,
    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  actionButtonDisabled: {
    backgroundColor: '#d7dce2',
  },

  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  actionButtonTextDisabled: {
    color: '#969da7',
  },

  // ==========================
  // INTERACTION SECTION
  // ==========================

  section: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,

    elevation: 2,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  sectionLabel: {
    color: '#1976d2',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  sectionTitle: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  sectionDescription: {
    color: '#667085',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 15,
  },

  // ==========================
  // PRESSABLE
  // ==========================

  demoButton: {
    minHeight: 48,
    backgroundColor: '#1976d2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  demoButtonPressed: {
    backgroundColor: '#0d47a1',
    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  demoButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  disabledButton: {
    backgroundColor: '#d7dce2',
  },

  disabledButtonText: {
    color: '#969da7',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // ==========================
  // FOOTER
  // ==========================

  footer: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 12,
    marginBottom: 15,
  },
});
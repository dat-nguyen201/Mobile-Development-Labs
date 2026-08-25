import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Course, courses } from './src/data/courses';
import {
  Student,
  studentSections,
} from './src/data/students';

// =====================================================
// COMPONENT CHUYỂN BÀI
// =====================================================

type TabButtonProps = {
  title: string;
  active: boolean;
  onPress: () => void;
};

function TabButton({
  title,
  active,
  onPress,
}: TabButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabButton,
        active && styles.tabButtonActive,
        pressed && styles.tabButtonPressed,
      ]}
    >
      <Text
        style={[
          styles.tabButtonText,
          active && styles.tabButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

// =====================================================
// BÀI 1 - FLATLIST
// =====================================================

interface CourseRowProps {
  course: Course;
  onPress: (course: Course) => void;
}

function CourseRow({
  course,
  onPress,
}: CourseRowProps) {
  return (
    <Pressable
      onPress={() => onPress(course)}
      style={({ pressed }) => [
        styles.courseCard,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.courseTitle}>
        {course.title}
      </Text>

      <Text style={styles.metaText}>
        Giảng viên: {course.instructor}
      </Text>

      <View style={styles.rowBetween}>
        <Text style={styles.category}>
          {course.category}
        </Text>

        <Text style={styles.studentCount}>
          {course.students} sinh viên
        </Text>
      </View>
    </Pressable>
  );
}

function CourseListScreen() {
  const [query, setQuery] = useState('');

  const normalizedQuery = query
    .trim()
    .toLocaleLowerCase('vi');

  const filteredCourses = courses.filter(
    (course) =>
      `${course.title} ${course.instructor} ${course.category}`
        .toLocaleLowerCase('vi')
        .includes(normalizedQuery)
  );

  const openCourse = (course: Course) => {
    Alert.alert(
      course.title,
      `Giảng viên: ${course.instructor}\nDanh mục: ${course.category}\nSố sinh viên: ${course.students}`
    );
  };

  return (
    <FlatList
      data={filteredCourses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CourseRow
          course={item}
          onPress={openCourse}
        />
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.weekLabel}>
            TUẦN 2 - BÀI 1
          </Text>

          <Text style={styles.screenTitle}>
            Course Catalog
          </Text>

          <Text style={styles.subtitle}>
            Danh sách khóa học bằng FlatList
          </Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm theo tên, giảng viên hoặc danh mục"
            placeholderTextColor="#8A8F98"
            returnKeyType="search"
            autoCorrect={false}
            style={styles.searchInput}
          />

          <Text style={styles.resultText}>
            Tìm thấy {filteredCourses.length} khóa học
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Không tìm thấy khóa học
          </Text>

          <Text style={styles.emptyText}>
            Hãy thử tìm kiếm bằng một từ khóa khác.
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}

// =====================================================
// BÀI 2 - SECTIONLIST
// =====================================================

interface StudentRowProps {
  student: Student;
  onPress: (student: Student) => void;
}

function getInitials(fullName: string) {
  const words = fullName.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${words[0][0]}${
    words[words.length - 1][0]
  }`.toUpperCase();
}

function StudentRow({
  student,
  onPress,
}: StudentRowProps) {
  const isActive =
    student.status === 'Đang học';

  return (
    <Pressable
      onPress={() => onPress(student)}
      style={({ pressed }) => [
        styles.studentCard,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {getInitials(student.fullName)}
        </Text>
      </View>

      <View style={styles.studentContent}>
        <Text style={styles.studentName}>
          {student.fullName}
        </Text>

        <Text style={styles.metaText}>
          {student.studentId} · {student.className}
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          isActive
            ? styles.activeBadge
            : styles.pausedBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isActive
              ? styles.activeText
              : styles.pausedText,
          ]}
        >
          {student.status}
        </Text>
      </View>
    </Pressable>
  );
}

function StudentDirectoryScreen() {
  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase('vi');

    if (!normalizedQuery) {
      return studentSections;
    }

    return studentSections
      .map((section) => ({
        ...section,

        data: section.data.filter(
          (student) =>
            `${student.fullName} ${student.studentId} ${student.className}`
              .toLocaleLowerCase('vi')
              .includes(normalizedQuery)
        ),
      }))

      .filter(
        (section) =>
          section.data.length > 0
      );
  }, [query]);

  const totalStudents =
    filteredSections.reduce(
      (total, section) =>
        total + section.data.length,
      0
    );

  const openStudent = (
    student: Student
  ) => {
    Alert.alert(
      student.fullName,
      `Mã sinh viên: ${student.studentId}\nLớp: ${student.className}\nTrạng thái: ${student.status}`
    );
  };

  return (
    <SectionList
      sections={filteredSections}
      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (
        <StudentRow
          student={item}
          onPress={openStudent}
        />
      )}

      renderSectionHeader={({
        section,
      }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {section.title}
          </Text>

          <Text style={styles.sectionCount}>
            {section.data.length}
          </Text>
        </View>
      )}

      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.weekLabel}>
            TUẦN 2 - BÀI 2
          </Text>

          <Text style={styles.screenTitle}>
            Student Directory
          </Text>

          <Text style={styles.subtitle}>
            Danh bạ sinh viên theo khoa
          </Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm tên, mã sinh viên hoặc lớp"
            placeholderTextColor="#8A8F98"
            returnKeyType="search"
            autoCorrect={false}
            style={styles.searchInput}
          />

          <Text style={styles.resultText}>
            Tìm thấy {totalStudents} sinh viên
          </Text>
        </View>
      }

      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Không tìm thấy sinh viên
          </Text>

          <Text style={styles.emptyText}>
            Không có sinh viên phù hợp với
            “{query.trim()}”.
          </Text>
        </View>
      }

      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}

      SectionSeparatorComponent={() => (
        <View
          style={styles.sectionSeparator}
        />
      )}

      stickySectionHeadersEnabled={true}

      contentContainerStyle={styles.listContent}

      keyboardShouldPersistTaps="handled"

      showsVerticalScrollIndicator={false}
    />
  );
}

// =====================================================
// APP
// =====================================================

export default function App() {
  const [screen, setScreen] =
    useState<'course' | 'student'>(
      'course'
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F4F6FA"
      />

      <View style={styles.tabContainer}>
        <TabButton
          title="BÀI 1 - FLATLIST"
          active={screen === 'course'}
          onPress={() =>
            setScreen('course')
          }
        />

        <TabButton
          title="BÀI 2 - SECTIONLIST"
          active={screen === 'student'}
          onPress={() =>
            setScreen('student')
          }
        />
      </View>

      <View style={styles.screenContainer}>
        {screen === 'course' ? (
          <CourseListScreen />
        ) : (
          <StudentDirectoryScreen />
        )}
      </View>
    </SafeAreaView>
  );
}

// =====================================================
// STYLE
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  screenContainer: {
    flex: 1,
  },

  // ==============================
  // TAB
  // ==============================

  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 8,
  },

  tabButton: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#E5E8EF',
    paddingHorizontal: 8,
  },

  tabButtonActive: {
    backgroundColor: '#3157A4',
  },

  tabButtonPressed: {
    opacity: 0.75,
  },

  tabButtonText: {
    color: '#596171',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },

  tabButtonTextActive: {
    color: '#FFFFFF',
  },

  // ==============================
  // LIST
  // ==============================

  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  weekLabel: {
    color: '#3157A4',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 5,
  },

  screenTitle: {
    color: '#182035',
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    color: '#697080',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },

  // ==============================
  // SEARCH
  // ==============================

  searchInput: {
    minHeight: 52,
    color: '#182035',
    fontSize: 16,
    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DDE1E8',
    borderRadius: 14,

    paddingHorizontal: 16,
  },

  resultText: {
    color: '#4E5665',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },

  // ==============================
  // COURSE
  // ==============================

  courseCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,
    padding: 18,

    borderWidth: 1,
    borderColor: '#E1E5EC',

    elevation: 2,
  },

  courseTitle: {
    color: '#182035',
    fontSize: 18,
    fontWeight: '700',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },

  category: {
    color: '#3157A4',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#E8F0FF',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    flexShrink: 1,
  },

  studentCount: {
    color: '#596171',
    fontSize: 13,
    marginLeft: 10,
  },

  // ==============================
  // STUDENT
  // ==============================

  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 15,
    padding: 14,

    borderWidth: 1,
    borderColor: '#E1E5EC',

    elevation: 1,
  },

  cardPressed: {
    opacity: 0.7,

    transform: [
      {
        scale: 0.99,
      },
    ],
  },

  avatar: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#E8F0FF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#3157A4',
    fontSize: 15,
    fontWeight: '800',
  },

  studentContent: {
    flex: 1,
    marginLeft: 12,
  },

  studentName: {
    color: '#182035',
    fontSize: 16,
    fontWeight: '700',
  },

  metaText: {
    color: '#686F7D',
    fontSize: 13,
    marginTop: 5,
  },

  // ==============================
  // STATUS
  // ==============================

  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 8,
  },

  activeBadge: {
    backgroundColor: '#E5F7ED',
  },

  pausedBadge: {
    backgroundColor: '#FFF0E2',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  activeText: {
    color: '#278454',
  },

  pausedText: {
    color: '#B26522',
  },

  // ==============================
  // SECTION HEADER
  // ==============================

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#F4F6FA',

    paddingTop: 13,
    paddingBottom: 9,
  },

  sectionTitle: {
    color: '#182035',
    fontSize: 17,
    fontWeight: '800',
  },

  sectionCount: {
    color: '#3157A4',
    fontSize: 13,
    fontWeight: '700',
  },

  sectionSeparator: {
    height: 6,
  },

  // ==============================
  // EMPTY
  // ==============================

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    paddingHorizontal: 24,
  },

  emptyTitle: {
    color: '#182035',
    fontSize: 19,
    fontWeight: '700',
  },

  emptyText: {
    color: '#747B88',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },

  separator: {
    height: 10,
  },
});
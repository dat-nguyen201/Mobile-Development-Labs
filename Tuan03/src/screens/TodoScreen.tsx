import React, {
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
  } from 'react';
  
  import {
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    StyleSheet,
    Switch,
  } from 'react-native';
  
  // ==================== TYPE ====================
  
  type Todo = {
    id: string;
    title: string;
    completed: boolean;
  };
  
  type TodoAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: string }
    | { type: 'DELETE_TODO'; payload: string };
  
  type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
  };
  
  // ==================== CONTEXT ====================
  
  const ThemeContext = createContext<ThemeContextType | null>(null);
  
  // ==================== REDUCER ====================
  
  function todoReducer(
    state: Todo[],
    action: TodoAction
  ): Todo[] {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: Date.now().toString(),
            title: action.payload,
            completed: false,
          },
        ];
  
      case 'TOGGLE_TODO':
        return state.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        );
  
      case 'DELETE_TODO':
        return state.filter(
          (todo) => todo.id !== action.payload
        );
  
      default:
        return state;
    }
  }
  
  // ==================== TODO ITEM ====================
  
  type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
  };
  
  const TodoItem = memo(function TodoItem({
    todo,
    onToggle,
    onDelete,
  }: TodoItemProps) {
    const theme = useContext(ThemeContext);
  
    const isDark = theme?.isDark ?? false;
  
    return (
      <View
        style={[
          styles.todoItem,
          isDark && styles.todoItemDark,
        ]}
      >
        <Pressable
          onPress={() => onToggle(todo.id)}
          style={styles.todoContent}
        >
          <View
            style={[
              styles.checkbox,
              todo.completed && styles.checkboxCompleted,
            ]}
          >
            {todo.completed && (
              <Text style={styles.check}>✓</Text>
            )}
          </View>
  
          <Text
            style={[
              styles.todoText,
              isDark && styles.textDark,
              todo.completed &&
                styles.todoCompleted,
            ]}
          >
            {todo.title}
          </Text>
        </Pressable>
  
        <Pressable
          onPress={() => onDelete(todo.id)}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.deleteText}>Xóa</Text>
        </Pressable>
      </View>
    );
  });
  
  // ==================== MAIN SCREEN ====================
  
  export default function TodoScreen() {
    // useState
    const [input, setInput] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isDark, setIsDark] = useState(false);
  
    // useReducer
    const [todos, dispatch] = useReducer(
      todoReducer,
      []
    );
  
    // useEffect
    useEffect(() => {
      console.log(
        `Danh sách hiện có ${todos.length} công việc`
      );
    }, [todos.length]);
  
    // useMemo - lọc công việc
    const filteredTodos = useMemo(() => {
      const normalizedKeyword =
        keyword.trim().toLocaleLowerCase('vi');
  
      return todos.filter((todo) =>
        todo.title
          .toLocaleLowerCase('vi')
          .includes(normalizedKeyword)
      );
    }, [todos, keyword]);
  
    // useMemo - đếm việc chưa hoàn thành
    const incompleteCount = useMemo(() => {
      return todos.filter(
        (todo) => !todo.completed
      ).length;
    }, [todos]);
  
    // useCallback - hoàn thành
    const handleToggle = useCallback(
      (id: string) => {
        dispatch({
          type: 'TOGGLE_TODO',
          payload: id,
        });
      },
      []
    );
  
    // useCallback - xóa
    const handleDelete = useCallback(
      (id: string) => {
        dispatch({
          type: 'DELETE_TODO',
          payload: id,
        });
      },
      []
    );
  
    const handleAdd = () => {
      const title = input.trim();
  
      if (!title) {
        return;
      }
  
      dispatch({
        type: 'ADD_TODO',
        payload: title,
      });
  
      setInput('');
    };
  
    const toggleTheme = () => {
      setIsDark((previous) => !previous);
    };
  
    return (
      <ThemeContext.Provider
        value={{
          isDark,
          toggleTheme,
        }}
      >
        <View
          style={[
            styles.container,
            isDark && styles.containerDark,
          ]}
        >
          <View style={styles.header}>
            <View>
              <Text
                style={[
                  styles.title,
                  isDark && styles.textDark,
                ]}
              >
                Bài 6 - Tổng hợp
              </Text>
  
              <Text
                style={[
                  styles.subtitle,
                  isDark && styles.subTextDark,
                ]}
              >
                Quản lý công việc cá nhân
              </Text>
            </View>
  
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
            />
          </View>
  
          <View style={styles.stats}>
            <Text style={styles.statsNumber}>
              {incompleteCount}
            </Text>
  
            <Text style={styles.statsText}>
              công việc chưa hoàn thành
            </Text>
          </View>
  
          <View style={styles.addRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Nhập công việc..."
              placeholderTextColor="#999"
              style={[
                styles.input,
                styles.addInput,
                isDark && styles.inputDark,
                isDark && styles.textDark,
              ]}
            />
  
            <Pressable
              onPress={handleAdd}
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.addButtonText}>
                Thêm
              </Text>
            </Pressable>
          </View>
  
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Tìm kiếm công việc..."
            placeholderTextColor="#999"
            style={[
              styles.input,
              isDark && styles.inputDark,
              isDark && styles.textDark,
            ]}
          />
  
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
            ListEmptyComponent={
              <Text
                style={[
                  styles.empty,
                  isDark && styles.subTextDark,
                ]}
              >
                Không có công việc
              </Text>
            }
            contentContainerStyle={styles.list}
          />
        </View>
      </ThemeContext.Provider>
    );
  }
  
  // ==================== STYLE ====================
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#f5f6f8',
    },
  
    containerDark: {
      backgroundColor: '#181818',
    },
  
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
  
    title: {
      fontSize: 26,
      fontWeight: 'bold',
    },
  
    subtitle: {
      fontSize: 15,
      color: '#666',
      marginTop: 3,
    },
  
    textDark: {
      color: '#fff',
    },
  
    subTextDark: {
      color: '#aaa',
    },
  
    stats: {
      backgroundColor: '#222',
      borderRadius: 12,
      padding: 16,
      marginBottom: 18,
    },
  
    statsNumber: {
      color: '#fff',
      fontSize: 28,
      fontWeight: 'bold',
    },
  
    statsText: {
      color: '#ccc',
    },
  
    addRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 12,
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 12,
    },
  
    addInput: {
      flex: 1,
    },
  
    inputDark: {
      backgroundColor: '#292929',
      borderColor: '#444',
    },
  
    addButton: {
      backgroundColor: '#222',
      paddingHorizontal: 20,
      justifyContent: 'center',
      borderRadius: 10,
    },
  
    addButtonText: {
      color: '#fff',
      fontWeight: '700',
    },
  
    list: {
      paddingTop: 15,
      paddingBottom: 30,
    },
  
    todoItem: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 14,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    todoItemDark: {
      backgroundColor: '#292929',
      borderColor: '#444',
    },
  
    todoContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: '#777',
      borderRadius: 6,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    checkboxCompleted: {
      backgroundColor: '#222',
    },
  
    check: {
      color: '#fff',
      fontWeight: 'bold',
    },
  
    todoText: {
      flex: 1,
      fontSize: 16,
    },
  
    todoCompleted: {
      textDecorationLine: 'line-through',
      opacity: 0.5,
    },
  
    deleteButton: {
      padding: 8,
    },
  
    deleteText: {
      color: 'red',
      fontWeight: '600',
    },
  
    empty: {
      textAlign: 'center',
      color: '#777',
      marginTop: 35,
    },
  
    pressed: {
      opacity: 0.5,
    },
  });
import React, { useReducer } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

type State = {
  email: string;
  password: string;
  error: string;
  isSubmitting: boolean;
};

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET' };

const initialState: State = {
  email: '',
  password: '',
  error: '',
  isSubmitting: false,
};

function formReducer(
  state: State,
  action: Action
): State {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
        error: '',
      };

    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
        error: '',
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function UseReducerScreen() {
  const [state, dispatch] = useReducer(
    formReducer,
    initialState
  );

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }

    if (!state.email.includes('@')) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Email không hợp lệ',
      });
      return;
    }

    if (state.password.length < 6) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Mật khẩu phải có ít nhất 6 ký tự',
      });
      return;
    }

    dispatch({
      type: 'SET_ERROR',
      payload: '',
    });

    dispatch({
      type: 'SET_SUBMITTING',
      payload: true,
    });

    setTimeout(() => {
      dispatch({
        type: 'SET_SUBMITTING',
        payload: false,
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bài 4 - useReducer
      </Text>

      <Text style={styles.subtitle}>
        Quản lý form đăng nhập
      </Text>

      <Text style={styles.label}>Email</Text>

      <TextInput
        value={state.email}
        onChangeText={(text) =>
          dispatch({
            type: 'SET_EMAIL',
            payload: text,
          })
        }
        placeholder="Nhập email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>
        Mật khẩu
      </Text>

      <TextInput
        value={state.password}
        onChangeText={(text) =>
          dispatch({
            type: 'SET_PASSWORD',
            payload: text,
          })
        }
        placeholder="Nhập mật khẩu"
        secureTextEntry
        style={styles.input}
      />

      {state.error ? (
        <Text style={styles.error}>
          {state.error}
        </Text>
      ) : null}

      <Pressable
        onPress={handleLogin}
        disabled={state.isSubmitting}
        style={({ pressed }) => [
          styles.loginButton,
          pressed && styles.pressed,
          state.isSubmitting && styles.disabled,
        ]}
      >
        <Text style={styles.buttonText}>
          {state.isSubmitting
            ? 'Đang đăng nhập...'
            : 'Đăng nhập'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          dispatch({ type: 'RESET' })
        }
        style={({ pressed }) => [
          styles.resetButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.resetText}>
          Đặt lại
        </Text>
      </Pressable>
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

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  error: {
    color: 'red',
    marginBottom: 14,
    fontWeight: '500',
  },

  loginButton: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  resetButton: {
    borderWidth: 1,
    borderColor: '#222',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  resetText: {
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.6,
  },

  disabled: {
    opacity: 0.5,
  },
});
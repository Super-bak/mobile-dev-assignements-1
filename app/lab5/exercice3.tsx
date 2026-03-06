import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Theme = {
  bg: string;
  text: string;
  card: string;
  btn: string;
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const light: Theme = {
  bg: '#fff',
  text: '#000',
  card: '#f0f0f0',
  btn: 'blue',
};

const dark: Theme = {
  bg: '#000',
  text: '#fff',
  card: '#333',
  btn: 'lightblue',
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [Dark, setDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then((value: any) => {
      if (value) setDark(value === 'dark');
    });
  }, []);

  const toggleTheme = async () => {
    const value = !Dark;
    setDark(value);
    await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{ theme: Dark ? dark : light, isDark: Dark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
};

const TestScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 20, width: '100%', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, color: theme.text, marginTop: 50 }}>
        Theme changer
      </Text>

      <Text style={{ color: theme.text }}>
        Current: {isDark ? 'Dark' : 'Light'}
      </Text>

      <TouchableOpacity
        onPress={toggleTheme}
        style={{ backgroundColor: theme.btn, marginTop: 20, borderRadius: 5 }}
      >
        <Text style={{ color: '#fff' }}>
          Switch to {isDark ? 'Light' : 'Dark'}
        </Text>
      </TouchableOpacity>

      
        <View
          style={{
            backgroundColor: theme.card,
            padding: 20,
            marginTop: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: theme.text }}>Card test</Text>
        </View>
      
    </View>
  );
};

export default function useeExercice3() {
  return (
    <ThemeProvider>
      <TestScreen />
    </ThemeProvider>
  );
}

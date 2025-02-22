import React, { createContext, useState, ReactNode, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { mainTheme, darkTheme } from './theme';

type Theme = typeof mainTheme;

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  ThemedButton: React.FC<{ title: string; onPress?: () => void }>;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(mainTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === mainTheme ? darkTheme : mainTheme));
  };

  const ThemedButton: React.FC<{ title: string; onPress?: () => void }> = ({ title, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: theme.buttonBackground }]}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ThemedButton }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
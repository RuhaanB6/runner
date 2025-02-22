import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from './lib/theme/ThemeContext';

function RootLayout() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme.background === theme.text ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
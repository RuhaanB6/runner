import { Stack } from 'expo-router';
import { ThemeProvider } from './lib/theme/ThemeContext';
//hello
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
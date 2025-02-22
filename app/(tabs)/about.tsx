import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../lib/theme/useTheme';

export default function AboutScreen() {
  const { theme, ThemedButton } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>About Screen</Text>

      <ThemedButton title="Toggle Theme" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../lib/theme/ThemeContext';

export default function AboutScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>

      <TouchableOpacity onPress={toggleTheme} style={styles.button}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#ffd33d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure this package is installed
import Map from '@/components/Map'; // Adjust the path if needed
import { useTheme } from '../lib/theme/useTheme';  // Adjust the path as needed


export default function Index(): JSX.Element {
  const { theme, toggleTheme } = useTheme();  // Get theme and toggleTheme from context
  return (
    <View style={styles.container}>
      <Map />
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: theme.buttonBackground }]}
        onPress={() => console.log('Start button pressed')}
      >
        <MaterialIcons name="play-arrow" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  },
});

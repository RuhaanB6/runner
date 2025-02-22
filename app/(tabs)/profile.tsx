import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../lib/theme/useTheme';  // Adjust the path as needed

// Import the image from the assets folder
import ProfileImage from '../../assets/images/react-logo.png'; // Adjust the path as needed
import CoinIcon from '../../assets/images/react-logo.png'; // Adjust the path as needed

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();  // Get theme and toggleTheme from context

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Circular Image Placement */}
      <View style={styles.imageContainer}>
        <Image
          source={ProfileImage} // Use the imported image
          style={styles.profileImage}
        />
      </View>

      {/* Username Field */}
      <Text style={[styles.username, { color: theme.text }]}>Username</Text>

      {/* Name Field */}
      <Text style={[styles.name, { color: theme.text }]}>John Doe</Text>

      {/* Points Counter with Coin Icon */}
      <View style={styles.pointsContainer}>
        <Image
          source={CoinIcon}
          style={styles.coinIcon}
        />
        <Text style={[styles.points, { color: theme.text }]}>1000</Text>
      </View>

      {/* Change Theme Button */}
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: theme.buttonBackground }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeButtonText, { color: theme.buttonText }]}>Change Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontFamily: 'Avenir',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Avenir',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  points: {
    fontSize: 22,
    fontFamily: 'Avenir',
  },
  themeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  themeButtonText: {
    fontSize: 16,
    fontFamily: 'Avenir',
  },
});

export default ProfileScreen;
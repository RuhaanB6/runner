import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Import the image from the assets folder
import ProfileImage from '../../assets/images/react-logo.png'; // Adjust the path as needed
import CoinIcon from '../../assets/images/react-logo.png'; // Adjust the path as needed

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Circular Image Placement */}
      <View style={styles.imageContainer}>
        <Image
          source={ProfileImage} // Use the imported image
          style={styles.profileImage}
        />
      </View>

      {/* Username Field */}
      <Text style={styles.username}>Username</Text>

      {/* Name Field */}
      <Text style={styles.name}>John Doe</Text>

      {/* Points Counter with Coin Icon */}
      <View style={styles.pointsContainer}>
        <Image
          source={CoinIcon} // Use the imported coin icon
          style={styles.coinIcon}
        />
        <Text style={styles.points}>1000</Text>
      </View>

      {/* Change Theme Button */}
      <TouchableOpacity style={styles.themeButton}>
        <Text style={styles.themeButtonText}>Change Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653', // Charcoal background
    alignItems: 'center',
    paddingTop: 50, // Adjust as needed
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes it circular
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    color: '#e9c46a', // Saffron text
    fontFamily: 'Avenir', // Use a rounded font like Avenir or similar
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: '#f4a261', // Sandy Brown text
    fontFamily: 'Avenir',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  coinIcon: {
    width: 30, // Size of the coin icon
    height: 30,
    marginRight: 10,
  },
  points: {
    fontSize: 22,
    color: '#e9c46a', // Saffron text
    fontFamily: 'Avenir',
  },
  themeButton: {
    backgroundColor: '#2a9d8f', // Persian Green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  themeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Avenir',
  },
});

export default ProfileScreen;
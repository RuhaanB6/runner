import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useTheme } from '../lib/theme/useTheme';  // Adjust the path as needed
import ProfileImage from '../../assets/images/profile.png'; // Adjust the path as needed
import CoinIcon from '../../assets/images/react-logo.png'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggleTheme from context
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState('Username');
  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');
  const [points, setPoints] = useState(0); // Set points to a number

  // Reload points from AsyncStorage when points change
useEffect(() => {
  const savePointsToAsyncStorage = async () => {
    await AsyncStorage.setItem('points', points.toString());
  };

  if (points !== 0) { // Prevent saving points if it hasn't changed from 0
    savePointsToAsyncStorage();
  }
}, [points]); // This runs every time the points state changes


  // Fetch profile data from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const usernameValue = await AsyncStorage.getItem('username') || 'Username';
        const firstNameValue = await AsyncStorage.getItem('firstName') || 'First';
        const lastNameValue = await AsyncStorage.getItem('lastName') || 'Last';
        const pointsValue = await AsyncStorage.getItem('points') || '0';
        
        setUsername(usernameValue);
        setFirstName(firstNameValue);
        setLastName(lastNameValue);
        setPoints(parseInt(pointsValue, 10)); // Ensure it's a number
      } catch (e) {
        console.error('Error fetching profile data:', e);
      }
    };

    fetchProfileData();
  }, []); // Only run once when the component mounts

  // Function to open the modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Function to handle saving the profile data
  const handleSave = async () => {
    try {
      // Store updated profile data
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('points', points.toString()); // Store as string
      
      closeModal(); // Close the modal after saving
    } catch (e) {
      console.error('Error saving profile data:', e);
    }
  };

  // Function to add points
// Function to add points
const addPoints = async () => {
  // Increment points by 10
  const newPoints = points + 10;
  
  // Update state with new points
  setPoints(newPoints);

  // Store updated points in AsyncStorage
  await AsyncStorage.setItem('points', newPoints.toString()); // Store as string
};


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Circular Image Placement */}
      <View style={styles.imageContainer}>
        <Image
          source={ProfileImage} // Use the imported image
          style={[styles.profileImage, { backgroundColor: theme.text }]}
        />
      </View>

      {/* Username Field */}
      <Text style={[styles.username, { color: theme.text }]}>{username}</Text>

      {/* Name Field */}
      <Text style={[styles.name, { color: theme.text }]}>{firstName} {lastName}</Text>

      {/* Points Counter with Coin Icon */}
      <View style={styles.pointsContainer}>
        <Image
          source={CoinIcon}
          style={styles.coinIcon}
        />
        <Text style={[styles.points, { color: theme.text }]}>{points}</Text>
      </View>

      {/* Add Points Button */}
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: theme.buttonBackground }]}
        onPress={addPoints}
      >
        <Text style={[styles.themeButtonText, { color: theme.buttonText, fontWeight: 'bold' }]}>Add 10 Points</Text>
      </TouchableOpacity>

      {/* Change Profile Button */}
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: theme.buttonBackground }]}
        onPress={openModal}
      >
        <Text style={[styles.themeButtonText, { color: theme.buttonText, fontWeight: 'bold' }]}>Update Profile</Text>
      </TouchableOpacity>

      {/* Modal for Changing Profile */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            {/* Username Input */}
            <TextInput
              style={styles.input}
              placeholder={username}
              value={username}
              onChangeText={setUsername}
              clearTextOnFocus={true}
            />

            {/* First Name Input */}
            <TextInput
              style={styles.input}
              placeholder={firstName}
              value={firstName}
              onChangeText={setFirstName}
              clearTextOnFocus={true}
            />

            {/* Last Name Input */}
            <TextInput
              style={styles.input}
              placeholder={lastName}
              value={lastName}
              onChangeText={setLastName}
              clearTextOnFocus={true}
            />

            {/* Save Button */}
            <Button title="Save" onPress={handleSave} />

            {/* Cancel Button */}
            <Button title="Cancel" onPress={closeModal} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 110,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontFamily: 'Avenir',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Avenir',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    marginTop: 30,
  },
  themeButtonText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default ProfileScreen;

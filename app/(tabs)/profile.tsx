import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useTheme } from '../lib/theme/useTheme';  // Adjust the path as needed

// Import the image from the assets folder
import ProfileImage from '../../assets/images/profile.png'; // Adjust the path as needed
import CoinIcon from '../../assets/images/react-logo.png'; // Adjust the path as needed

// Defining a few global variables to store the modifiable profile elements
// TODO: Make a file which stores all these 3 points of data and populate them with that field
let username_var: string = "Username";
let first_name_var: string = "First";
let last_name_var: string = "Last";
let points: number = 0;

if (username_var.length == 0) {
  username_var = "Username";
}
if (first_name_var.length == 0) {
  username_var = "First";
}
if (last_name_var.length == 0) {
  username_var = "Last";
}

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();  // Get theme and toggleTheme from context
  // State for the modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for the form fields
  const [username, setUsername] = useState('Username');
  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');

  // Function to open the modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Function to handle form submission
  const handleSave = () => {
    // Updating the values in the file and the above global variables
    username_var = username;
    first_name_var = firstName;
    last_name_var = lastName;
    if (username_var.length == 0) {
      username_var = "Username";
    }
    if (first_name_var.length == 0) {
      username_var = "First";
    }
    if (last_name_var.length == 0) {
      username_var = "Last";
    }
    closeModal(); // Close the modal after saving
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Circular Image Placement */}
      <View style={styles.imageContainer}>
        <Image
          source={ProfileImage} // Use the imported image
          style={[styles.profileImage, {backgroundColor: theme.text}]}
        />
      </View>

      {/* Username Field */}
      <Text style={[styles.username, {color: theme.text}]}>{username_var}</Text>

      {/* Name Field */}
      <Text style={[styles.name, {color: theme.text}]}>{first_name_var} {last_name_var}</Text>

      {/* Points Counter with Coin Icon */}
      <View style={styles.pointsContainer}>
        <Image
          source={CoinIcon}
          style={styles.coinIcon}
        />
        <Text style={[styles.points, {color: theme.text}]}>{String(points)}</Text>
      </View>

      {/* Change Profile Button */}
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: theme.buttonBackground }]}
        >
        <Text style={[styles.themeButtonText, { color: theme.buttonText }]}>Update Profile</Text>
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
              placeholder={username_var}
              value={username}
              onChangeText={setUsername}
              clearTextOnFocus={true}
            />

            {/* First Name Input */}
            <TextInput
              style={styles.input}
              placeholder={first_name_var}
              value={firstName}
              onChangeText={setFirstName}
              clearTextOnFocus={true}
            />

            {/* Last Name Input */}
            <TextInput
              style={styles.input}
              placeholder={last_name_var}
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
    paddingTop: 75, // Adjust as needed
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 30, // Added spacing below the image
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontFamily: 'Avenir',
    marginBottom: 25,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Avenir',
    marginBottom: 25, // Added spacing below the name
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Added spacing below the points counter
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
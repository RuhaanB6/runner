import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Button, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure this package is installed
import Map from '@/components/Map'; // Adjust the path if needed
import { useTheme } from '../lib/theme/useTheme';  // Adjust the path as needed
import Slider from "@react-native-community/slider" // Adding the community package for the slider

export default function Index(): JSX.Element {
  
  // State for sliderState
  const [sliderState, setSliderState] = React.useState<number>(0);

  // State for the modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalVisible(true);
  };
  
  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const { theme, toggleTheme } = useTheme();  // Get theme and toggleTheme from context
  return (
    <View style={styles.container}>
      <Map input_param={true}/>
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: theme.buttonBackground }]}
        onPress={openModal}
      >
        <MaterialIcons name="play-arrow" size={30} color="white" />
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
            <Text style={styles.modalTitle}>Randomize Route</Text>

            {/* Start Button */}
            <Text style={styles.modalText}>Select a distance</Text>
            <Slider
            style = {{ width: "90%", height: 20, alignContent: 'center'}}
            value={sliderState}
            onValueChange={(value) => setSliderState(value)}
            minimumValue={0.25}
            maximumValue={10}
            />
            <Text style={{fontSize: 14, fontWeight: "bold", textAlign: 'center'}}>{sliderState.toPrecision(2)} Miles</Text>

            {/* Confirm Button */}
            <TouchableOpacity
              style={[styles.themeButton, { backgroundColor: theme.buttonBackground }]}
              onPress={() => console.log({sliderState})}
              >
              <Text style={[styles.themeButtonText, { color: theme.buttonText }]}>Confirm Distance</Text>
              </TouchableOpacity>

            {/* The Map */}
            <Map input_param = {false}/>

            {/* Start Button */}
            
            <Button title="Start" onPress={() => console.log("Pressed Start")} />
      
            {/* Cancel Button */}
            <Button title="Cancel" onPress={closeModal} color="red" />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '70%',
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
  modalText: {
    fontSize: 16,
    fontWeight: 'medium',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left',
    marginLeft: 10,
  },
  themeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  themeButtonText: {
    fontSize: 16,
    fontFamily: 'Avenir',
  },
});

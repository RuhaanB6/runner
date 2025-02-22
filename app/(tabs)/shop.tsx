import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../lib/theme/useTheme';
import { mainTheme, darkTheme } from '../lib/theme/theme';

export default function ShopScreen() {
  const { theme, toggleTheme } = useTheme();
  const [selectedHeader, setSelectedHeader] = useState<string | null>(null);

  // Example headers data
  const headers = [
    { id: '1', label: 'Themes' },
    { id: '2', label: 'Button' },
  ];

  const themes = [
    { id: 1, label: 'Main Theme', theme: mainTheme },
    { id: 2, label: 'Dark Theme', theme: darkTheme },
  ];

  const getThemeById = (id: number) => {
    return themes.find((theme) => theme.id === id);
  };

  let points: number = 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Content section */}
      <View style={[styles.content, { backgroundColor: theme.shopbackground }]}>
        <View style={[styles.headerRow, { backgroundColor: theme.shopbackground }]}>

          {headers.map((header) => (
            <TouchableOpacity
              key={header.id}
              style={[
                styles.headerButton,
                {
                  backgroundColor:
                    selectedHeader === header.id ? theme.buttonBackground : theme.tabBarBackground,
                },
              ]}
              onPress={() => setSelectedHeader(header.id)}
            >
              <Text
                style={[
                  styles.headerText,
                  { color: selectedHeader === header.id ? theme.buttonText : theme.text },
                ]}
              >
                {header.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Scrollable additional content */}
      <ScrollView style={styles.scrollableContent}>
        {/* Frame with image */}
        <View style={styles.imageFrame}>
          <Image
            source={require('../../assets/images/runner_app_logo.png')}
            style={styles.image}
          />
        </View>

        {/* Text and button row */}
        <View style={styles.textButtonRow}>
          <Text style={[styles.text, { color: getThemeById(1)?.theme.text }]}>
            100 Points
          </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getThemeById(1)?.theme.buttonBackground }]}
              onPress={() => {
                const theme = getThemeById(1)?.theme;
                if (theme) {
                  toggleTheme(theme);
                } else {
                  console.warn('Theme not found');
                }
              }}
            >
              <Text style={[styles.buttonText, { color: getThemeById(1)?.theme.buttonText }]}>Button</Text>
            </TouchableOpacity>
        </View>

        {/* Second Frame with image */}
        <View style={styles.imageFrame}>
          <Image
            source={require('../../assets/images/blackTheme.png')}
            style={styles.image}
          />
        </View>

        {/* Second Text and button row */}
        <View style={styles.textButtonRow}>
          <Text style={[styles.text, { color: getThemeById(2)?.theme.text }]}>
            200 Points
          </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getThemeById(2)?.theme.buttonBackground }]}
              onPress={() => {
                const theme = getThemeById(2)?.theme;
                if (theme) {
                  toggleTheme(theme);
                } else {
                  console.warn('Theme not found');
                }
              }}
            >
              <Text style={[styles.buttonText, { color: getThemeById(2)?.theme.buttonText }]}>Button2</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.currencyContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.currencyText, { color: theme.text }]}>
          Points: {points}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  headerButton: {
    position: 'relative',
    top: 30,
    padding: 10,
    marginRight: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 20,
  },
  scrollableContent: {
    flex: 1,
    padding: 20,
  },
  additionalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  currencyContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageFrame: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  textButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});
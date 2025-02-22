import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '../lib/theme/useTheme';
import { mainTheme, darkTheme } from '../lib/theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShopScreen() {
const { theme, toggleTheme } = useTheme();
const [selectedHeader, setSelectedHeader] = useState<string | null>(null);
const [points, setPoints] = useState(0);
const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});

  // Fetch points from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch points
        const pointsStr = await AsyncStorage.getItem('points');
        const pointsValue = parseInt(pointsStr || '0', 10);
        setPoints(pointsValue);
  
        // Fetch purchase status for items
        const purchasedTheme1 = await AsyncStorage.getItem('purchased_theme_1');
        const purchasedTheme2 = await AsyncStorage.getItem('purchased_theme_2');
        setPurchasedItems({
          purchased_theme_1: purchasedTheme1 === 'true',
          purchased_theme_2: purchasedTheme2 === 'true',
        });
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };
  
    fetchData();
  }, [points, purchasedItems]);  // Adding dependencies to rerun if points or purchasedItems change
  

  const handlePurchase = async (itemId: string, cost: number, themeId: number) => {
    if (points >= cost) {
      const newPoints = points - cost;
      setPoints(newPoints);
      await AsyncStorage.setItem('points', points.toString()); // Store as string

  
      try {
        // Update points in AsyncStorage
        await AsyncStorage.setItem('points', newPoints.toString());
  
        // Mark the item as purchased
        await AsyncStorage.setItem(`purchased_${itemId}`, 'true');
        setPurchasedItems((prev) => ({ ...prev, [`purchased_${itemId}`]: true }));
  
        // Apply the theme immediately after purchase
        const purchasedTheme = getThemeById(themeId)?.theme;
        if (purchasedTheme) {
          toggleTheme(purchasedTheme);
        }
  
        Alert.alert('Purchase Successful', 'You have purchased the item!');
      } catch (e) {
        console.error('Error saving data:', e);
        Alert.alert('Error', 'Failed to save data.');
      }
    } else {
      Alert.alert('Not Enough Points', 'You do not have enough points to purchase this item.');
    }
  };

  const handleEquip = (themeId: number) => {
    const equippedTheme = getThemeById(themeId)?.theme;
    if (equippedTheme) {
      toggleTheme(equippedTheme);
    }
  };

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

  const equippedTheme = getThemeById(1)?.theme;

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
          <TouchableOpacity
            style={[styles.button, { backgroundColor: getThemeById(1)?.theme.buttonBackground }]}
            onPress={() => {
              const equippedTheme = getThemeById(1)?.theme;
              if (equippedTheme) {
                handleEquip(1);
              }
            }}
          >
            <Text style={[styles.buttonText, { color: getThemeById(1)?.theme.buttonText }]}>
              {getThemeById(1)?.id === 1 ? 'Equipped' : 'Equip'}
            </Text>
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
          {purchasedItems.purchased_theme_2 ? (
            <Text style={[styles.buttonText, { color: getThemeById(2)?.theme.text }]}>
              Purchased
            </Text>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getThemeById(2)?.theme.buttonBackground }]}
              onPress={() => handlePurchase('theme_2', 200, 2)}
            >
              <Text style={[styles.buttonText, { color: getThemeById(2)?.theme.buttonText }]}>
                Buy
              </Text>
            </TouchableOpacity>
          )}
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
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});
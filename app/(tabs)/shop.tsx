import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '../lib/theme/useTheme';
import { mainTheme, darkTheme } from '../lib/theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

// Array/Dictionary to store all the arrays
const PURCHASABLE_ITEMS = [
  { id: 'theme_1', cost: 100, themeId: 1 },
  { id: 'theme_2', cost: 200, themeId: 2 },
];

export default function ShopScreen() {

  const isFocused = useIsFocused(); // Add this hook
  const { theme, toggleTheme } = useTheme();
  const [selectedHeader, setSelectedHeader] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});

  const updateGlobalPoints = async (newPoints: number) => {
    try {
      // Update both storage and local state atomically
      await AsyncStorage.setItem('points', newPoints.toString());
      setPoints(newPoints);
    } catch (e) {
      console.error('Failed to update points:', e);
    }
  };
  
  // Modified useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load points
        const pointsStr = await AsyncStorage.getItem('points');
        setPoints(parseInt(pointsStr || '0', 10));

        // Dynamically load purchase status for all items
        const purchaseStatus = await Promise.all(
          PURCHASABLE_ITEMS.map(async (item) => {
            const value = await AsyncStorage.getItem(`purchased_${item.id}`);
            return { [`purchased_${item.id}`]: value === 'true' };
          })
        );
      
        setPurchasedItems(Object.assign({}, ...purchaseStatus));
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  // Updated handlePurchase function
  const handlePurchase = async (itemId: string, cost: number, themeId: number) => {
    const purchaseKey = `purchased_${itemId}`;

    // Check if already purchased
    if (purchasedItems[purchaseKey]) {
      Alert.alert('Already Owned', 'You already purchased this theme!');
      return;
    }

    if (points >= cost) {
      try {
        const newPoints = points - cost;
      
        // Atomic update sequence
        await AsyncStorage.multiSet([
          ['points', newPoints.toString()],
          [purchaseKey, 'true']
        ]);

        // Update local state
        setPoints(newPoints);
        setPurchasedItems(prev => ({
          ...prev,
          [purchaseKey]: true
        }));

        // Apply theme
        const purchasedTheme = getThemeById(themeId)?.theme;
        if (purchasedTheme) {
          toggleTheme(purchasedTheme);
          await AsyncStorage.setItem('selectedTheme', JSON.stringify(purchasedTheme));
        }

        Alert.alert('Purchase Successful', 'Theme applied successfully!');
      } catch (e) {
        console.error('Purchase failed:', e);
        Alert.alert('Error', 'Failed to complete purchase');
      }
    } else {
      Alert.alert('Insufficient Points', `You need ${cost - points} more points`);
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
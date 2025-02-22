import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let locationSubscription: Location.LocationSubscription | null = null;

        (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Location permission is required to show your position on the map.');
            setLoading(false);
            return;
        }

        // Get initial location
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
        setRegion({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        setLoading(false);

        // Start live location updates
        locationSubscription = await Location.watchPositionAsync(
            {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,      // Update every 5 seconds
            distanceInterval: 10,    // Update every 10 meters
            },
            (newLocation) => {
            setLocation(newLocation);
            setRegion((prevRegion) => ({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
                latitudeDelta: prevRegion?.latitudeDelta ?? 0.01,
                longitudeDelta: prevRegion?.longitudeDelta ?? 0.01,
            }));
            }
        );
        })();

        // Clean up the subscription on unmount
        return () => {
        locationSubscription?.remove();
        };
    }, []);

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    }

    return (
        <View style={styles.container}>
        {region && (
            <MapView
            style={styles.map}
            region={region}
            showsUserLocation
            showsMyLocationButton
            onRegionChangeComplete={setRegion}
            >
            </MapView>
        )}
        </View>
    );
};
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});




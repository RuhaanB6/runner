import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Region, Polyline, Polygon, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDcwUsznAwu7dWDBPAozCSNx3ph3B4NhXI'; 

export default function Map({ input_param }: { input_param?: boolean }) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Destination (hardcoded for this example)
  const destination = { latitude: 40.42406309238564, longitude: -86.9070466535453 }; 

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const fetchRoute = async (origin: { latitude: number; longitude: number }) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );

        if (response.data.routes.length) {
          const points = decodePolyline(response.data.routes[0].overview_polyline.points);
          setRouteCoordinates(points);
        } else {
          Alert.alert('No route found');
        }
      } catch (error) {
        console.error('Directions API error:', error);
        Alert.alert('Error fetching directions');
      }
    };

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      const userRegion = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setRegion(userRegion);
      setLoading(false);

      // Fetch route after setting location
      fetchRoute({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (newLocation) => {
          setLocation(newLocation);
          setRegion((prev) => ({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: prev?.latitudeDelta ?? 0.05,
            longitudeDelta: prev?.longitudeDelta ?? 0.05,
          }));
        }
      );
    })();

    return () => locationSubscription?.remove();
  }, []);

  // Decode polyline from Google Directions API
  const decodePolyline = (t: string) => {
    let points: { latitude: number; longitude: number }[] = [];
    let index = 0, lat = 0, lng = 0;

    while (index < t.length) {
      let result = 1, shift = 0, b: number;
      do {
        b = t.charCodeAt(index++) - 63 - 1;
        result += b << shift;
        shift += 5;
      } while (b >= 0x1f);
      lat += (result & 1) ? ~(result >> 1) : (result >> 1);

      result = 1; shift = 0;
      do {
        b = t.charCodeAt(index++) - 63 - 1;
        result += b << shift;
        shift += 5;
      } while (b >= 0x1f);
      lng += (result & 1) ? ~(result >> 1) : (result >> 1);

      points.push({ latitude: lat * 1e-5, longitude: lng * 1e-5 });
    }

    return points;
  };

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
          style={input_param ? styles.map : styles.small_map}
          region={region}
          showsUserLocation
          showsMyLocationButton
        >
          {/* User Location Marker */}
          {location && (
            <Marker
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
              title="You"
              description="Your current location"
            />
          )}

          {/* Destination Marker */}
          <Marker
            coordinate={destination}
            title="Destination"
            description="Target location"
            pinColor="green"
          />
          <Circle
            center={destination}
            radius={60}
            strokeWidth={3}
            strokeColor='#ffd33d'
            fillColor='ffd33d'
          />
          {/* Route Polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#1E90FF"
              strokeWidth={5}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // This is the style-sheet for the inside of the confirm route view
  small_map: { width: "90%", height: "98%", alignSelf: 'center', paddingTop: 20} 
});

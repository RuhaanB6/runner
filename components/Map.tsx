import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Region, Polyline, Polygon, Circle, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDcwUsznAwu7dWDBPAozCSNx3ph3B4NhXI'; 

export function getDestination( start_location: LatLng, range: number ):LatLng {
  const randomNum = (Math.random() * 2) - 1;  // random number from -1 to 1
  const random_latitude_value_miles = randomNum * range;
  const sign = ((Math.random() < 0.5) ? -1 : 1);  // random sign, -1 or 1
  const random_longitude_value_miles = sign * Math.sqrt((range ** 2) - (random_latitude_value_miles ** 2));
  const new_destination_latitude = (start_location.latitude + (random_latitude_value_miles / 69));
  const new_destination_longitude = (start_location.longitude + (random_longitude_value_miles / 52));
  return { latitude: new_destination_latitude, longitude: new_destination_longitude};
}

export default function Map({ input_param, range, end_location }: {input_param: boolean, range?: number, end_location?:LatLng }) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [destination, setDestination] = useState<LatLng>({ latitude: 0, longitude: 0 });  

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const fetchRoute = async (origin: { latitude: number; longitude: number }) => {
      try {
        const destination_latitude = (end_location ? end_location.latitude : 0);
        const destination_longitude = (end_location ? end_location.longitude : 0);

        setDestination({ 
          latitude: destination_latitude, 
          longitude: destination_longitude
        });
        console.log(`origin: ${origin.latitude}, ${origin.longitude}`);
        console.log(`Destination: ${destination_latitude}, ${destination_longitude}`);
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination_latitude},${destination_longitude}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`
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
      if (range && end_location) {
        fetchRoute({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      }

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
      ) ;
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

  console.log(`Destination coords: ${destination.latitude}, ${destination.longitude}`);

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          key={routeCoordinates.length}
          style={input_param ? styles.map : styles.small_map}
          region={region}
          showsUserLocation
          showsMyLocationButton
        >
          {range && (
            <>
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
                strokeColor="#ffd33d"
                fillColor="#ffd33d"
              />
              {routeCoordinates.length > 0 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor="#1E90FF"
                  strokeWidth={5}
                />
              )}
            </>
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

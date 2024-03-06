// SetLocation.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, PermissionsAndroid, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Colors } from '../../assets/colors';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';

interface SetLocationProps {
    navigation: any;
    route: any;
}

const SetLocation: React.FC<SetLocationProps> = ({ navigation, route }) => {
    const [location, setLocation] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<any>(null);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            // Request location permission
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            // Check if permission is granted
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentLocation();
            } else {
                // Alert the user if permission is denied
                Alert.alert(
                    'Location Permission Denied',
                    'To use this feature, please enable location services for the app in your device settings.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            // Handle errors during permission request
            console.error('Error requesting location permission:', error);
        }
    };

    const getCurrentLocation = () => {
        // Get the current location if permission is granted
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setSelectedLocation({ latitude, longitude });
            },
            (error) => {
                // Handle errors when getting the current location
                console.error('Error getting current location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const saveLocation = () => {
        console.log(selectedLocation,'sss')
        // Navigate to ConfirmOrder and pass the selected location
        navigation.navigate('ConfirmOrder', { address: location, selectedLocation });

        // Display the latitude and longitude in the input field
        if (selectedLocation) {
            const { latitude, longitude } = selectedLocation;
            setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
        }
    };

    const handleMapPress = (event: any) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    return (
        <>
            <HeaderNavigation type={'secondary'} title="Confirm order" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
            <View style={styles.container}>
                <Text style={styles.title}>Set Delivery Location</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 14.0583,
                        longitude: 108.2772,
                        latitudeDelta: 5,
                        longitudeDelta: 5,
                    }}
                    onPress={handleMapPress}
                >
                    {selectedLocation && (
                        <Marker coordinate={selectedLocation} title="Selected Location" />
                    )}
                </MapView>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your delivery address"
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />
                <TouchableOpacity style={styles.button} onPress={saveLocation}>
                    <Text style={styles.buttonText}>Save location</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    map: {
        flex: 1,
        height: 300,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export { SetLocation };

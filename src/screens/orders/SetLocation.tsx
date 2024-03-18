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

export interface SetLocationParams {
    name?: string;
    phoneNumber?: string;
}

const SetLocation: React.FC<SetLocationProps> = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<any>(null);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
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

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // getCurrentLocation();
            } else {
                Alert.alert(
                    'Location Permission Denied',
                    'To use this feature, please enable location services for the app in your device settings.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setSelectedLocation({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting current location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const saveLocation = () => {
        navigation.navigate('ConfirmOrder', { name, phoneNumber, address: location, selectedLocation });
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
            <HeaderNavigation type={'secondary'} title="Set location" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
            <View style={styles.container}>
                <Text style={styles.title}>Set Delivery Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your delivery address or get from map"
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />
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

                <TouchableOpacity onPress={saveLocation} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
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
        fontSize: 18,
    },
});

export { SetLocation };

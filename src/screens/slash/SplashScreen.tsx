import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('RegisterScreen');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.pinkBackground} />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinkBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primaryColor,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 331, 
    height: 90, 
    resizeMode: 'contain',
  },
});

export default SplashScreen;

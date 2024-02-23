import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors/index';

const ButtonComponent = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity style={styles.signUpButton} onPress={onPress}>
      <Text style={styles.signUpButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    padding: 12,
    backgroundColor: Colors.primaryColor,
    borderRadius: 12,
    marginTop: 15,
  },
  signUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
});

export { ButtonComponent };
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors/index';

interface ButtonComponentProps {
  onPress: () => void;
  buttonText: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: Colors.primaryColor,
    borderRadius: 12,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
});

export { ButtonComponent };
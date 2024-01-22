import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

// InputComponent receives value and onChangeText as props
const InputComponent = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: '#000',
    color: '#888',
  },
});

// Export the component
export { InputComponent };
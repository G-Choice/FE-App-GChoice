import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors';

const CreateGroup = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product name</Text>
        <TextInput style={styles.input} placeholder="Product name" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quantity expected</Text>
        <TextInput style={styles.input} placeholder="Quantity expected" keyboardType="numeric" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time</Text>
        <TextInput style={styles.input} placeholder="Time" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number phone</Text>
        <TextInput style={styles.input} placeholder="Number phone" keyboardType="numeric" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Address" />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text>CREATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: Colors.primaryColor, // Set the color of the label
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export {CreateGroup};

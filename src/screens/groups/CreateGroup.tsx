import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
const CreateGroup = () => {
  return (
    <>
        <HeaderNavigation type={'secondary'} title="Create group" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
    <View style={styles.container}>
       <View style={styles.avatarContainer}>
        <View style={styles.avatarWrapper}>
          <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
          <Icon name="circle" size={20} color={Colors.activeIconColor} style={styles.activeIcon} />
        </View>
        <View style={styles.avatarWrapper}>
          <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
          <Icon name="circle" size={20} color={Colors.activeIconColor} style={styles.activeIcon} />
        </View>
        <View style={styles.avatarWrapper}>
          <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
          <Icon name="circle" size={20} color={Colors.activeIconColor} style={styles.activeIcon} />
        </View>
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
    </>
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
  avatarWrapper: {
    marginRight: 5,
    overflow: 'hidden',
    borderRadius: 25,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activeIcon: {
    position: 'absolute',
    bottom: -1,
    right:2 ,
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

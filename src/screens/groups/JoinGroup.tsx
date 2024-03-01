import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, ImageBackground } from 'react-native';
import { Colors } from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import Toast from 'react-native-toast-message';

const JoinGroup = () => {
  const [quantity, setQuantity] = useState('');
  return (
    <>
      <HeaderNavigation type={'secondary'} title="Join group" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={require('../../assets/images/avt.jpg')} style={styles.avatar} />
            <Icon name="circle" size={20} color={Colors.activeIconColor} style={styles.activeIcon} />
          </View>
          <View style={styles.avatarWrapper}>
            <Image source={require('../../assets/images/avt.jpg')} style={styles.avatar} />
            <Icon name="circle" size={20} color={Colors.activeIconColor} style={styles.activeIcon} />
          </View>
          <View style={styles.avatarWrapper}>
            <Image source={require('../../assets/images/avt.jpg')} style={styles.avatar} />
            <Icon name="circle" size={20} color={Colors.activeIconColor} style={styles.activeIcon} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantity <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric" onChangeText={(text) => setQuantity(text)} value={quantity} />
        </View>

        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>JOIN GROUP</Text>
        </TouchableOpacity>
      </ImageBackground>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
    marginRight: 3,
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
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export { JoinGroup };
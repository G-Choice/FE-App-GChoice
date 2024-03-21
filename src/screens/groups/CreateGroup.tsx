import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Colors } from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import GchoiceAxios from '../../api';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-virtualized-view';
import { useDispatch } from 'react-redux';
import { updateGroupList } from '../../redux/actions/action';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

const CreateGroup = () => {
  const route = useRoute()
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const [selectedTime, setSelectedTime] = useState('');
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [quantityExpected, setQuantityExpected] = useState('');
  const [quantity, setQuantity] = useState('');
  const [groupNameError, setGroupNameError] = useState('');
  const [quantityExpectedError, setQuantityExpectedError] = useState('');
  const [selectedTimeError, setSelectedTimeError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [stations, setStations] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [selectedStation, setSelectedStation] = useState('Select station');
  useEffect(() => {
    fetchReceivingStations();
  }, []);

  const fetchReceivingStations = async () => {
    try {
      const response = await GchoiceAxios.get('/receiving-station');
      setStations(response.data.data);
    } catch (error) {
      console.error('Error fetching receiving stations:', error);
    }
  };
  const handleStationChange = (selectedStation: any) => {
    const [selectedStationName, selectedStationAddress] = selectedStation.split(' - ');
    const station = stations.find((station) => station.name === selectedStationName || station.address === selectedStationAddress);
    if (station) {
      setSelectedStationId(station.id);
    }
  };

  console.log(selectedStationId, 'nânna')
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setTimeModalVisible(false);
  };
  const validateInputs = () => {
    let isValid = true;
    if (!groupName.trim()) {
      setGroupNameError('Group name is required');
      isValid = false;
    } else {
      setGroupNameError('');
    }
    if (!quantityExpected.trim()) {
      setQuantityExpectedError('Quantity expected is required');
      isValid = false;
    } else {
      setQuantityExpectedError('');
    }
    if (!/^\d+$/.test(quantityExpected.trim())) {
      setQuantityExpectedError('Quantity expected must be a valid number');
      isValid = false;
    } else {
      setQuantityExpectedError('');
    }
    if (!selectedTime.trim()) {
      setSelectedTimeError('Selected time is required');
      isValid = false;
    } else {
      setSelectedTimeError('');
    }
    if (!quantity.trim()) {
      setQuantityError('Quantity is required');
      isValid = false;
    } else {
      setQuantityError('');
    }
    if (!/^\d+$/.test(quantity.trim())) {
      setQuantityError('Quantity must be a valid number');
      isValid = false;
    } else {
      setQuantityError('');
    }
    return isValid;
  };
  const productId = route.params
  const [hours, minutes] = selectedTime.split(' ');
  let parsedTime = parseInt(hours, 10);
  if (!isNaN(minutes)) {
    parsedTime += parseFloat(minutes) / 60;
  }
  const postDataToApi = async () => {
    try {
      if (!validateInputs()) {
        return;
      }
      const response = await GchoiceAxios.post('groups', {
        group_name: groupName,
        description: description,
        group_size: quantityExpected,
        hours: parsedTime,
        quantity_product: quantity,
        product_id: productId,
        receingStation_id: selectedStationId
      });
      console.log(response.data.message, 'tammmm')
      if (response.data.message === 'Group created successfully!') {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Create group successfully!',
          visibilityTime: 2000,
          autoHide: true,
        });
        console.log('id:', route.params)
        const updatedGroupList = await GchoiceAxios.get(`/groups/${route.params}`);
        dispatch(updateGroupList(updatedGroupList.data.data));
        navigation.navigate("GroupEachProduct", route.params);
      } else if (response.data.message === 'Group already exists ') {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Group already exists. You can not create group!',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'An error occurred. Please try again later.',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };
  const renderTimeOptions = () => {
    const timeOptions = ['1 hour', '12 hours', '12 hours 30 minutes', '24 hours', '25 hours 30 minutes', '48 hours'];
    return timeOptions.map((time) => (
      <TouchableOpacity
        key={time}
        style={[styles.timeOption, selectedTime === time && styles.selectedTimeOption]}
        onPress={() => handleTimeChange(time)}
      >
        <Text style={styles.timeOptionText}>{time}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <HeaderNavigation type={'secondary'} title="Create group" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.container}>
              <View style={styles.avatarContainer}>
                <Image source={require('../../assets/images/defaultGroup.jpg')} style={styles.avatar} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Group name <Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Group name" onEndEditing={(e) => setGroupName(e.nativeEvent.text)} defaultValue={groupName} />
                {groupNameError ? <Text style={styles.errorText}> {groupNameError}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} placeholder="Description" onEndEditing={(e) => setDescription(e.nativeEvent.text)} defaultValue={description} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantity expected <Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Quantity expected" keyboardType="numeric" onEndEditing={(e) => setQuantityExpected(e.nativeEvent.text)} defaultValue={quantityExpected} />
                {quantityExpectedError ? <Text style={styles.errorText}> {quantityExpectedError}</Text> : null}
              </View>

              <TouchableOpacity style={styles.inputContainer} onPress={() => setTimeModalVisible(true)}>
                <Text style={styles.label}>Expected time<Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Select time" editable={false} value={selectedTime} />
                {selectedTimeError ? <Text style={styles.errorText}> {selectedTimeError}</Text> : null}
              </TouchableOpacity>

              <Modal visible={isTimeModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Time</Text>
                    <View style={styles.timeOptionsContainer}>{renderTimeOptions()}</View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setTimeModalVisible(false)}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantity <Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric" onEndEditing={(e) => setQuantity(e.nativeEvent.text)} defaultValue={quantity} />
                {quantityError ? <Text style={styles.errorText}> {quantityError}</Text> : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Station</Text>
                <SelectDropdown
                  data={stations.map(station => `${station.name} - ${station.address}`)}
                  defaultValue={selectedStation}
                  onSelect={(selectedItem) => {
                    setSelectedStation(selectedItem);
                    handleStationChange(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedStation) => {
                    return selectedStation;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                  buttonStyle={[styles.dropdownButton, { width: '100%' }]}
                  buttonTextStyle={styles.dropdownButtonText}
                  dropdownStyle={styles.dropdown}
                  renderDropdownIcon={() => <Icon name="chevron-down" size={18} color={Colors.darkGrey} />} 
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={postDataToApi} >
                <Text style={styles.buttonText}>CREATE</Text>
              </TouchableOpacity>
            </ImageBackground>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    height: Dimensions.get('screen').height
  },

  scrollContainer: {
    flexGrow: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 50,
    borderRadius: 25,
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
    backgroundColor: Colors.secondaryColor,
    color: Colors.darkBlack
  },
  button: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.secondaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.secondaryColor,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeOptionsContainer: {
    marginBottom: 20,
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: Colors.secondaryColor,
  },
  selectedTimeOption: {
    backgroundColor: Colors.primaryColor,
  },
  timeOptionText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.secondaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: Colors.darkBlack,
    textAlign: 'left',
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  dropdownRow: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  dropdownRowText: {
    fontSize: 16,
    color: Colors.darkBlack,
  },
});

export { CreateGroup };
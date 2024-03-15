import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator, Keyboard  } from 'react-native';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '../../assets/colors';
import GchoiceAxios from '../../api';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../global-states';
interface InfoModalProps {
  title: string;
  value: string;
  closeModal: () => void;
  modalVisible: boolean; 
}

const InfoModal: React.FC<InfoModalProps> = ({ title, value, closeModal, modalVisible }) => {
  const [editedValue, setEditedValue] = useState(value);
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState(false); // Trạng thái loading bên ngoài modal

  const dispatch = useDispatch();
  useEffect(() => {
    setEditedValue(value);
    setError(null); 
  }, [value, modalVisible]);
  useEffect(() => {
    setEditedValue(value);
  }, [value]);
  const getCustomTitle = (originalTitle: string): string => {
    switch (originalTitle) {
      case 'number_phone':
        return 'Number phone'; 
      case 'username':
        return 'Name';
      case 'address':
        return 'Address';
      default:
        return 'originalTitle';
    }
  };
  const isUsernameValid = (username: string): boolean => {
    // Biểu thức chính quy để kiểm tra xem username có chỉ chứa các ký tự chữ cái không
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(username);
  };
  
  const isPhoneNumberValid = (phoneNumber: string): boolean => {
    const regex = /^\d{11}$/;
    return regex.test(phoneNumber);
  };
  
  const handleConfirm = async () => {
    setError(null); 
    setLoading(true); // Bắt đầu hiển thị indicator loading bên ngoài modal
    if (title === 'username' && !isUsernameValid(editedValue)) {
      setError('Name is not valid!');
      setLoading(false)
      return;
    }
  
    if (title === 'number_phone' && !isPhoneNumberValid(editedValue)) {
      setError('Number phone is not valid!');
      setLoading(false)
      return;
    }

    const requestData = {
      [title]: editedValue,
    };
  
    try {
      const response = await GchoiceAxios.patch('/user', requestData);
      console.log('Update successful', response.data); 
      const updateInforUser = await GchoiceAxios.get(`user/currentUser`);
      dispatch(updateUserInfo(updateInforUser.data));
      closeModal();
    } catch (error) {
      console.error('Update failed', error);
    } finally {
      setLoading(false); // Dừng hiển thị indicator loading bên ngoài modal
    }
  };
  
  return (
    <>
    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.modalContainer}>
      {loading && <ActivityIndicator size="large" color={Colors.primaryColor} />} 
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{getCustomTitle(title)}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <IconSimple name="close" size={20} color={Colors.darkBlack} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.modalInput}
            value={editedValue}
            onChangeText={(text) => setEditedValue(text)}
            editable={true}
          />
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
          
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>
);
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
  },
  confirmButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryColor,
    width: 200,
  },
  confirmButtonText: {
    color: Colors.secondaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  errorContainer: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  }
});

export {InfoModal} ;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import GchoiceAxios from '../../api';

interface JoinModalProps {
  visible: boolean;
  onClose: () => void;
  onJoin: (quantity: number) => void;
  groupId?: number;
  groupName?: string
}

const JoinModal: React.FC<JoinModalProps> = ({ visible, onClose, onJoin, groupId, groupName }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const navigation = useNavigation();

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  const handleJoin = async () => {
    try {
      const response = await GchoiceAxios.post('/groups/joinGroup', {
        quantity_product: quantity,
        group_id: groupId,
      });

      if (response.data.message === 'Joined group successfully') {
        onJoin(quantity);
        navigation.navigate('GroupCart');
      } else {
        console.error('Failed to join the group:', response.data.message);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalWrapper}>
        <View style={styles.picker}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>
              <Icon name="times" size={23} color="grey" />
            </Text>
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={require('../../assets/images/defaultGroup.jpg')} />
          </View>
          <Text style={styles.groupName}>{groupName}</Text>
          <Text style={styles.instructions}>Please select the quantity of products:</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecrease}>
              <Icon name="minus" size={24} color={Colors.primaryColor} />
            </TouchableOpacity>
            <TextInput
  style={styles.quantityInput}
  keyboardType="numeric"
  returnKeyType='done'
  value={quantity.toString()}
  onChangeText={(text) => {
    const sanitizedText = text.replace(/[^0-9]/g, ''); 
    const newValue = parseInt(sanitizedText, 10);

    if (!isNaN(newValue) && newValue > 0) {
      setQuantity(newValue);
    }
  }}
/>

            <TouchableOpacity onPress={handleIncrease}>
              <Text>
                <Icon name="plus" size={24} color={Colors.primaryColor} />
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleJoin}>
            <Text style={styles.buttonText}>
              JOIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    width: 300,
    padding: 16,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: 'pink',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 50,
    borderRadius: 20,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 4,
    marginHorizontal: 10,
    padding: 8,
    width: 40,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.primaryColor,
    width: 100,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.secondaryColor,
    fontWeight: '600'
  }
});

export default JoinModal;

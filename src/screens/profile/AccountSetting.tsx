import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '../../assets/colors';
import { InfoModal } from '../../components/group/InforModal';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';

import GchoiceAxios from '../../api';
import { updateUserInfo } from '../../global-states';
import { ActivityIndicator } from 'react-native';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
const AccountSetting: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInfor, setSelectedInfor] = useState<{ title: string; value: string }>({});
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<any>()
  const dispatch = useDispatch<any>()
  const userInfo = useSelector((state: any) => state.auth.userInfo);


  const handleInforPress = async (title: string, value: string) => {
    if (title === 'Image') {
      try {
        setIsLoading(true); 

        const image = await ImageCropPicker.openPicker({
          mediaType: 'photo',
        });

        if (image) {
          const formData = new FormData();
          formData.append('file', {
            uri: image.path,
            type: image.mime,
            name: image.filename || image.path.split('/').pop()
          });
          try {
            const response = await GchoiceAxios.patch('/user', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

            console.log('Avatar update successful', response.data.data.image);
            const updateInforUser = await GchoiceAxios.get(`user/currentUser`);
            dispatch(updateUserInfo(updateInforUser.data));
          } catch (error) {
            console.error('Avatar update failed', error);
          } finally {
            setIsLoading(false); 
          }
        }
      } catch (error) {
        console.log('ImagePicker Error: ', error);
        setIsLoading(false); 
      }
    } else {
      let updatedTitle = title;
      setSelectedInfor({ title: updatedTitle, value });
      setModalVisible(true);
    }
  };

  useEffect(() => {
    console.log('userInfo updated:', userInfo);
  }, [userInfo]);

  return (
    <>
    <HeaderNavigation type={'secondary'} title="Account Setting" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
    <View style={styles.container}>
      <ImageBackground style={styles.cameraIconContainer} source={userInfo?.data?.image ? { uri: userInfo.data.image[0] } : require('../../assets/images/avt.jpg')}>
      {isLoading && <ActivityIndicator size="large" color="#FA7189" />}
        <TouchableOpacity style={styles.cameraIcon} onPress={() => handleInforPress('Image', '')}>
          <IconSimple name="camera" size={50} color="#FA7189" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoItem} onPress={() => handleInforPress('username', userInfo ? userInfo.data.username : 'No Name')}>
          <Text style={styles.infoTitle}>Name:</Text>
          <Text style={styles.infoValue}>{userInfo ? userInfo.data.username : 'No Information'} <IconSimple name="arrow-right" size={15} color={Colors.darkBlack} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoItem} onPress={() => handleInforPress('email', userInfo ? userInfo.data.email : 'No Email')} disabled={true}
        >
          <Text style={styles.infoTitle}>Email:</Text>
          <Text style={styles.infoValue}>{userInfo ? userInfo.data.email : 'No Information'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoItem} onPress={() => handleInforPress('number_phone', userInfo ? userInfo.data.number_phone : 'No Number phone')}>
          <Text style={styles.infoTitle}>Number phone:</Text>
          <Text style={styles.infoValue}>{userInfo ? userInfo.data.number_phone : 'No Information'} <IconSimple name="arrow-right" size={15} color={Colors.darkBlack} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoItem} onPress={() => handleInforPress('address', userInfo ? userInfo.data.address : 'No Address')}>
          <Text style={styles.infoTitle}>Address:</Text>
          <Text style={styles.infoValue}>{userInfo ? userInfo.data.address : 'No Information'}<IconSimple name="arrow-right" size={15} color={Colors.darkBlack} /> </Text>
        </TouchableOpacity>
      </View>
      <InfoModal title={selectedInfor.title} value={selectedInfor.value} closeModal={() => setModalVisible(false)} modalVisible={modalVisible} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0F0',
  },
  cameraIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    opacity: 0.7,
  },
  cameraIcon: {
    backgroundColor: '#4285F4',
    borderRadius: 50,
    padding: 20,
  },
  infoContainer: {
    flex: 1,
    marginBottom: 100
  },
  infoItem: {
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'space-between'

  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingLeft: 10
  },
  infoValue: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
});

export { AccountSetting };

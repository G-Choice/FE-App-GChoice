import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Colors } from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import GchoiceAxios from '../../api';
import { useDispatch, useSelector} from 'react-redux';
import { logout  } from '../../global-states/data-states/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';

// import messaging, {
//     FirebaseMessagingTypes,
//     firebase
//   } from "@react-native-firebase/messaging";

const statusData = [
    { id: 1, name: 'Chờ xác nhận', icon: 'hourglass', color: '#777171', quantity: 1 },
    { id: 2, name: 'Chờ lấy hàng', icon: 'shopping-cart', color: '#777171', quantity: 0 },
    { id: 3, name: 'Đang giao', icon: 'truck', color: '#777171', quantity: 0 },
    { id: 4, name: 'Đã giao', icon: 'check-circle', color: '#777171', quantity: 0 },
];

const orderHistoryData = [
    { id: 1, name: 'Product 1', image: require('../../assets/images/avt.jpg'), price: '50.00' },
    { id: 2, name: 'Product 2', image: require('../../assets/images/avt.jpg'), price: '35.00' },
    { id: 3, name: 'Product 1', image: require('../../assets/images/avt.jpg'), price: '50.00' },
    { id: 4, name: 'Product 2', image: require('../../assets/images/avt.jpg'), price: '35.00' },
    { id: 5, name: 'Product 1', image: require('../../assets/images/avt.jpg'), price: '50.00' },
    { id: 6, name: 'Product 2', image: require('../../assets/images/avt.jpg'), price: '35.00' },];

const ProfileScreen = () => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>();
    const userInfo = useSelector((state) => state.auth.userInfo); 

    const handleLogout = useCallback(async () => {
        try {
            const response = await GchoiceAxios.post('/auth/logout');
            await AsyncStorage.removeItem('accessToken');
            dispatch(logout());
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }, [dispatch, navigation]);


    const renderOrderItem = ({ item }: { item: { id: number, name: string, image: any, price: string } }) => (
        <View style={styles.orderItem}>
            <Image source={item.image} style={styles.orderItemImage} />
            <View style={styles.orderItemDetails}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemPrice}>${item.price}</Text>
            </View>
        </View>
    );

    // console.log('firebase apps', firebase.apps);

// if (firebase.apps.length === 0) {
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyBsY7IiTyRsdUm_vMFTzQzIRmW2IdwIneM',
  //   storageBucket: 'gchoice-3b866.appspot.com',
  //   projectId: 'gchoice-3b866',
  //   authDomain: 'gchoice-3b866.firebaseapp.com',
  //   messagingSenderId: '578702676032',
  //   appId: '1:578702676032:android:1ff526c5c6728f6628cfa5',
  //   databaseURL: 'https://gchoice-3b866.firebaseio.com'
  // };
//   const firebaseConfig = {
//     "apiKey": "AIzaSyBsY7IiTyRsdUm_vMFTzQzIRmW2IdwIneM",
//     "appId": "1:578702676032:android:1ff526c5c6728f6628cfa5",
//     "databaseURL": 'https://gchoice-3b866.firebaseio.com',
//     "gaTrackingId": null,
//     "messagingSenderId": "578702676032",
//     "projectId": "gchoice-3b866",
//     "storageBucket": "gchoice-3b866.appspot.com"
//   }
//   console.log('initializarion', firebase.initializeApp(firebaseConfig));
//   console.log('firebase configured');
// }
    
//     console.log('firebase app in profile blublu', firebase.apps);
// if (firebase.apps.length > 0) {
//     console.log('configuring notifications');
//     messaging().setBackgroundMessageHandler(async mess => {
  
//     })
  
//     messaging().onNotificationOpenedApp(mess => {
//         console.log(mess);
//     })
//   }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
            <Image source={userInfo?.data?.image ? { uri: userInfo.data.image[0] } : require('../../assets/images/avt.jpg')} style={styles.avatar} />
                <Text style={styles.username}>{userInfo ? userInfo.data?.username: 'No Name'}</Text>
            </View>

            <View style={styles.digitalContainer}>
                <View style={styles.iconTextWrapper}>
                    <IconSimple name="notebook" size={20} color={Colors.primaryColor} />
                    <Text style={styles.infoTitle}> My Wallet </Text>
                </View>
            </View>

            <View style={styles.statusContainer}>
                {statusData.map((status) => (
                    <TouchableOpacity key={status.id} style={styles.statusItem}>
                        <Icon name={status.icon} size={23} color={status.color} />
                        <Text style={{ color: status.color }}>{status.name}</Text>
                        {status.quantity > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{status.quantity}</Text></View>}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.historyItem} >
                <Icon name="history" size={20} color={Colors.primaryColor} style={{ marginRight: 5 }} />
                <Text style={styles.infoTitle}>History Order</Text>
            </View>
            <View style={styles.orderHistory}>
                <FlatList
                    data={orderHistoryData}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate('AccountSetting')}>
                <IconSimple name="settings" size={20} color={Colors.primaryColor} style={{ marginRight: 5 }} />
                <Text style={styles.infoTitle}>Account Setting</Text>
            </TouchableOpacity>

            <View style={styles.menuItem} >
                <IconSimple name="question" size={20} color={Colors.primaryColor} style={{ marginRight: 5 }} />
                <Text style={styles.infoTitle}>Help Center</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
                <IconSimple name="login" size={20} color={Colors.primaryColor} />
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        // justifyContent: 'space-between',

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 15
    },
    username: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, 
        color: Colors.secondaryColor,
        alignSelf:'center'
    },
    editButton: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: '#4285F4',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    digitalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    statusItem: {
        alignItems: 'center',
    },
    badge: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 20,
        position: 'absolute',
        top: -5,
        right: 10,
        width: 20,
        height: 20,
      },
      badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 2,
        textAlign: 'center',
        alignSelf:'center'
      },
    iconTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoTitle: {
        fontSize: 14,
        color: Colors.darkBlack,
        paddingRight: 10

    },
    orderHistory: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        flexDirection: 'row'
    },
    orderItem: {
        marginRight: 16,
    },
    orderItemImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    orderItemDetails: {
        marginTop: 8,
    },
    orderItemName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    orderItemPrice: {
        fontSize: 12,
        color: Colors.primaryColor,
        fontWeight: '600'
    },
    changePasswordButton: {
        padding: 16,
        borderRadius: 5,
        backgroundColor: '#4285F4',
        alignItems: 'center',
    },
    changePasswordButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        justifyContent:'center',
        alignItems: 'center',
        marginRight: 10,
        width: 300,
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
        alignSelf:'center'
    },

    logoutButtonText: {
        color: Colors.darkBlack,
        fontWeight: '600',
        fontSize: 16,
        marginRight: 5,
        // color: Colors.primaryColor  
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 10,
        padding: 16,
        // borderWidth: 1,
        // borderColor: '#ddd',
        // borderRadius: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export { ProfileScreen };

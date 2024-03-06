import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Colors } from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import GchoiceAxios from '../../api';
import { UseDispatch, useDispatch } from 'react-redux';
import { logout } from '../../global-states/data-states/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';

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

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <Image source={require("../../assets/images/avt.jpg")} style={styles.avatar} />
                <Text style={styles.username}>Ut Vien</Text>
            </View>
            <View style={styles.digitalContainer}>
                <Text>
                    <Icon name="mobile-phone" size={25} color={Colors.primaryColor} />
                    <Text style={styles.infoTitle}> Digital Purchases </Text>
                </Text>
            </View>
            <View style={styles.digitalContainer}>
                <Text>
                    <IconSimple name="notebook" size={20} color={Colors.primaryColor} />
                    <Text style={styles.infoTitle}> My Purchases </Text>
                </Text>
            </View>
            <View style={styles.digitalContainer}>
                <Text>
                    <IconSimple name="notebook" size={20} color={Colors.primaryColor} />
                    <Text style={styles.infoTitle}> My Wallet </Text>
                </Text>
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

            <Text>  <Icon name="mobile-phone" size={23} color={Colors.primaryColor} />
                <Text style={styles.infoTitle}>History order </Text></Text>
            <View style={styles.orderHistory}>

                <FlatList
                    data={orderHistoryData}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
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
        flexDirection: 'row'
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
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    statusItem: {
        alignItems: 'center',
    },
    badge: {
        backgroundColor: 'red',
        borderRadius: 20,
        position: 'absolute',
        top: -5,
        right: 10,
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 2,
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
        padding: 16,
        borderRadius: 5,
        backgroundColor: Colors.secondaryColor,
        alignItems: 'center',
        marginBottom: 16,
        // margin: 2,
        width: 300,
        borderWidth: 2,
        borderColor: Colors.primaryColor,
    },
    logoutButtonText: {
        color: Colors.darkBlack,
        fontWeight: 'bold',
    },
});

export { ProfileScreen };

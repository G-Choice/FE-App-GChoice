import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ProgressBarAndroid, Image } from 'react-native';
import { GroupResApiType } from '../../@types/GroupResApiType.ts';
import { TextFormat } from '../text';
import { AvatarBubble } from '../child';
import { Colors } from '../../assets/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import JoinModal from './JoinModal.tsx';
import moment from 'moment';
import { CountDown } from '../time';

const CardGroup = (props: GroupResApiType) => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const [quantity, setQuantity] = useState<number>(1);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [groupModalId, setGroupModalId] = useState<number | null>(null);

    const handlePressJoin = () => {
        setShowPicker(true);
    };

    const handleConfirmJoin = (quantity: number) => {
        setShowPicker(false);
        setGroupModalId(props.id ?? null);
    };

    const handleClosePicker = () => {
        setShowPicker(false);
    };

    const duration = moment.duration(props.remainingHours, 'hours');
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const process = (props.current_quantity ?? 0) / (props.expected_quantity || 1);
    const firstImage = props.products[0]?.images[0];

    let statusColor: string;
    let statusText: string;

    switch (props.status) {
        case 'waiting_for_user':
            statusColor = '#F28076'; 
            statusText = 'Waiting user';
            break;
        case 'waiting_for_payment':
            statusColor = 'blue'; 
            statusText = 'Waiting payment';
            break;
        case 'confirmation_order':
            statusColor = '#FAE0C7'; 
            statusText = 'Payment success';
            break;
        case 'waiting_delivery':
            statusColor = '#F44000';
            statusText = 'Waiting delivery';
            break;
        case 'done':
            statusColor = '#70C2B4'; 
            statusText = 'Done';
            break;
        default:
            statusColor = 'green';
            statusText = 'Nothing';
    }

    return (
        <TouchableOpacity style={styles.groupWrapper} onPress={() => navigation.navigate('GroupCart', { data: props })}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.groupContent}>
                    {firstImage && <Image source={{ uri: firstImage }} style={styles.imgSize} />}
                    <View>
                        <TextFormat weight={400} numberOfLines={1} color={'darkBlack'} size={'md'}>
                            {props.group_name}
                        </TextFormat>
                        <Text style={{ color: statusColor, fontWeight: '400', fontSize: 17 }}>
                            {statusText}
                        </Text>
                    </View>
                </View>
                <View style={styles.countdown}>
                <CountDown hours={hours} minutes={minutes} seconds={seconds} />
                </View>
            </View>
            <View>
                {props && (
                    <>
                        <TextFormat>{props.current_quantity}/{props?.expected_quantity}</TextFormat>
                        <ProgressBarAndroid
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={process}
                            color={Colors.primaryColor}
                        />
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    groupWrapper: {
        marginBottom: 10,
        margin: 'auto',
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 10,
    },
    groupContent: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 8,
        justifyContent: "space-between",
    },
    timeStyle: {
        backgroundColor: Colors.darkBlack,
        color: Colors.secondaryColor,
        fontWeight: '500',
        borderRadius: 2,
        paddingHorizontal: 2,
    },
    modalWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: 200,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 20,
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
        backgroundColor: Colors.lightGrey,
        width: 100,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgSize: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2
    },
    countdown:{
       alignSelf:"center"
    }
});

export { CardGroup };

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/colors';
import { useRoute } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { formattedPrice } from '../../utils';
import GchoiceAxios from '../../api';
import { useSelector } from 'react-redux'; 

export interface ConfirmOrderParams {
  address?: string;
}
const ConfirmOrder = ({ navigation }: any) => {
  const route = useRoute<any>();
  const { phoneNumber, address, selectedLocation } = route.params || {};
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const groupCartData = useSelector((state: any) => state.cartGroup); 

  console.log(groupCartData.groupCart,'groupCartDatahchck')
  const onCheckout = async () => {
    const response = await GchoiceAxios.post('/payment/intents',{
      amount: (`${groupCartData.groupCart?.totalPrice.price}00`),
    });
    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'notJust.dev',
      paymentIntentClientSecret: response.data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      return;
    }

    onCreateOrder();
  };
  const onCreateOrder = async () => {
    const result = await GchoiceAxios.post('/groups/saveDataPayment', {
      deliveryAddress: address ,
      phoneNumber: phoneNumber,
      group_id: groupCartData.groupCart?.totalPrice.group_id
    });
    console.log(result.status,'test')
    if (result.status ===201) {
      navigation.navigate('OrderDetail', {groupId: groupCartData.groupCart?.totalPrice.group_id})
    }
  };
  return (
    <>
      <HeaderNavigation type={'secondary'} title="Shopping Bag" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <View style={styles.container}>
        <View style={styles.sectionBill}>
          <View style={styles.productInfor}>
            <Image
              source={{ uri: groupCartData.groupCart?.productByGroup?.images[0] }}
              style={styles.productImage}
            />
            <View style={styles.inforProduct}>
              <Text style={styles.title}>{groupCartData.groupCart?.productByGroup?.product_name} </Text>
              <Text style={styles.quantity}>x {groupCartData.groupCart?.totalPrice?.quantity} </Text>
              <Text style={styles.price}>{formattedPrice(groupCartData.groupCart?.productByGroup?.price) }</Text>
            </View>
          </View>
          <View>
          </View>
        </View>
        { groupCartData?.groupCart?.totalPrice?.role === "leader" && (
          <View style={styles.section}>
          <Text style={styles.sectionTitle}> Deliver To</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SetLocation')}>
            <Icon name="edit" size={18} color="#FF69B4" style={styles.editIcon} />
          </TouchableOpacity>
          <View style={styles.icon_location}>
            <Icon name="map-marker" size={24} color="#FF69B4" style={styles.icon} />
            <View>
              <Text style={styles.infor}>{phoneNumber}</Text>
              <Text style={styles.infor}>{address}</Text>
            </View>
          </View>
        </View>
        )}
        <View style={styles.sectionBill}>
          <Text style={styles.sectionTitle}>Order Payment Details</Text>
          <View style={styles.line}></View>
          <View style={styles.bill}>
            <View style={styles.titleInfor}>
              <Text style={styles.title}>Order Amounts </Text>
              <Text style={styles.title}>Delivery Free </Text>
            </View>
            <View style={styles.valueInfor}>
              <Text style={styles.price}>{formattedPrice(groupCartData.groupCart?.totalPrice.price)} </Text>
              <Text style={styles.price}>Free </Text>
            </View>
          </View>
          <View>
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonPayment} onPress={onCheckout}>
            <Text style={styles.paymentText}>Process to Payment
            </Text></TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  section: {
    marginBottom: 5,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    right: 2,
    bottom: 7,
  },
  icon_location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  inforProduct: {
    marginLeft: 20,
    fontSize: 15,
    marginTop:20
  },
  infor: {
    marginLeft: 20,
    fontSize: 15,
  },
  sectionBill: {
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 16,
    marginBottom: 20
  },
  productInfor: {
    flexDirection: 'row',
  },
  title: {
    color: Colors.darkBlack,
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'left'
  },
  price: {
    fontWeight: 'bold',
    color: '#F83758',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'left'
  },
  quantity: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5
  },
  bill: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  titleInfor: {
    fontSize: 18,
    marginTop: 20
  },
  valueInfor: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 20
  },

  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#F8F8F8',
    padding: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth:0.5,
    borderColor:Colors.darkBlack
  },
  buttonPayment: {
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primaryColor,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin:10
  },
  paymentText: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight:'700'
  },
  line:{
    height:1,
    backgroundColor:Colors.darkBlack
  }

});

export { ConfirmOrder };


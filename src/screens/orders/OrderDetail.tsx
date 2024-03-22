import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../assets/colors';
import { useRoute } from '@react-navigation/native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Timeline from 'react-native-timeline-flatlist';
import { useSelector } from 'react-redux';
import GchoiceAxios from '../../api';
import { formattedPrice } from '../../utils';
const OrderDtail = () => {
  const navigation = useNavigation<any>()
  const groupCartData = useSelector((state: any) => state.cartGroup);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const route = useRoute<any>()
  const groupId = route.params || {}

  console.log(groupId, 'gro')
  const fetchProductDetails = async () => {
    try {
      const response = await GchoiceAxios.get(`groups/statusGroup/${groupId.groupId}`);
      setOrderDetails(response?.data?.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  console.log(groupCartData.groupCart?.products, 'tets');
  let statusColor: string;
  let statusText: string;

  switch (orderDetails?.status) {
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
    <>
      <HeaderNavigation type={'secondary'} title="Confirm order" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <ScrollView style={styles.container}>
        <View style={styles.sectionNotifycation}>
          <Text style={styles.text} >Your order is on the way </Text>
          <View style={styles.titleContent}>
            <Text style={styles.text}>Delivery attempt should be made by 03-12-2023.{'\n'}Please make payment delivery</Text>
            <Icon name='box' color="#fff" size={35}></Icon>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.shipInfor}>
            <Text style={styles.sectionTitle}><Icon name="truck" size={18} color="#FF69B4" style={styles.editIcon} />  Shipping information</Text>
          </View>
          <View style={styles.icon_location}>
            <View>
              <Text style={styles.infor}>Nhanh</Text>
              <Text style={styles.infor}>SPX Epress - SPXVN0291b </Text>
              <View style={styles.checkInfor}>
                <Text style={styles.checkItem}>< IconFont name="check-square" size={18} color="#FF69B4" style={styles.editIcon} />
                  Co-check  </Text>
                <Text> Parcel is eligible for co-check</Text>
              </View>
              <View>
              </View>
              <View style={styles.statusText}>
                <IconEntypo name="dot-single" size={39} color="green"/>
                <Text style={[
                  {
                    marginTop: 10,
                    color: statusColor,
                    fontWeight: '700',
                    fontSize: 16
                  }]}>{statusText}</Text>

              </View>
            </View>
          </View>
        </View>
        {orderDetails?.phoneNumber && orderDetails?.deliveryAddress && (
          <>
              <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.icon_location}>
            <IconFont name="map-marker" size={24} color="#FF69B4" style={styles.icon} />
            <View>
              <Text>{orderDetails?.phoneNumber}</Text>
              <Text>{orderDetails?.deliveryAddress}</Text>
            </View>

          </View>
        </View>
          </>
        )}

     
        <View style={styles.sectionBill}>
          <Text style={styles.shopName}>{orderDetails?.products.brand}</Text>
          <View style={styles.line}></View>
          <View style={styles.productInfor}>
            <Image
              source={{ uri: groupCartData.groupCart?.productByGroup?.images[0] }}
              style={styles.productImage}
            />
            <View>
              <Text style={styles.name}>{orderDetails?.products?.product_name} </Text>
              <Text style={styles.quantity}>X{groupCartData.groupCart?.totalPrice.quantity}</Text>
              <Text style={styles.price}>{formattedPrice(groupCartData.groupCart?.productByGroup.price)} </Text>
            </View>
          </View>
          <View>
            <View style={styles.line}></View>
            <View style={styles.orderTotal}>
              <Text style={styles.sectionTitle}>
                Order Total
              </Text>
              <Text style={styles.totalPrice}>{formattedPrice(groupCartData.groupCart?.totalPrice.price)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC8D1"
  },
  section: {
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
  sectionBill: {
    marginTop: 20,
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
  sectionNotifycation: {
    backgroundColor: '#4BC198',
    marginBottom: 8,
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
  infor: {
    marginLeft: 10,
    fontSize: 15,
  },
  text: {
    color: Colors.secondaryColor
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'right'
  },
  quantity: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 5
  },
  viewDetail: {
    color: "#E53131"
  },
  checkInfor: {
    flexDirection: 'row'
  },
  checkItem: {
    backgroundColor: '#E53131',
    color: Colors.secondaryColor

  },
  shopName: {
    fontWeight: '800',

  },
  productImage: {
    width: 90,
    height: 90,
    marginTop: 20,
    borderRadius: 16,
    marginBottom: 20
  },
  productInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 20,
    textAlign: "right"
  },
  line: {
    height: 0.5,
    backgroundColor: Colors.darkGrey,
    flex: 1
  },
  titleContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 10
  },
  totalPrice: {
    color: "#E53131",
    fontSize: 19,
    fontWeight: "500"
  },
  shipInfor: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statusText: {
    flexDirection: 'row'
  }
});

export { OrderDtail };

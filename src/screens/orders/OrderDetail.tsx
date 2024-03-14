import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../assets/colors';
import { useRoute } from '@react-navigation/native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Timeline from 'react-native-timeline-flatlist';


const OrderDtail = () => {
  const navigation = useNavigation<any>()
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
            <TouchableOpacity onPress={() =>navigation.navigate('TrackStatus') }><Text style={styles.viewDetail}>View detail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.icon_location}>
            <View>
              <Text style={styles.infor}>Nhanh</Text>
              <Text style={styles.infor}>SPX Epress - SPXVN0291b </Text>
              <View style={styles.checkInfor}>
                <Text style={styles.checkItem}>< IconFont name="check-square" size={18} color="#FF69B4" style={styles.editIcon} />
                  Đồng kiểm  </Text>
                <Text> Parcel is eligible for co-check</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.icon_location}>
            <IconFont name="map-marker" size={24} color="#FF69B4" style={styles.icon} />
            <View>
              <Text>Ut Vien</Text>
              <Text>(+84 982 99292)</Text>
              <Text>101b Le Huu Trac, Phuoc My</Text>
            </View>

          </View>
        </View>
        <View style={styles.sectionBill}>
          <Text style={styles.shopName}>LALA SHOP</Text>
          <View style={styles.line}></View>
          <View style={styles.productInfor}>
            <Image
              source={require('../../assets/images/avt.jpg')}
              style={styles.productImage}
            />
            <View>
              <Text style={styles.name}>Bamboo bowl </Text>
              <Text style={styles.quantity}>x2 </Text>
              <Text style={styles.price}>$2300 </Text>
            </View>
          </View>
          <View>
            <View style={styles.line}></View>
            <View style={styles.orderTotal}>
              <Text style={styles.sectionTitle}>
                Order Total
              </Text>
              <Text style={styles.totalPrice}> $41.101</Text>
            </View>
          </View>
        </View>

        {/* <View style={[styles.checkout, styles.horizontal]}>
          <View style={styles.left}>
            <Text style={styles.sub}>Sub - Total</Text>
            <Text style={styles.charge}>Delivery Charge</Text>
            <Text style={styles.discount}>Discount</Text>
            <Text style={styles.total}>Total</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.price}>120 $</Text>
            <Text style={styles.price}>10 $</Text>
            <Text style={styles.price}>20 $</Text>
            <Text style={styles.Total_price}>150 $</Text>
          </View>
        </View> */}


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
    // fontWeight: 'bold',
    fontSize: 15,
  },
  text: {
    color: Colors.secondaryColor
  },
  price: {
    fontWeight: 'bold',
    // color: '#F83758',
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
    marginTop: 20
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
  }
});

export { OrderDtail };

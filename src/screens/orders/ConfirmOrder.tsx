import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/colors';
import { useRoute } from '@react-navigation/native';

export interface ConfirmOrderParams {
  address?: string;
}
const ConfirmOrder = ({ navigation }: any) => {
  const route = useRoute<ConfirmOrderParams>();
  const { name, phoneNumber, address, selectedLocation } = route.params || {};
  return (
    <>
      <HeaderNavigation type={'secondary'} title="Confirm order" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deliver To</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SetLocation')}>
          <Icon name="edit" size={18} color="#FF69B4" style={styles.editIcon} />
        </TouchableOpacity>
        <View style={styles.icon_location}>
          <Icon name="map-marker" size={24} color="#6B50F6" style={styles.icon} />
          <View>
          <Text style={styles.infor}>{name }</Text>
          <Text style={styles.infor}>{phoneNumber }</Text>
          <Text style={styles.infor}>{address }</Text>
          </View>
        </View>
      </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
          <Icon name="edit" size={18} color="#FF69B4" style={styles.editIcon} />
          </TouchableOpacity>
          <View style={styles.icon_location}>
            <Icon name="credit-card" size={24} color="#6B50F6" style={styles.icon} />
            <Text style={styles.seri}>2121 6352 8465 ****</Text>
          </View>
        </View>

        <View style={[styles.checkout, styles.horizontal]}>
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
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Finish_Order')}>
          <Text style={styles.plOrder}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
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
  seri: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkout: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
  },
  horizontal: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sub: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: Colors.darkGrey,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: Colors.darkGrey,
  },
  charge: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: Colors.darkGrey,
  },
  discount: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: Colors.darkGrey,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    color: Colors.darkGrey,
  },
  Total_price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.darkGrey,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 14,
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
  },
  plOrder: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
});

export { ConfirmOrder };

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import { Colors } from '../../assets/colors';
import { Image } from 'react-native-animatable';
import Timeline from 'react-native-timeline-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TrackStatus = ({ navigation }: any) => {
  const data = [
    { time: '09:00', title: 'Order Placed', description: 'Your order has been placed.', status: 'pending' },
    { time: '10:30', title: 'Processing', description: 'Your order is being processed.', status: 'pending' },
    { time: '12:00', title: 'Shipped', description: 'Your order has been shipped.', status: 'shipped' },
    { time: '14:00', title: 'Out for Delivery', description: 'Your order is out for delivery.', status: 'outForDelivery' },
    { time: '16:00', title: 'Delivered', description: 'Your order has been delivered.', status: 'delivered' },
  ];

  const renderDetail = (rowData: any, sectionID: any, rowID: any) => {
    let iconColor = Colors.primaryColor;
    let iconName = 'done';
    console.log(rowData,' vien')
    if (rowData.title === 'Order Placed') {
      iconColor = '#ccc'; 
      iconName = 'schedule';
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
    );
  };

  return (
    <>
      <HeaderNavigation type={'secondary'} title="Confirm order" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <ScrollView style={styles.container}>
        <View style={styles.sectionBill}>
          <View style={styles.productInfor}>
            <Image
              source={require('../../assets/images/avt.jpg')}
              style={styles.productImage}
            />
            <View>
              <Text style={styles.infor}>Receive by <Text style={styles.date}> Fri, 03 Dec 2023</Text>  </Text>
              <Text style={styles.infor}>Shipping with Nhanh - SPX Express </Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionBill}>
          <Timeline
            data={data}
            circleSize={20}
            circleColor={Colors.primaryColor}
            lineColor="#ccc"
            timeContainerStyle={{ minWidth: 52 }}
            timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
            descriptionStyle={{ color: 'gray' }}
            options={{
              style: { paddingTop: 5 },
              renderDetail,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 5,
    borderRadius: 16,
  },
  infor: {
    marginLeft: 10,
    fontSize: 15,
    marginTop: 20,
  },
  date: {
    color: '#F83758',
    fontWeight: '500',
  },
  productImage: {
    width: 90,
    height: 90,
    marginTop: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  productInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { TrackStatus };

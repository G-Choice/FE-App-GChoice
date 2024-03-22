import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import { Colors } from '../../assets/colors';
import { Image } from 'react-native-animatable';
import Timeline from 'react-native-timeline-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import GchoiceAxios from '../../api';
import { useRoute } from '@react-navigation/native';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  status: string;
}

const TrackStatus = ({ navigation }: any) => {
  const [groupStatus, setGroupStatus] = useState('');
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

  const route = useRoute<any>();
  const groupId = route.params.groupId;

  useEffect(() => {
    GchoiceAxios.get(`groups/statusGroup/${groupId.groupId}`)
      .then(response => {
        setGroupStatus(response.data.data.status);
      })
      .catch(error => {
        console.error('Error fetching group status:', error);
      });
  }, []);

  useEffect(() => {
    const updatedData = data.map(item => {
      const iconColor = item.status === groupStatus ? 'green' : '#ccc';
      return { ...item, iconColor };
    });
    setTimelineData(updatedData);
    const newCircleColor = groupStatus === timelineData[0]?.status ? 'green' : Colors.primaryColor;
    setCircleColor(newCircleColor);
  }, [groupStatus]);

  const data: TimelineItem[] = [
    { time: '09:00', title: 'Order Placed', description: 'Your order has been placed.', status: 'waiting_for_user' },
    { time: '10:30', title: 'Processing', description: 'Your order is being processed.', status: 'waiting_for_payment' },
    { time: '12:00', title: 'Shipped', description: 'Your order has been shipped.', status: 'payment_success' },
    { time: '14:00', title: 'Out for Delivery', description: 'Your order is out for delivery.', status: 'confirmation_order' },
    { time: '16:00', title: 'Delivered', description: 'Your order has been delivered.', status: 'waiting_delivery' },
  ];

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
              <Text style={styles.infor}>Shipping with Nganh - SPX Express </Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionBill}>
          <Timeline
            data={timelineData}
            circleSize={20}
            circleColor={circleColor} 
            lineColor="#ccc"
            timeContainerStyle={{ minWidth: 52 }}
            timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
            descriptionStyle={{ color: 'gray' }}
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

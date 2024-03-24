import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import React, {useEffect, useState} from "react";
import {Noty, TextFormat} from "../../components";
import {NotificationResApiType} from "../../@types/NotificationResApiType.ts";
import GchoiceAxios from "../../api";
import {Colors} from "../../assets/colors";


const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationResApiType[]>([])
  const fetchData = () => {
    GchoiceAxios({
      method: "get",
      url: `notification`,
      responseType: "json",
    })
      .then((res) => {
        setNotifications(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchData()
  }, []);
  if (notifications.length <= 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  const renderItem = ({ item }: { item: any }) => <Noty {...item} />;
  return (
    <>
      <HeaderNavigation title="Notifications" type="secondary" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 5}}>
        <TextFormat weight={400} numberOfLines={1} color='darkBlack' size="md">Update orders</TextFormat>
        <TextFormat weight={400} numberOfLines={1} color='darkBlack' size="md">{
          notifications.length > 0 ? `All (${notifications.length})` : null
        }</TextFormat>
      </View>
      <FlatList data={notifications} renderItem={renderItem} />
      <Text>
        This is notification
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginVertical: 6
  }
})

export {Notifications}
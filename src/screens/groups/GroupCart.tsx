import {
  ActivityIndicator,
  FlatList,
  Image,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {Cart, CountDown, Group, TextFormat} from "../../components";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import {Colors} from "../../assets/colors";
import React, {useEffect, useState} from "react";
import {formattedPrice} from "../../utils";
import Icon from 'react-native-vector-icons/Ionicons'
import GchoiceAxios from "../../api";
import {useRoute} from "@react-navigation/native";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
type RouteParams = {
  data: any;
};

const GroupCart  = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { data } = route.params as RouteParams;
  const [groupCart, setGroupCart] = useState<any>(null)
  const [buyingInfo, setBuyingInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    GchoiceAxios({
      method: "get",
      url: `groups/cart_group?group_id=${data.id}`,
      responseType: "json",
    })
      .then((res) => {
        setBuyingInfo(res.data.data)
        setGroupCart(res.data)
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const duration = moment.duration(data?.remainingHours, 'hours');
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const process = (data?.carts?.total_quantity ?? 0) /(data?.groupSize || 1);
  const renderCart = ({ item }: { item: any }) => <Cart {...item} />;

  if (!groupCart) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  return (
    <>
      <View>
        <HeaderNavigation type={'secondary'} title="Group Information" wrapperStyle={{ paddingTop: 1 }} />
        <View style={{backgroundColor: Colors.secondaryColor, margin: 5}}>
          <View style={{flexDirection: "row", justifyContent: "space-between",alignItems: "center", marginHorizontal: 5}}>
            <Text style={{color: Colors.primaryColor, fontWeight: "500"}}>{data.carts?.total_quantity}/{data?.groupSize}</Text>
            <CountDown hours={hours} minutes={minutes} seconds={seconds} />
          </View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={process}
            color={Colors.primaryColor}
            style={{marginBottom: 5}}
          />
        </View>
        <View style={styles.productContainer}>
          <Image source={{ uri: groupCart?.productByGroup?.images[0] }} style={styles.imgSize} />
          <View style={{width: "80%"}}>
            <TextFormat weight={400} numberOfLines={2} color={'darkBlack'} size={'md'}>{groupCart?.productByGroup?.product_name}</TextFormat>
            <TextFormat weight={600} numberOfLines={1} color={'primaryColor'} size={'lg'}>{formattedPrice(groupCart?.productByGroup?.price)}</TextFormat>
          </View>
        </View>
        <FlatList data={buyingInfo} renderItem={renderCart} />
      </View>
      <View style={styles.totalPrice}>
  {data.isJoined && (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "30%",
          backgroundColor: "#008081",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("GroupChat")}
      >
        <Icon
          name="chatbubble-ellipses-outline"
          size={20}
          color={Colors.secondaryColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "column",
          alignItems: "center",
          width: "70%",
          backgroundColor: Colors.primaryColor,
        }}
        onPress={() => navigation.navigate("ConfirmOrder")}
      >
        <TextFormat
          weight={400}
          size="md"
          color="secondaryColor"
          style={styles.textStyle}
        >
          Confirm with {data.carts?.total_quantity} products
        </TextFormat>
        <TextFormat
          weight={500}
          size="lg"
          color="secondaryColor"
          style={styles.textStyle}
        >
          {formattedPrice(groupCart?.totalPrice)}
        </TextFormat>
      </TouchableOpacity>
    </>
  )}
  <View></View>
</View>
    </>
  )
}

const styles = StyleSheet.create({
  imgSize: {
    width: 80,
    height: 80,
  },
  productContainer: {
    padding: 12,
    backgroundColor: Colors.secondaryColor,
    flexDirection: "row",
    width: "100%",
    gap: 10
  },
  timeStyle: {
    backgroundColor: Colors.darkBlack,
    color: Colors.secondaryColor,
    fontWeight: "500",
    borderRadius: 2,
    paddingHorizontal: 2
  },
  totalPrice: {
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row"
  },
  textStyle: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export {GroupCart}
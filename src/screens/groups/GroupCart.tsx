import {FlatList, Image, ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Cart, CountDown, Group, TextFormat} from "../../components";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import {Colors} from "../../assets/colors";
import React, {useEffect, useState} from "react";
import {formattedPrice} from "../../utils";
import Icon from 'react-native-vector-icons/Ionicons'
import GchoiceAxios from "../../api";
import {useRoute} from "@react-navigation/native";

const GroupCart  = () => {
  const route = useRoute()
  const [groupCart, setGroupCart] = useState<any>(null)
    GchoiceAxios({
      method: "get",
      url: `groups/cart_group?id=${route.params}`,
      responseType: "json",
    })
      .then((res) => {
        setGroupCart(res.data.data)
      })
      .catch((e) => {
        console.log(e);
      });
  const renderCart = ({ item }: { item: any }) => <Cart {...item} />;
  return (
    <>
      <View>
        <HeaderNavigation type={'secondary'} title="Group Information" wrapperStyle={{ paddingTop: 1 }} />
        <View style={{backgroundColor: Colors.secondaryColor, margin: 5}}>
          <View style={{flexDirection: "row", justifyContent: "space-between",alignItems: "center", marginHorizontal: 5}}>
            <Text style={{color: Colors.primaryColor, fontWeight: "500"}}>20/15</Text>
            <CountDown hours={4} minutes={5} seconds={45} />
          </View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={0.4}
            color={Colors.primaryColor}
            style={{marginBottom: 5}}
          />
        </View>
        <View style={styles.productContainer}>
          <Image source={require("../../assets/images/avt.jpg")} style={styles.imgSize} />
          <View style={{width: "80%"}}>
            <TextFormat weight={400} numberOfLines={2} color={'darkBlack'} size={'md'}>Casetifg Ốp Điện Thoại Silicon Nhám Từ Tính Chống Sốc Chống Dấu Vân Tay Bảo Vệ Ống Kính Sạc Cho iphone 15 14 13 pro max</TextFormat>
            <TextFormat weight={600} numberOfLines={1} color={'primaryColor'} size={'lg'}>{formattedPrice(12344)}</TextFormat>
          </View>
        </View>
        <FlatList data={groupCart} renderItem={renderCart} />
      </View>
      <View style={styles.totalPrice}>
        <TouchableOpacity style={{flexDirection: "row", width: "30%", backgroundColor: "#008081", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <Icon name="chatbubble-ellipses-outline" size={20} color={Colors.secondaryColor}/>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "column", alignItems: "center", width: "70%"}}>
          <TextFormat weight={400} size="md" color="secondaryColor" style={styles.textStyle}>Confirm with 100 products</TextFormat>
          <TextFormat weight={500} size="lg" color="secondaryColor" style={styles.textStyle}>{formattedPrice(104833)}</TextFormat>
        </TouchableOpacity>
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
    backgroundColor: Colors.primaryColor,
    position: "absolute",
    bottom: 0,
    flexDirection: "row"
  },
  textStyle: {
    marginLeft: "auto",
    marginRight: "auto"
  }
})

export {GroupCart}
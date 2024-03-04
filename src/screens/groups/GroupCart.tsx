import {Image, StyleSheet, Text, View} from "react-native";
import {Cart, CountDown, TextFormat} from "../../components";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import {Colors} from "../../assets/colors";
import React from "react";
import {formattedPrice} from "../../utils";

const GroupCart  = () => {
  return (
    <View>
      <HeaderNavigation type={'secondary'} title="Group Information" wrapperStyle={{ paddingTop: 1 }} />
      <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 10}}><CountDown hours={4} minutes={5} seconds={45} /></View>
      <View style={styles.productContainer}>
        <Image source={require("../../assets/images/avt.jpg")} style={styles.imgSize} />
        <View style={{width: "80%"}}>
          <TextFormat weight={400} numberOfLines={2} color={'darkBlack'} size={'md'}>Casetifg Ốp Điện Thoại Silicon Nhám Từ Tính Chống Sốc Chống Dấu Vân Tay Bảo Vệ Ống Kính Sạc Cho iphone 15 14 13 pro max</TextFormat>
          <TextFormat weight={600} numberOfLines={1} color={'primaryColor'} size={'lg'}>{formattedPrice(12344)}</TextFormat>
        </View>
      </View>
      <Cart />
      <Cart />
      <Cart />
      <Cart />
    </View>
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
})

export {GroupCart}
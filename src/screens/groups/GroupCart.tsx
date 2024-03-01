import {Image, StyleSheet, Text, View} from "react-native";
import {Cart, CountDown} from "../../components";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import React, {useEffect, useState} from "react";
import {Colors} from "../../assets/colors";

const GroupCart  = () => {
  return (
    <View>
      <HeaderNavigation type={'secondary'} title="Group Information" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <CountDown hours={4} minutes={5} seconds={45} />
      <View style={styles.productContainer}>
        <Image source={require("../../assets/images/avt.jpg")} style={styles.imgSize} />
      </View>
      <Cart />
      <Text>Uyen xinh dep</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imgSize: {
    width: 80,
    height: 80,
  },
  productContainer: {
    padding: 8,
    backgroundColor: Colors.secondaryColor
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
import React, { useState, useEffect } from "react";
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { Colors } from "../../assets/colors";
import { CardContainer } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import GchoiceAxios from "../../api/index.ts";
import { useRoute } from "@react-navigation/native";
import {ProductList} from "./ProductList.tsx";
const { width } = Dimensions.get("screen");

const ShopInfor = () => {
    const route = useRoute<any>()
  const [selectedBackground, setSelectedBackground] = useState();
  const [shopInfo, setShopInfo] = useState(null);
  const backgrounds = [
    require('../../assets/images/background1.jpg'),
    require('../../assets/images/background2.jpg'),
    require('../../assets/images/background3.jpg')
  ];

  const handleRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setSelectedBackground(backgrounds[randomIndex]);
  };

  useEffect(() => {
    handleRandomBackground();
    fetchShopInfo();
  }, []);
const shopId = route.params.shopId
console.log(route,"73864474");
  const fetchShopInfo = async () => {
    try {
      const response = await GchoiceAxios.get(`/shop/shopInfor/${shopId}`);
      setShopInfo(response.data.data);
    } catch (error) {
      console.error('Error fetching shop info:', error);
    }
  };
console.log(shopInfo,'123')
  const handleFollow = () => {
  };

  return (
    <>
      <ImageBackground source={selectedBackground} style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.shopInfor}>
            <Image style={styles.avt} source={{uri: shopInfo ? shopInfo.shop_image[0] : "../../assets/images/background3.jpg"}} />
            <View style={styles.inforDetail}>
            <Text style={styles.shopName}>{shopInfo ? shopInfo.shop_name : " "}</Text>
            <Text style={styles.address}>{shopInfo ? shopInfo.shop_address : " "}</Text>
            </View>
          
          </View>
          <TouchableOpacity onPress={handleFollow} style={styles.followButton}>
            <Text style={styles.followText}>+ Follow</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <View style={styles.stickyHeader} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductList shopId={shopInfo ? shopInfo.id : ''} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.semiLightGrey,
    flex: 1
  },
  scrollView: {
    marginTop: 30,
  },
  backgroundImage: {
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginTop: 50,
    marginHorizontal: 20
  },
  shopInfor:{
    flexDirection:'row',
    alignItems:'center'
  },
  avt: {
    height: 60,
    width: 60,
    borderRadius: 16
  },
  inforDetail:{
    marginLeft: 10
  },
  shopName: {
    fontSize: 18,
    color: Colors.secondaryColor,
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: Colors.secondaryColor,
    fontWeight: '400',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.darkBlack
  },
  changeBackgroundButton: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },
  changeBackgroundText: {
    color: Colors.secondaryColor,
    fontWeight: 'bold'
  },
  followButton: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },
  followText: {
    color: Colors.secondaryColor,
    fontWeight: 'bold'
  }
});

export { ShopInfor };

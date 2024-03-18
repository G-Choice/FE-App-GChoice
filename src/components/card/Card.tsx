import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../assets/colors";
import {ProductsResApiType} from "../../@types/ProductsResApiType.ts";
import { useNavigation } from '@react-navigation/native';
import React from "react";

const getWidthOfScreen = Dimensions.get("screen").width

interface ProductCardProps extends ProductsResApiType {}

const Card = (props: ProductCardProps) => {
  const navigation = useNavigation<any>();
  const formattedPrice = (props: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(props);
  }

   const handleCardPress = () => {
       navigation.navigate('ProductDetail',  props.id );
     };
     const imageUrl = props.images && props.images.length > 0 ? props.images[0] : '';
     
  return (
    <TouchableOpacity style={{ width: '50%' }} onPress={handleCardPress}>
      <View style={styles.cardWrapper}>
      <Image style={styles.productImgPreview} source={{ uri: imageUrl }} />
        <View style={{margin: 5}}>
          <Text style={styles.productTitle} numberOfLines={2}>{props.product_name}</Text>
          {/*<View style={{height: 25}}></View>*/}
          <Text style={styles.productPrice}>{formattedPrice(props.price)}</Text>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
              <Image
                source={require('../../assets/icons/rating.jpg')}
                style={{ width: 15, height: 15 }}
              />
              <Text style={{borderRightWidth: 0.5, paddingRight: 2, borderColor: Colors.lightGrey}}>4.6</Text>
              {/*<Text>{props.avgRating}</Text>*/}
              <Text>Sold {props.quantity_inventory}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    height: "auto",
    borderColor: Colors.primaryColor,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor:  Colors.secondaryColor
  },
  productImgPreview: {
    width: "100%",
    height: (getWidthOfScreen - 5*3) * 0.5 + 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  productTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.darkBlack
  },
  productPrice: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontFamily: "Poppins-Medium"
  }
})

export {Card}
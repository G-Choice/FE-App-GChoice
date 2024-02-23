import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../assets/colors";
import { useNavigation } from '@react-navigation/native';

const getWidthOfScreen = Dimensions.get("screen").width

interface ProductCardProps {
  id?: string,
  image?: string,
  product_name?: string,
  description?: string,
  price?: number,
  avgRating?: string,
//   coupon?: any,
  product_quantity_sold?: number,
  quantity_inventory?: number,
  status?: string

}

const Card = (props: ProductCardProps) => {
  const navigation = useNavigation();

   const handleCardPress = () => {
       navigation.navigate('ProductDetail', { id: props.id });
     };
  return (
    <TouchableOpacity style={{ width: '50%' }} onPress={handleCardPress}>
      <View style={styles.cardWrapper}>
        <Image style={styles.productImgPreview} source={{uri: props.image}} />
        <View style={{margin: 5}}>
          <Text style={styles.productTitle} numberOfLines={2}>{props.product_name}</Text>
          <View style={{height: 25}}></View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.productPrice}>₫{props.price}</Text>
            <Text>Đã bán {props.quantity_inventory}</Text>
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
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../assets/colors";

const getWidthOfScreen = Dimensions.get("screen").width

interface FlashSaleProduct {
  id?: string,
  image?: string,
  title?: string,
  description?: string,
  price?: number,
  rating?: number,
  coupon?: any,
  sold?: number,
  stock?: number,
  status?: number
}

const FlashSaleCard = (props: FlashSaleProduct) => {
  return (
    <TouchableOpacity>
      <View style={styles.cardWrapper}>
        <Image style={styles.productImgPreview} source={{uri: props.image}} />
        <View style={{margin: 5}}>
          <Text style={styles.productTitle} numberOfLines={2}>{props.title}</Text>
          <View style={{height: 25}}></View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.productPrice}>₫{props.price}</Text>
            <Text>Đã bán {props.stock}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  cardWrapper: {
    width: (getWidthOfScreen) * 0.5,
    height: "auto",
    borderColor: Colors.primaryColor,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor:  Colors.secondaryColor
  },
  productImgPreview: {
    width: (getWidthOfScreen) * 0.5,
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


export {FlashSaleCard}
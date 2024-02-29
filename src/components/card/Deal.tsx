import {Image, TouchableOpacity, View} from "react-native";
import {FlashSaleCardContainer} from "./FlashSaleCardContainer.tsx";

const Deal = () => {
  return (
    <View>
      <TouchableOpacity>
        <Image style={{width: 100}} source={require("../../assets/images/banner/flashsale.jpg")}></Image>
      </TouchableOpacity>
      <FlashSaleCardContainer />
    </View>
  )
}
export {Deal}
import {FlatList, Text, View} from "react-native";
import {FlashSaleCard} from "./FlashSaleCard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

const FlashSaleCardContainer = () => {
  const productList =  useSelector((state: RootState) => state.product.productList)

  return (
    <View>
      <FlatList horizontal={true} data={productList} renderItem={({item}) =>  <FlashSaleCard {...item}/>} />
    </View>
  )
}

export {FlashSaleCardContainer}
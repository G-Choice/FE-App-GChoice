import {Dimensions, Image, StyleSheet} from "react-native";
import {Header} from "../../components/child";
import {Colors} from "../../assets/colors";
import {CardContainer, Deal} from "../../components/card";
import PromotionSlider from "../../components/card/PromotionSlider.tsx";
import {ScrollView} from 'react-native-virtualized-view'
import {FlashSaleCardContainer} from "../../components/card/FlashSaleCardContainer.tsx";

const {width} = Dimensions.get("screen")

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <PromotionSlider />
      <Image style={{width: width}} source={require("../../assets/images/banner/deal.png")}/>
      <Deal />
      <CardContainer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.semiLightGrey
  }
})

export {Home};
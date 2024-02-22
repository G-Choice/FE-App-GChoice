import {Dimensions, StyleSheet} from "react-native";
import {Header} from "../../components/child";
import {Colors} from "../../assets/colors";
import {CardContainer, Deal} from "../../components/card";
import PromotionSlider from "../../components/card/PromotionSlider.tsx";
import {ScrollView} from 'react-native-virtualized-view'
import {FlashSaleCardContainer} from "../../components/card/FlashSaleCardContainer.tsx";
import {SearchBar} from "../../components/input/SearchBar.tsx";
import React from "react";

const {width} = Dimensions.get("screen")

const Home = () => {
  const handleBack = () => {}
  const handleSearch = () => {}
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <SearchBar placeholder="Search..." onSubmit={handleSearch} onBack={handleBack} />
      <PromotionSlider />
      {/*<Deal />*/}
      <CardContainer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.semiLightGrey,
    flex: 1
  }
})

export {Home};
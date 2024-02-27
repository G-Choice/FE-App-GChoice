import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Header } from "../../components/child";
import { Colors } from "../../assets/colors";
import { CardContainer } from "../../components";
import PromotionSlider from "../../components/card/PromotionSlider.tsx";
import { ScrollView } from "react-native-virtualized-view";
import { SearchBar } from "../../components/input/SearchBar.tsx";

const { width } = Dimensions.get("screen");

const Home = () => {
  const handleBack = () => {};
  const handleSearch = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Header />
        <SearchBar placeholder="Search..." onSubmit={handleSearch} onBack={handleBack} />
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <PromotionSlider />
        {/*<Deal />*/}
        <CardContainer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.semiLightGrey,
    flex: 1,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 2,
  },
  scrollView: {
    marginTop: 100, // Adjust this value according to the height of the sticky header
  },
});

export { Home };

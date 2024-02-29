import React from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import { Header } from "../../components/child";
import { Colors } from "../../assets/colors";
import { CardContainer } from "../../components";
import PromotionSlider from "../../components/card/PromotionSlider.tsx";
import { ScrollView } from "react-native-virtualized-view";
import { SearchBar } from "../../components/input/SearchBar.tsx";
import {useNavigation} from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const Home = () => {
  const handleBack = () => {};
  const handleSearch = () => {};

  const navigateToSearch = useNavigation<any>()


  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Header />
        <TouchableOpacity onPress={() => navigateToSearch.navigate("Search")}>
          <SearchBar placeholder="Search..." onSubmit={handleSearch} onBack={handleBack} onPressIn={() => navigateToSearch.navigate("Search")}/>
        </TouchableOpacity>
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
    top: 5,
    left: 5,
    right: 5,
    zIndex: 10,
    elevation: 2,
  },
  scrollView: {
    marginTop: 100, // Adjust this value according to the height of the sticky header
  },
});

export { Home };

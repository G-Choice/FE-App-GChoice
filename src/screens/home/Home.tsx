import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Header} from "../../components/child";
import {Colors} from "../../assets/colors";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryColor
  }
})

export {Home};
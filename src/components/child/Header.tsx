import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {AvatarBubble} from "./AvatarBubbe.tsx";
import {Colors} from "../../assets/colors";

const getWidthOfScreen = Dimensions.get('window').width
const Header = () => {


  return (
    <View style={styles.container}>
      <Image
        source={ require('../../../public/G-Choice-Logo.jpg')}
        style={styles.logo}
      />
      <AvatarBubble/>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: getWidthOfScreen/3,
    height: "auto",
    flexDirection: "row",
    justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: Colors.secondaryColor
  }
})

export {Header}
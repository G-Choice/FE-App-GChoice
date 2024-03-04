import {StyleSheet, Text, View} from "react-native";
import {AvatarBubble} from "../child";
import {TextFormat} from "../text";
import {Colors} from "../../assets/colors";
import {formattedPrice} from "../../utils";

interface CartProp {
  name: string,
  avatar: string,
  amount: number,
  price: number,
  total: number
}

const props: CartProp = {
  name: "uyen",
  avatar: "uyen",
  amount: 20,
  price: 54354,
  total: 3254543
}

const Cart = () => {
  return (
    <View style={styles.aCartContainer}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
          <AvatarBubble />
          <Text>{props.name}</Text>
        </View>
        <View style={{flexDirection: "row", gap: 3, alignItems: "center"}}>
          <TextFormat  weight={400} numberOfLines={1} color={'darkBlack'} size={'md'}>{formattedPrice(props.price)}</TextFormat>
          <Text>x</Text>
          <TextFormat  weight={400} numberOfLines={1} color={'darkBlack'} size={'md'}>{formattedPrice(props.amount)}</TextFormat>
        </View>
      </View>
      <View  style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View>
          <Text>Has join with {props.amount} products</Text>
        </View>
          <TextFormat  weight={400} numberOfLines={1} color={'primaryColor'} size={'md'}>{props.total}</TextFormat>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  aCartContainer: {
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 5
  }
})

export {Cart}
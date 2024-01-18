import {Image, StyleSheet, View} from "react-native";

const AvatarBubble = () => {
  return (
    <View>
      <Image source={require('../../assets/images/avt.png')} style={baseStyle.imgSize}/>
    </View>
  )
}

const baseStyle = StyleSheet.create({
  imgSize: {
    width: 35,
    height: 35,
    borderRadius: 35/2
  }
})

export {AvatarBubble}
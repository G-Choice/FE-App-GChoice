import {Image, StyleSheet, TouchableOpacity} from "react-native";

const AvatarBubble = () => {
  return (
    <TouchableOpacity >
      <Image source={require("../../assets/images/avt.jpg")} style={baseStyle.imgSize}/>
    </TouchableOpacity>
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
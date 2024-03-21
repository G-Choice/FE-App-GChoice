import {Image, StyleSheet, TouchableOpacity} from "react-native";
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
const AvatarBubble = () => {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const navigation = useNavigation<any>()
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("ProfileScreen")} >
      <Image source={userInfo?.data?.image ? { uri: userInfo.data.image[0] } : require('../../assets/images/avt.jpg')} style={baseStyle.imgSize}/>
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
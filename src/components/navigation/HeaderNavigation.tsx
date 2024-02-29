import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle, StyleSheetProperties, View, Text} from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from "../../assets/colors";
import {useNavigation} from "@react-navigation/native"


interface HeaderBackProps
{
  wrapperStyle?: ViewStyle,
  type?: keyof typeof headerStyle,
  iconLeft?: string,
  iconRight?: string,
  title?: string,
  onBack?: () => void
}


function HeaderNavigation(props: HeaderBackProps)
{
  const nav = useNavigation()

  return (
    <View style={[style.wrapperStyle, props.wrapperStyle]}>
      <View style={[style.header, headerStyle[props.type || "primary"].header]}>
        <TouchableOpacity onPress={() => {props.onBack ? props.onBack() : null; nav.goBack()}}>
          <Icon style={[style.iconLeft, headerStyle[props.type || "primary"].iconLeft]} name={props.iconLeft || "chevron-left"} size={27} color={Colors.primaryColor}/>
        </TouchableOpacity>
        {
          props.title
            ? <Text style={{alignSelf: "center"}}>{props.title}</Text>
            : null
        }
        <TouchableOpacity>
          <Icon style={[style.iconRight, headerStyle[props.type || "primary"].iconRight]} name={props.iconRight || "more-vertical"} size={27} color={Colors.primaryColor}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  wrapperStyle: {
    zIndex: -1,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconLeft: {

  },
  iconRight: {

  }
})

const headerStyle = {
  primary: StyleSheet.create({

  }),
  secondary: StyleSheet.create<any>({
    header: {
      borderWidth: 0,
      borderColor: Colors.primaryColor,
      padding: 8,
      backgroundColor: "white"
    },
    iconLeft: {
      paddingVertical: 3,
      color: Colors.primaryColor
    },
    iconRight: {
      paddingVertical: 3,
      color: Colors.primaryColor
    }
  })
}

export {HeaderNavigation}
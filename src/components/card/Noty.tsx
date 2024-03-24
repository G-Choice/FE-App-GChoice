import {Dimensions, Image, Text, View} from "react-native";
import {NotificationResApiType} from "../../@types/NotificationResApiType.ts";
import {Colors} from "../../assets/colors";
import {TextFormat} from "../text";
import moment from "moment";

const width = Dimensions.get("screen").width

const Noty = (props: NotificationResApiType) => {

  const currentDate = new Date(props.created_at)
  const formattedDate = moment(currentDate).format('hh:mm DD-MM-YYYY')

  return (
    <View style={{flexDirection: "row", gap: 4, backgroundColor: Colors.secondaryColor, marginBottom: 6, padding: 8}}>
      <Image style={{width: width * 0.15, height: width * 0.15}} source={require("../../assets/images/preview.jpg")}/>
      <View style={{width: width * 0.85}}>
        <TextFormat weight={500} numberOfLines={1} color='darkBlack' size="md">{props.title}</TextFormat>
        <TextFormat weight={400} numberOfLines={3} color='darkBlack' size="md" style={{marginVertical: 4}}>{props.body}</TextFormat>
        <TextFormat weight={400} numberOfLines={3} color='darkGrey' size="sm">{formattedDate}</TextFormat>
      </View>
    </View>
  )
}

export {Noty}
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {ForumsStateType} from "../../@types/ForumStateType.ts";
import {TextFormat} from "../text";
import {Colors} from "../../assets/colors";

const width = Dimensions.get("screen").width

const Post = (props: ForumsStateType) => {
  return (
    <>
      <View style={[{backgroundColor: Colors.secondaryColor}, styles.elevation, styles.postStyle]}>
        <View style={{flexDirection: 'row', gap: 10, paddingHorizontal: 15}}>
          <Image style={{height: 60, width: 60, borderRadius: 50}} source={{uri: props.avatar}} />
          <View>
            <TextFormat weight={500} numberOfLines={1} color={'darkBlack'} size={'lg'}>{props.name}</TextFormat>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <Image source={require('../../assets/images/Union.jpg')}/>
              <TextFormat weight={500} color={'darkGrey'}>{props.time} hours ago</TextFormat>
            </View>
          </View>
        </View>
        <View>
          <TextFormat weight={300} numberOfLines={3} color={'darkBlack'} size={'md'} style={styles.textStyle}>{props.title}</TextFormat>
          <Image style={{height: 250, width: width, marginLeft: "auto", marginRight: "auto", borderRadius: 5, marginTop: 5, objectFit: "cover"}} source={{uri: props.image}} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  elevation: {
  },
  postStyle: {
    paddingVertical: 15,
    marginVertical: 5
  },
  textStyle: {
    paddingHorizontal: 15,
    marginVertical: 5
  }
})

export {Post}
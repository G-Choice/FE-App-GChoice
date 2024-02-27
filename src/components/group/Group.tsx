import {ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {GroupResApiType} from "../../@types/GroupResApiType.ts";
import {TextFormat} from "../text";
import {AvatarBubble} from "../child";
import {Colors} from "../../assets/colors";
import {useEffect, useState} from "react";


const Group = (props: GroupResApiType) => {
  const [hours, setHours] = useState<number>(5);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(2);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              setTimerActive(false);
            } else {
              setHours(prevHours => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, hours, minutes, seconds]);


  return (
    <View style={styles.groupWrapper}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={styles.groupContent}>
          <AvatarBubble />
          <View>
            <TextFormat weight={400} numberOfLines={1} color={'darkBlack'} size={'md'}>{props.group_name}</TextFormat>
            <TextFormat weight={300} numberOfLines={1} color={'lightBlue'} size={'md'}>Online Payment</TextFormat>
          </View>
        </View>
        <View style={{flexDirection: "row", gap: 3, height: 20, marginTop: 15}}>
          <Text style={styles.timeStyle}>{hours}</Text>
          <Text>:</Text>
          <Text style={styles.timeStyle}>{minutes}</Text>
          <Text>:</Text>
          <Text style={styles.timeStyle}>{seconds}</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: Colors.primaryColor, width: 60, flexDirection: "row", justifyContent: "center", borderRadius: 8}}>
          <TextFormat weight={600} numberOfLines={1} style={{marginTop: 12}} color={'secondaryColor'} size={'md'}>Join</TextFormat>
        </TouchableOpacity>
      </View>
      <View>
        <TextFormat>{props?.quantity_has_join}/{props?.quantity_total}</TextFormat>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={props?.radio}
          color={Colors.primaryColor}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  groupWrapper: {
    marginBottom: 10,
    margin: "auto",
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.secondaryColor,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10
  },
  groupContent: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 8
  },
  timeStyle: {
    backgroundColor: Colors.darkBlack,
    color: Colors.secondaryColor,
    fontWeight: "500",
    borderRadius: 2,
    paddingHorizontal: 2
  }
})

export {Group}

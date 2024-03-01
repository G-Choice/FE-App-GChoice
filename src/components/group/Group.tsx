import {ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {GroupResApiType} from "../../@types/GroupResApiType.ts";
import {TextFormat} from "../text";
import {AvatarBubble} from "../child";
import {Colors} from "../../assets/colors";
import {useEffect, useState} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import JoinModal from "./JoinModal.tsx";
import moment from 'moment';

const Group = (props: GroupResApiType) => {
  const navigation = useNavigation()
  const route = useRoute()
  const [hours, setHours] = useState<number>(5);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(2);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1)
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [groupModalId, setGroupModalId] = useState<number | null>(null);

  useEffect(() => {
    const groupTime = moment(props.groupTime);
    const createAt = moment(props.create_At);
    const duration = moment.duration(groupTime.diff(createAt));
    // console.log(duration,'ss')

    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);

    setTimerActive(true);

  }, [props.groupTime, props.create_At]);

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
  const handlePressJoin = () => {
    setShowPicker(true);
  };

  const handleConfirmJoin = (quantity: number) => {
    setShowPicker(false);
    setGroupModalId(props.id);
  };

  const handleClosePicker = () => {
    setShowPicker(false);
  };

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
        <TouchableOpacity style={{ backgroundColor: Colors.primaryColor, width: 60, height: 50, flexDirection: "row", justifyContent: "center", borderRadius: 16 }} onPress={handlePressJoin}>
          <TextFormat weight={600} numberOfLines={1} style={{ marginTop: 12 }} color={'secondaryColor'} size={'md'}>Join</TextFormat>
        </TouchableOpacity>
      </View>
      <JoinModal visible={showPicker} onClose={handleClosePicker} onJoin={handleConfirmJoin} groupId={props.id} />
      <View>
        <TextFormat>{props?.carts.total_quantity}/{props?.groupSize}</TextFormat>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={props?.radio}
          color={Colors.primaryColor}
        />
      </View>
      
    </View>
  );
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
  },
  modalWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 200,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: Colors.primaryColor,
    width: 100,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: Colors.lightGrey,
    width: 100,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export {Group}

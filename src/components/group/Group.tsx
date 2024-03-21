import { ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GroupResApiType } from "../../@types/GroupResApiType.ts";
import { TextFormat } from "../text";
import { AvatarBubble } from "../child";
import { Colors } from "../../assets/colors";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import JoinModal from "./JoinModal.tsx";
import moment from 'moment';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'
import { CountDown } from "../time";
const Group = (props: GroupResApiType) => {
  const navigation = useNavigation<any>()
  const route = useRoute()
  const [quantity, setQuantity] = useState<number>(1)
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [groupModalId, setGroupModalId] = useState<number | null>(null);

  const handlePressJoin = () => {
    setShowPicker(true);
  };

  const handleConfirmJoin = (quantity: number) => {
    setShowPicker(false);
    setGroupModalId(props.id ?? null);
  };
  const handleClosePicker = () => {
    setShowPicker(false);
  };
  const duration = moment.duration(props.remainingHours, 'hours');
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  const process = (props.current_quantity ?? 0) / (props.expected_quantity || 1);
  return (
    <TouchableOpacity style={styles.groupWrapper} onPress={() => navigation.navigate("GroupCart", { data: props })}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.groupContent}>
          <View style ={styles.avatar}>
          <AvatarBubble />
          </View>
          <View>
            <TextFormat weight={400} numberOfLines={1} color={'darkBlack'} size={'md'}>{props.group_name}</TextFormat>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <IconFontAwesome name="warehouse" size={10} color={Colors.primaryColor} style={{ marginRight: 5 }} />
              <TextFormat style={{ flexWrap: "wrap"}} weight={400} numberOfLines={1} color={'lightBlue'} size={'xs'}>{props.receiving_station.name} </TextFormat>
            </View>
          </View>
        </View>
        <View style ={styles.countdown}>
        <CountDown hours={hours} minutes={minutes} seconds={seconds} />
        </View>
        <TouchableOpacity
          style={[
            {
              backgroundColor: Colors.primaryColor,
              width: 60,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 8,
              opacity: props.isJoined ? 0.5 : 1,
            },
            props.isJoined && {
              backgroundColor: Colors.lighterPrimaryColor,
            },
          ]}
          onPress={handlePressJoin}
          disabled={props.isJoined}
        >
          <TextFormat
            weight={600}
            numberOfLines={1}
            style={{ marginTop: 12 }}
            color={"secondaryColor"}
            size={"md"}
          >
            {props.isJoined ? "Joined" : "Join"}
          </TextFormat>
        </TouchableOpacity>
      </View>
      <JoinModal visible={showPicker} onClose={handleClosePicker} onJoin={handleConfirmJoin} groupId={props.id} groupName={props.group_name} />
      <View>
        {props && (
          <>
            <TextFormat>{props.current_quantity}/{props?.expected_quantity}</TextFormat>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={process}
              color={Colors.primaryColor}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
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
  },
  countdown:{
    alignSelf: "center"
  },
  avatar:{
    alignSelf: "center"
  }
})

export { Group }

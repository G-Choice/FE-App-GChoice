import {
  ActivityIndicator,
  FlatList,
  Image,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, 
  Modal,
  Button
} from "react-native";
import { Cart, CountDown, Group, TextFormat } from "../../components";
import { HeaderNavigation } from "../../components/navigation/HeaderNavigation.tsx";
import { Colors } from "../../assets/colors";
import React, { useEffect, useState } from "react";
import { formattedPrice } from "../../utils";
import Icon from 'react-native-vector-icons/Ionicons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'
import GchoiceAxios from "../../api";
import { useRoute } from "@react-navigation/native";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { saveGroupCart } from "../../redux/actions/action.ts";
import Toast from 'react-native-toast-message';
import JoinModal from "../../components/group/JoinModal.tsx";

type RouteParams = {
  data: any;
};

const GroupCart = () => {
  const route = useRoute()
  const dispatch = useDispatch();
  const navigation = useNavigation<any>()
  const { data } = route.params as RouteParams;
  const [groupCart, setGroupCart] = useState<any>(null)
  const [buyingInfo, setBuyingInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 
  const [groupModalId, setGroupModalId] = useState<number | null>(null);
  useEffect(() => {
    setLoading(true);
    GchoiceAxios({
      method: "get",
      url: `groups/itemGroup/${data.id}`,
      responseType: "json",
    })
      .then((res) => {
        setBuyingInfo(res.data.data)
        setGroupCart(res.data)
        dispatch(saveGroupCart(res.data));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleConfirmOrder = () => {
    if (groupCart?.totalPrice.ispayment === false) {
      navigation.navigate("ConfirmOrder");
    } else {
      navigation.navigate("OrderDetail", { groupId: groupCart?.totalPrice.group_id });
    }
  }
  const duration = moment.duration(data?.remainingHours, 'hours');
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const handleClosePicker = () => {
    setShowPicker(false);
  };
  const handlePressJoin = () => {
    setShowPicker(true);
  };

  const handleConfirmJoin = (quantity: number) => {
    setShowPicker(false);
    // setGroupModalId(props.id ?? null);
  };
console.log(data,'oeioeieeq12')
  const process = (data?.current_quantity ?? 0) / (data?.expected_quantity || 1);
  const renderCart = ({ item }: { item: any }) => <Cart {...item} priceEachProduct={groupCart?.productByGroup?.price} />;
  const handleLogout = () => {
    setShowModal(true);
  };
  const confirmLogout = () => {
    GchoiceAxios.delete(`/groups/remove-user/${groupCart?.totalPrice.group_id}`)
      .then(response => {
        console.log('Logout successful:', response.data);
        Toast.show({
          type: 'success',
          text1: 'Delete successful',
          visibilityTime: 2000,
        });
        navigation.navigate("GroupEachProduct",groupCart?.productByGroup.id)
      })
      .catch(error => {
        console.error('Error:', error);
      });
      setShowModal(false);
  };
  console.log(data.id)

  if (!groupCart) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  console.log(groupCart,'ơieoiodu')

  return (
    <>
      <View>
        <HeaderNavigation type={'secondary'} title="Group Information" wrapperStyle={{ paddingTop: 1 }} />
        <View style={{ backgroundColor: Colors.secondaryColor, margin: 5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 5 }}>
            <Text style={{ color: Colors.primaryColor, fontWeight: "500" }}>{data?.current_quantity}/{data?.expected_quantity}</Text>
            <CountDown hours={hours} minutes={minutes} seconds={seconds} />
          </View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={process}
            color={Colors.primaryColor}
            style={{ marginBottom: 5 }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" , marginLeft: 10}}>
          <IconFontAwesome name="warehouse" size={20} color={Colors.primaryColor} style={{marginRight: 5}}/>
          <TextFormat weight={400} numberOfLines={1} color={'darkBlack'} size={'md'}>{groupCart.receingStation.name} - {groupCart.receingStation.address} </TextFormat>
        </View>
        <View style={styles.productContainer}>
          <Image source={{ uri: groupCart?.productByGroup?.images[0] }} style={styles.imgSize} />
          <View style={{ width: "80%" }}>
            <TextFormat weight={400} numberOfLines={2} color={'darkBlack'} size={'md'}>{groupCart?.productByGroup?.product_name}</TextFormat>
            <TextFormat weight={600} numberOfLines={1} color={'primaryColor'} size={'lg'}>{formattedPrice(groupCart?.productByGroup?.price)}</TextFormat>
          </View>
        </View>
        <FlatList data={buyingInfo} renderItem={renderCart} />
      </View>
      <View style={styles.totalPrice}>
      {/* {!data.isJoined && (
        <>
        <TouchableOpacity
          style={{
          flexDirection: "column",
          width: "30%",
          backgroundColor: Colors.primaryColor,
          height: "100%",
          justifyContent: "center",
          // alignItems: "center",
          // alignSelf: "center", 
          // marginLeft: 100
          }}
          onPress={handlePressJoin}
        >
          <TextFormat style={styles.textCancel}>Join Group</TextFormat>
        </TouchableOpacity>
      </>
      )} */}
        {data.isJoined && (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "30%",
                backgroundColor: "#008081",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleLogout}
              >
              <View style={styles.leaveContainer}>
              <IconAntDesign
                name="logout"
                size={20}
                color={Colors.secondaryColor}
                style={styles.iconLogout}
              />
              <TextFormat style={styles.textCancel}> Cancel join</TextFormat>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "70%",
                backgroundColor: Colors.primaryColor,
              }}
              onPress={handleConfirmOrder}
            >
              <TextFormat
                weight={400}
                size="md"
                color="secondaryColor"
                style={styles.textStyle}
              >
                Confirm with {data.expected_quantity} products
              </TextFormat>
              <TextFormat
                weight={500}
                size="lg"
                color="secondaryColor"
                style={styles.textStyle}
              >
                {formattedPrice(groupCart?.totalPrice.price)}
              </TextFormat>
            </TouchableOpacity>
          </>
        )
        }
        {/* <View><Text>jhdj</Text></View> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal} 
        onRequestClose={() => setShowModal(false)} 
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to leave the group?</Text>
            <View style={styles.modalButton}>
            <TouchableOpacity style={styles.button} onPress={confirmLogout} >
              <Text style = {styles.buttonText}>
                Confirm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}  onPress={() => setShowModal(false)}>
              <Text style = {styles.buttonText}>
                Cancel
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <JoinModal visible={showPicker} onClose={handleClosePicker} onJoin={handleConfirmJoin} groupId={data.id} groupName={data.group_name} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}

const styles = StyleSheet.create({
  imgSize: {
    width: 80,
    height: 80,
  },
  productContainer: {
    padding: 12,
    backgroundColor: Colors.secondaryColor,
    flexDirection: "row",
    width: "100%",
    gap: 10
  },
  timeStyle: {
    backgroundColor: Colors.darkBlack,
    color: Colors.secondaryColor,
    fontWeight: "500",
    borderRadius: 2,
    paddingHorizontal: 2
  },
  totalPrice: {
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row"
  },
  textStyle: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveContainer:{
    flexDirection: "column",
    justifyContent: "center"
  },
  textCancel:{
    fontSize: 17,
    color: Colors.secondaryColor,
    justifyContent: "center"
  },
  iconLogout:{
    marginLeft: "auto",
    marginRight: "auto",
    transform: [{ rotate: '180deg' }]
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between", 
    marginTop: 15
  },
  button: {
    flex: 1, 
    marginHorizontal: 19, 
    backgroundColor: Colors.secondaryColor,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 16
  },
  buttonText: {
    textAlign: "center", 
    color: Colors.darkBlack,
    fontSize: 15,
    fontWeight: "500",
  }
});

export { GroupCart }
import { Button, FlatList, StyleSheet, Text, ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Group, TextFormat } from "../../components";
import { HeaderNavigation } from "../../components/navigation/HeaderNavigation.tsx";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from "../../assets/colors";
import { SearchBar } from "../../components/input/SearchBar.tsx";
import { useNavigation, useRoute } from '@react-navigation/native';
import GchoiceAxios from "../../api/index.ts";
import { useSelector, useDispatch } from 'react-redux';
import { updateGroupList } from '../../redux/actions/action.ts'
import { RootState } from "../../redux/store/store.ts";
const GroupEachProduct = () => {
  const route = useRoute()
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const groupList = useSelector((state: RootState) => state.group.groupList);
  const [buttonData, setButtonData] = useState([])
  const [selectedStationId, setSelectedStationId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await GchoiceAxios.get("/receiving-station");
      setButtonData(response.data.data)
    } catch (error) {
      console.log("Error fetching data:", error)
    }
  }

  console.log(buttonData, 'tam din')
  useFocusEffect(
    React.useCallback(() => {
      const fetchGroups = async () => {
        try {
          const response = await GchoiceAxios.get(`/groups/${route.params}?receiving_station_id=${selectedStationId}`);
          dispatch(updateGroupList(response.data.data));
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      };
      fetchGroups();
    }, [dispatch, route.params, selectedStationId])
  );
  const handleBack = () => { };
  const handleOnPressIn = () => { };
  const handleSearch = () => { };
  const renderItem = ({ item }: { item: any }) => <Group {...item} />;
  const renderButtons = () => {
    return buttonData?.map((item: any) => (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.button,
          selectedAddress === item.id && styles.selectedButton
        ]}
        onPress={() => handleAddressSelect(item.id)}
      >
        <Text style={[
          styles.textad,
          selectedAddress === item.id && styles.selectedText
        ]}>{item?.address}</Text>
      </TouchableOpacity>
    ));
  };
  const handleAddressSelect = (stationId: string) => {
    if (selectedAddress === stationId) {
      setSelectedAddress("");
      setSelectedStationId("");
    } else {
      setSelectedStationId(stationId);
      setSelectedAddress(stationId);
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <HeaderNavigation type={'secondary'} title="Available Groups" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <View style={styles.groupGeneralWrapper}>
        <TextFormat weight={300} numberOfLines={1} color={'darkBlack'} size={'md'}>Groups ({groupList?.length})</TextFormat>
        <TouchableOpacity style={{ flexDirection: "row", gap: 2, borderRadius: 5, borderColor: Colors.primaryColor, borderWidth: 1, padding: 8 }} onPress={() => navigation.navigate("CreateGroup", route.params)}>
          <Icon name="plus" size={20} style={{ color: Colors.primaryColor, paddingTop: 2 }} />
          <TextFormat weight={400} numberOfLines={1} color={'primaryColor'} size={'md'}>Create new group</TextFormat>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.buttonContainer}>
          {renderButtons()}
        </View>
      </ScrollView>
      {groupList.length === 0 ? (
        <Text style={styles.noGroupText}>There are no groups available</Text>
      ) : (
        <>
          <FlatList data={groupList} renderItem={renderItem} style={styles.groupContainer} />

        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  groupContainer: {
    width: "95%",
    flexDirection: "column",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 8
  },
  groupGeneralWrapper: {
    flexDirection: "row",
    width: "95%",
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: "space-between",
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primaryColor,
    borderWidth: 1
  },
  textad: {
    color: Colors.darkGrey,
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.secondaryColor,
    fontWeight: '500',
  },
  selectedButton: {
    backgroundColor: Colors.primaryColor
  },
  noGroupText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.darkGrey,
  }
})

export { GroupEachProduct }
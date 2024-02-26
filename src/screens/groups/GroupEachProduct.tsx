import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Card, Group, TextFormat} from "../../components";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import {GroupResApiType} from "../../@types/GroupResApiType.ts";
import React from "react";
import Icon from 'react-native-vector-icons/Feather'
import {Colors} from "../../assets/colors";

const GroupEachProduct = () => {
  const GroupList: GroupResApiType[] = [
    {
      id: 1,
      avatar: "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
      group_name: "Group cua Uyen",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.2
    },
    {  id: 2,
      avatar: "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
      group_name: "Group Uyen",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.4
    },
    {  id: 3,
      avatar: "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
      group_name: " Uyen ",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.3
    },
    {  id: 4,
      avatar: "https://i.pinimg.com/736x/c3/92/c4/c392c4559c613a2e3c98b9095aad535e.jpg",
      group_name: "Uyen'Group",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.9
    },
    {
      id: 5,
      avatar: "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
      group_name: "Group cua Uyen",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.2
    },
    {  id: 6,
      avatar: "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
      group_name: "Group Uyen",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.4
    },
    {  id: 7,
      avatar: "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
      group_name: " Uyen ",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.3
    },
    {  id: 8,
      avatar: "https://i.pinimg.com/736x/c3/92/c4/c392c4559c613a2e3c98b9095aad535e.jpg",
      group_name: "Uyen'Group",
      quantity_total: 100,
      quantity_has_join: 20,
      time: "20:01:02",
      radio: 0.9
    }
  ]

  const renderItem = ({ item }: { item: any }) => <Group {...item} />;

  return (
    <View style={{backgroundColor: "white"}}>
      <HeaderNavigation type={'secondary'} title="Available Groups" wrapperStyle={{paddingTop: 1, marginBottom: 10}}/>
      <View style={styles.groupGeneralWrapper}>
        <TextFormat weight={300} numberOfLines={1} color={'darkBlack'} size={'md'}>Groups ({GroupList?.length})</TextFormat>
        <TouchableOpacity style={{flexDirection: "row", gap: 2, borderRadius: 5, borderColor: Colors.primaryColor, borderWidth: 1, padding: 8}}>
          <Icon name="plus" size={20} style={{ color: Colors.primaryColor, paddingTop: 2 }}/>
          <TextFormat weight={400} numberOfLines={1} color={'primaryColor'} size={'md'}>Create new group</TextFormat>
        </TouchableOpacity>
      </View>
      <FlatList data={GroupList} renderItem={renderItem}
                style={styles.groupContainer} />
    </View>
    )
}

const styles = StyleSheet.create({
  groupContainer: {
    width: "95%",
    flexDirection: "column",
    marginLeft:'auto',
    marginRight:'auto',
  },
  groupGeneralWrapper: {
    flexDirection: "row",
    width: "95%",
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent: "space-between",
    marginBottom: 10
  },
  button: {
    backgroundColor: 'transparent'
  }
})

export {GroupEachProduct}
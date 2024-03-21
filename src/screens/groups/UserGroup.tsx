import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Group, TextFormat} from "../../components";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import React, {useEffect, useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import {Colors} from "../../assets/colors";
import {SearchBar} from "../../components/input/SearchBar.tsx";
import { useNavigation, useRoute } from '@react-navigation/native';
import GchoiceAxios from "../../api/index.ts";
import { useSelector, useDispatch } from 'react-redux';
import { updateGroupList} from '../../redux/actions/action.ts'
import { RootState } from "../../redux/store/store.ts";
import { CardGroup } from "../../components/group/card.tsx";
import { ScrollView } from "react-native-virtualized-view";
const UserGroup = () => {
  const route = useRoute()
  const navigation = useNavigation<any>();
  const [groupList, setGroupList] = useState<any>(null);
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchGroups = async () => {
        try {
          const response = await GchoiceAxios.get(`/groups`);
          const updatedGroupList = response.data.data.map((group: any) => ({
            ...group,
            isJoined: true,
          }));
          setGroupList(updatedGroupList);
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      };
      fetchGroups();
    }, [])
  );


  const renderItem = ({ item }: { item: any }) => <CardGroup {...item} />;
  return (
    <>
    <HeaderNavigation type={'secondary'} title="Joined Groups" wrapperStyle={{ paddingTop: 1, marginBottom: 5 }} />
    <ScrollView >
     <View style={{backgroundColor: "white"}}>
      <View style={styles.groupGeneralWrapper}>
        <TextFormat weight={300} numberOfLines={1} color={'darkBlack'} size={'md'}>My Groups ({groupList?.length})</TextFormat>
      </View>
      <FlatList data={groupList} renderItem={renderItem}
                style={styles.groupContainer} />
    </View>
    </ScrollView>
    </>
   
  )
}

const styles = StyleSheet.create({
  groupContainer: {
    width: "95%",
    flexDirection: "column",
    marginLeft:'auto',
    marginRight:'auto',
    marginTop: 8
  },
  groupGeneralWrapper: {
    flexDirection: "row",
    width: "95%",
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 30
  },
  button: {
    backgroundColor: 'transparent'
  }
})

export {UserGroup};
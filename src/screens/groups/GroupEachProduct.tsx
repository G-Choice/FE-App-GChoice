import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Card, Group, TextFormat} from "../../components";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";
import React, {useEffect, useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import {Colors} from "../../assets/colors";
import {SearchBar} from "../../components/input/SearchBar.tsx";
import { useNavigation, useRoute } from '@react-navigation/native';
import GchoiceAxios from "../../api/index.ts";
import { useSelector, useDispatch } from 'react-redux';
import { updateGroupList} from '../../redux/actions/groupAction.ts'
import { RootState } from "../../redux/store/store.ts";
const GroupEachProduct = () => {
  const route = useRoute()
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const groupList = useSelector((state: RootState) => state.group.groupList);

  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await GchoiceAxios.get(`/groups?product_id=${route.params}`);
  //       dispatch(updateGroupList(response.data.data));
  //     } catch (error) {
  //       console.error('Error fetching groups:', error);
  //     }
  //   };
  //   fetchGroups();
  // }, [dispatch, route.params]);
  useFocusEffect(
    React.useCallback(() => {
      console.log(route.params,'aaa')
      const fetchGroups = async () => {
        try {
          const response = await GchoiceAxios.get(`/groups?product_id=${route.params}`);
          dispatch(updateGroupList(response.data.data));
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      };
      fetchGroups();
    }, [dispatch, route.params])
  );
  const handleBack = () => {};
  const handleOnPressIn = () => {};
  const handleSearch = () => {};
  const renderItem = ({ item }: { item: any }) => <Group {...item} />;
  return (
    <View style={{backgroundColor: "white"}}>
      <HeaderNavigation type={'secondary'} title="Available Groups" wrapperStyle={{paddingTop: 1, marginBottom: 10}}/>
      <View style={styles.groupGeneralWrapper}>
        <TextFormat weight={300} numberOfLines={1} color={'darkBlack'} size={'md'}>Groups ({groupList?.length})</TextFormat>
        <TouchableOpacity style={{flexDirection: "row", gap: 2, borderRadius: 5, borderColor: Colors.primaryColor, borderWidth: 1, padding: 8}}    onPress={() => navigation.navigate("CreateGroup", route.params )}>
          <Icon name="plus" size={20} style={{ color: Colors.primaryColor, paddingTop: 2 }}/>
          <TextFormat weight={400} numberOfLines={1} color={'primaryColor'} size={'md'}>Create new group</TextFormat>
        </TouchableOpacity>
      </View>
      <SearchBar placeholder="Search..." onSubmit={handleSearch} onPressIn={handleOnPressIn} />
      <FlatList data={groupList} renderItem={renderItem}
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
    marginTop: 8
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
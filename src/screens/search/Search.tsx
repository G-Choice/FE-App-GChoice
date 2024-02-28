import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Keyboard } from "react-native";
import { InputStateType } from "../../@types/InputStateType.ts";
import { inputInitState } from "../../constants/inputInitState.ts";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { saveSearchKey } from "../../global-states";
import {SearchBar} from "../../components/input/SearchBar.tsx";
import {Colors} from "../../assets/colors";
import {ScrollView} from "react-native-virtualized-view";
import Icon from "react-native-vector-icons/Feather";

const Search = () => {
  const searchKeys = useSelector((state: RootState) => state.search.searchKeys);
  const dispatch = useDispatch();
  const navigate = useNavigation<any>()
  const [search, setSearch] = useState<InputStateType>(inputInitState)
  const searchRef = useRef<TextInput>(null);

  const handleBack = () => {
    Keyboard.dismiss();
    navigate.goBack()
  };

  const handleSearch = () => {
    if (typeof search.value === "string") {
      dispatch(saveSearchKey(search.value));
    }
    navigate.navigate("SearchResult", search.value);
  };

  const handleSearchReuseKey = (props: string) => {
    navigate.navigate("SearchResult", props);
  }
  const handlePressIn = () => {}

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={{paddingVertical: 8}} onPress={handleBack}>
          <Icon name='chevron-left' size={30} />
        </TouchableOpacity>
        <SearchBar ref={searchRef}  placeholder="Search..." onSubmit={handleSearch} onChangeText={(text: string) => setSearch({value: text.trim(), error: ''})} onPressIn={handlePressIn} wrapperStyle={styles.searchBarStyle}/>
      </View>
      <View style={styles.previousSearchContainer}>
        <Text style={styles.previousSearchTitle}>Latest search:</Text>
        <ScrollView>
          {searchKeys.map((key, index) => (
            <TouchableOpacity key={index} style={styles.previousSearchItem} onPress={() => handleSearchReuseKey(key)}>
              <Text>{key}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  previousSearchContainer: {
    marginBottom: 20,
    margin: 5
  },
  previousSearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previousSearchItem: {
    marginBottom: 5,
    fontSize: 16,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBarStyle: {
    width: "90%"
  }
});

export { Search };

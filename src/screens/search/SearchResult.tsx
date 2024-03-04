import React, {useEffect, useRef, useState} from "react";
import {FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { Card } from "../../components";
import GchoiceAxios from "../../api";
import { ProductsResApiType } from "../../@types/ProductsResApiType.ts";
import {SearchBar} from "../../components/input/SearchBar.tsx";
import {InputStateType} from "../../@types/InputStateType.ts";
import {inputInitState} from "../../constants/inputInitState.ts";
import {useNavigation, useRoute} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

interface SearchProps {
  route: {
    params: {
      search: string
    }
  }
}

const SearchResult = () => {
  const route = useRoute();
  const [search, setSearch] = useState<InputStateType>(inputInitState)
  const searchRef = useRef<TextInput>(null);
  const [productList, setProductList] = useState<ProductsResApiType[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const take = 8;
  const name = route.params
  const navigate = useNavigation<any>()

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    GchoiceAxios({
      method: "get",
      url: `products?page=${page}&take=${take}&searchByName=${name}`,
      responseType: "json",
    })
      .then((res) => {
        setProductList((prev) => prev.concat(res.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleBack = () => {
    Keyboard.dismiss()
    navigate.goBack()
  };
  const handleSearch = () => {}
  const renderItem = ({ item }: { item: any }) => <Card {...item} />;

  const handlePressIn = (option: string) => {
    setSelectedOption(option); 
  };

  return (
    <View style={styles.productContainer}>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={{paddingVertical: 8}} onPress={handleBack}>
          <Icon name='chevron-left' size={30} />
        </TouchableOpacity>
        <SearchBar ref={searchRef} placeholder="Search..." onSubmit={handleSearch} onChangeText={(text: string) => setSearch({value: text.trim(), error: ''})} onPressIn={() => navigate.navigate("Search")} wrapperStyle={styles.searchBarStyle}/>
      </View>
      <View style={styles.sortStyle}>
        <TouchableOpacity
          style={[styles.sortItem, styles.sortItemBorder, selectedOption === 'Newest' && styles.selectedOption]}
          onPress={() => handlePressIn('Newest')}>
          <Text>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortItem, selectedOption === 'Price' && styles.selectedOption]}
          onPress={() => handlePressIn('Price')}>
          <Text>Price</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 20,
          gap: 10,
          marginLeft: 5,
          marginRight: 15
        }}
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setPage((prev) => prev + 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 5,
    marginBottom: 100,
    backgroundColor: "white"
  },
  sortStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 20,
    marginTop: 10
  },
  sortItem: {
    flex: 1,
    textAlign: 'center',
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10
  },
  sortItemBorder: {
    borderRightWidth: 0.5,
    borderRightColor: '#ccc',
  },
  selectedOption: {
    color: 'pink',
    borderBottomColor: 'pink',
    borderBottomWidth: 2,
  },
  searchBarStyle: {
    width: "90%"
  }
});

export { SearchResult };

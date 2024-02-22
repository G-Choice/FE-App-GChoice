import React, { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, VirtualizedList} from "react-native";
import { Card } from "./Card.tsx";
import GchoiceAxios from "../../api";
import {ProductsResApiType} from "../../@types/ProductsResApiType.ts";

const CardContainer = () => {

  const [productList, setProductList] = useState<ProductsResApiType[]>([])

  const productCount = () => productList.length
  const getProducts = (products: ProductsResApiType[], index: number) => productList[index];

  const [page, setPage] = useState<number>(1)
  const take = 8

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    GchoiceAxios({
      method: 'get',
      url: `products?page=${page}&take=${take}`,
      responseType: 'json'
    })
      .then(res => {
        setProductList((pre => pre.concat(res.data.data)))
      })
      .catch(e => {
        console.log(e);
      });
  };

  const renderItem = ({ item }: { item: any }) => <Card {...item} />;

  return (
    <View style={styles.productContainer}>
      <VirtualizedList
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        data={productList}
        getItem={getProducts}
        getItemCount={productCount}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 5,
          marginRight: 15,
          paddingBottom: 20,
          gap: 10,
          flexDirection: "row"
        }}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={5}
        onEndReached={() => {
          setPage(pre => pre + 1)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 5,
    marginBottom: 100
  },
  paginationButton: {
    backgroundColor: '#3498db',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  paginationText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export { CardContainer };

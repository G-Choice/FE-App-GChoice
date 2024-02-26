import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, VirtualizedList } from "react-native";
import { Card } from "./Card.tsx";
import GchoiceAxios from "../../api";
import { ProductsResApiType } from "../../@types/ProductsResApiType.ts";

const CardContainer = () => {
  const [productList, setProductList] = useState<ProductsResApiType[]>([]);

  const [page, setPage] = useState<number>(1);
  const take = 8;

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    GchoiceAxios({
      method: "get",
      url: `products?page=${page}&take=${take}`,
      responseType: "json",
    })
      .then((res) => {
        setProductList((prev) => prev.concat(res.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderItem = ({ item }: { item: any }) => <Card {...item} />;

  return (
    <View style={styles.productContainer}>
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
  },
});

export { CardContainer };

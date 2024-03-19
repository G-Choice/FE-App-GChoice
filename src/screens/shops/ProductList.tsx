import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../assets/colors";
import { ProductsResApiType } from "../../@types/ProductsResApiType.ts";
import { useNavigation } from '@react-navigation/native';
import GchoiceAxios from "../../api";

const getWidthOfScreen = Dimensions.get("screen").width;

interface ProductListProps {
  shopId: string;
}

const ProductList = ({ shopId }: ProductListProps) => {
  const [productList, setProductList] = useState<ProductsResApiType[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchData();
  }, [shopId]);

  const fetchData = () => {
    GchoiceAxios({
      method: "get",
      url: `/products/productOfShop/${shopId}`,
    })
      .then((res) => {
        setProductList(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (productList.length <= 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  const handleCardPress = (id: string) => {
    navigation.navigate('ProductDetail', id);
  };

  const renderItem = ({ item }: { item: ProductsResApiType }) => (
    <TouchableOpacity 
      style={{ width: '50%' }} 
      onPress={() => handleCardPress(item.id)}
    >
      <View style={styles.cardWrapper}>
        <Image 
          style={styles.productImgPreview} 
          source={{ uri: item.images && item.images.length > 0 ? item.images[0] : '' }} 
        />
        <View style={{margin: 5}}>
          <Text style={styles.productTitle} numberOfLines={2}>{item.product_name}</Text>
          <Text style={styles.productPrice}>{formattedPrice(item.price)}</Text>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
              <Image
                source={require('../../assets/icons/rating.jpg')}
                style={{ width: 15, height: 15 }}
              />
              <Text style={{borderRightWidth: 0.5, paddingRight: 2, borderColor: Colors.lightGrey}}>4.6</Text>
              <Text>Đã bán {item.quantity_inventory}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        }}
      />
    </View>
  );
};

const formattedPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 5,
    marginBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    width: "100%",
    height: "auto",
    borderColor: Colors.primaryColor,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor:  Colors.secondaryColor
  },
  productImgPreview: {
    width: "100%",
    height: (getWidthOfScreen - 5*3) * 0.5 + 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  productTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.darkBlack
  },
  productPrice: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontFamily: "Poppins-Medium"
  }
});

export {ProductList} ;
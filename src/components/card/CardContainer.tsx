import {FlatList, StyleSheet, View, VirtualizedList} from "react-native";
import {Card} from "./Card.tsx";
import {ProductListModel} from "../../@types/ProductListModel.ts";

interface Products extends ProductListModel {
  id?: string,
  image?: string,
  title?: string,
  description?: string,
  price?: number,
  rating?: number,
  coupon?: any,
  sold?: number,
  stock?: number,
  status?: number
}

const data: Products[] = [
  {
    id: 1,
    product_name: "Bowl",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    price: 23,
    status: "active",
    description: "A good product",
    brand: "GUCCI",
    quantity_sold: 0,
    quantity_inventory: 30,
    created_at: "2024-02-21T02:22:50.234Z",
    delete_At: null,
    category_id: 1,
    shop_id: 10,
    product_id: 1,
    product_quantity_sold: 0,
    product_price: 23,
    avgRating: "4.0000000000000000",
  },
  {
    id: 3,
    product_name: "Hat",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    price: 23,
    status: "active",
    description: "A good product",
    brand: "GUCCI",
    quantity_sold: 0,
    quantity_inventory: 30,
    created_at: "2024-02-21T02:22:50.234Z",
    delete_At: null,
    category_id: 1,
    shop_id: 10,
    product_id: 1,
    product_quantity_sold: 0,
    product_price: 23,
    avgRating: "4.0000000000000000",
  }
];

const CardContainer = () => {
  return (
    <View style={styles.productContainer}>
      <FlatList style={{width: '100%'}}
                data={data}
                numColumns={2}
                columnWrapperStyle={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                  gap: 5
                }}
                renderItem={({item}) => <Card {...item} />}/>
    </View>
  )
}

const styles = StyleSheet.create({
  productContainer: {
    margin: 5
  }
})
export {CardContainer}
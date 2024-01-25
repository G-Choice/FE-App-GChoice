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
    id: "ABCt123",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Ốp Điện Thoại TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    id: "ABCg123",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    id: "ABC123",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    id: "ABC12ỷ3",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    id: "ABC12ỷy3",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Ốp Điện Thoại TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    id: "ABC123m",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    id: "ABC123d",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    id: "ABC123n",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
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
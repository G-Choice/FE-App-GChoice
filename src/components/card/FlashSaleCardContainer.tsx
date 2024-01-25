import {FlatList, Text, View} from "react-native";
import {ProductListModel} from "../../@types/ProductListModel.ts";
import {FlashSaleCard} from "./FlashSaleCard.tsx";

interface Products extends ProductListModel {
  key: number
}


const data: Products[] = [
  {key: 1,
    id: "ABCt123",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Ốp Điện Thoại TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    key: 2,
    id: "ABCg123",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    key:3,
    id: "ABC123",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    key: 4,
    id: "ABC12ỷ3",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    key: 5,
    id: "ABC12ỷy3",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Ốp Điện Thoại TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    key: 6,
    id: "ABC123m",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "TPU Mềm Hoạt Hình Có Giá Đỡ Kim Loại Cho for IPhone 15 pro max 11 14 Pro Max 13 Pro Max 12 IPhone X XS XR 7 8",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    key: 7,
    id: "ABC123d",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
  {
    key: 8,
    id: "ABC123n",
    image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
    title: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    rating: 4.5,
    coupon: {code: "SAVE10", discount: 10},
  },
];
const FlashSaleCardContainer = () => {
  return (
    <View>
      <FlatList horizontal={true} data={data} renderItem={({item}) =>  <FlashSaleCard {...item}/>} />
    </View>
  )
}

export {FlashSaleCardContainer}
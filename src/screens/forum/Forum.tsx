import {FlatList, Text, View} from "react-native";
import {Post} from "../../components";
import React from "react";
import {ForumsStateType} from "../../@types/ForumStateType.ts";
import {HeaderNavigation} from "../../components/navigation/HeaderNavigation.tsx";

const Forums: ForumsStateType[] = [
  {
    id: 1,
    avatar: "https://i.pinimg.com/564x/75/20/1d/75201d677811a0d3a015a9a279111f8b.jpg",
    name: "Jessica Uyen",
    time: 2,
    title: "🎉 Hãy để chúng tôi giúp bạn thể hiện phong cách và cá nhân hóa mỗi bước đi của bạn! 🎉",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 2,
    avatar: "https://i.pinimg.com/564x/a7/35/1c/a7351c3af473e41a390bbc0a40009145.jpg",
    name: "Alexander Vu",
    time: 2,
    title: "🛍️ Đừng bỏ lỡ cơ hội sở hữu những món đồ độc đáo và thú vị từ GCHOICE! Tạo nên phong cách của riêng bạn ngay từ bây giờ!",
    image: "https://images.unsplash.com/photo-1700353763351-cb61036f3232?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 3,
    avatar: "https://i.pinimg.com/564x/df/99/4a/df994ab260735d7999202cf3fda3fe14.jpg",
    name: "Jonhny Dang",
    time: 2,
    title: "🌺",
    image: "https://vn-live-01.slatic.net/p/e5234d49f2b4b4e9e434034dcbcdf66d.jpg",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 4,
    avatar: "https://i.pinimg.com/564x/a5/e1/60/a5e160cd4669d95998e50fcc987a8170.jpg",
    name: "Linh Eo Vi",
    time: 2,
    title: "Uống một ly nước cam mỗi ngày giúp cung cấp vitamin C, giúp tăng cường thể lực, hỗ trợ hệ tiêu hóa, đồng thời chống ung thư mạnh mẽ.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 5,
    avatar: "https://i.pinimg.com/564x/a5/e1/60/a5e160cd4669d95998e50fcc987a8170.jpg",
    name: "Linh Eo Vi",
    time: 2,
    title: "Trong socola có chứa axit amin tryptophan, thúc đẩy cơ thể sản xuất ra chất chống trầm cảm serotonin trong não. Chỉ cần tiêu thụ 1 lượng vừa đủ socola thì có",
    image: "https://images.unsplash.com/photo-1617535394182-641e70651cd8?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 6,
    avatar: "https://i.pinimg.com/564x/a5/e1/60/a5e160cd4669d95998e50fcc987a8170.jpg",
    name: "Linh Eo Vi",
    time: 2,
    title: "Uống một ly nước cam mỗi ngày giúp cung cấp vitamin C, giúp tăng cường thể lực, hỗ trợ hệ tiêu hóa, đồng thời chống ung thư mạnh mẽ.",
    image: "https://wenatur.vn/datafiles/35724/upload/files/home/s%E1%BA%A3n%20ph%E1%BA%A9m/chi%20ti%E1%BA%BFt%20s%E1%BA%A3n%20ph%E1%BA%A9m%20tr%C3%A1i%20c%C3%A2y%20s%E1%BA%A5y.jpg",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 7,
    avatar: "https://i.pinimg.com/564x/75/20/1d/75201d677811a0d3a015a9a279111f8b.jpg",
    name: "Jessica Uyen",
    time: 2,
    title:
      "🌟 Chào các bạn thân yêu! 🌟",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 8,
    avatar: "https://i.pinimg.com/564x/a7/35/1c/a7351c3af473e41a390bbc0a40009145.jpg",
    name: "Thuy QA",
    time: 2,
    title: "🎒",
    image: "https://images.unsplash.com/photo-1700353763351-cb61036f3232?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 9,
    avatar: "https://i.pinimg.com/564x/df/99/4a/df994ab260735d7999202cf3fda3fe14.jpg",
    name: "Viên OT",
    time: 2,
    title: "👜",
    image: "https://plus.unsplash.com/premium_photo-1677706562620-7bd66a851874?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 10,
    avatar: "https://i.pinimg.com/564x/a5/e1/60/a5e160cd4669d95998e50fcc987a8170.jpg",
    name: "Uyên mua sắm",
    time: 2,
    title: "🎉 Hãy đến và tham gia cùng chúng tôi ngay hôm nay! 🎉",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 11,
    avatar: "https://i.pinimg.com/564x/a5/e1/60/a5e160cd4669d95998e50fcc987a8170.jpg",
    name: "Tiara",
    time: 2,
    title: "Uống một ly nước cam mỗi ngày giúp cung cấp vitamin C, giúp tăng cường thể lực, hỗ trợ hệ tiêu hóa, đồng thời chống ung thư mạnh mẽ.",
    image: "https://plus.unsplash.com/premium_photo-1677706562773-d5063105a9b4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    commentCount: 2,
    likedCount: 3
  },
  {
    id: 12,
    avatar: "https://i.pinimg.com/564x/a5/e1/60/a5e160cd4669d95998e50fcc987a8170.jpg",
    name: "Vo Thanh Tam",
    time: 2,
    title: "Uống một ly nước cam mỗi ngày giúp cung cấp vitamin C, giúp tăng cường thể lực, hỗ trợ hệ tiêu hóa, đồng thời chống ung thư mạnh mẽ.",
    image: "https://wenatur.vn/datafiles/35724/upload/files/home/s%E1%BA%A3n%20ph%E1%BA%A9m/chi%20ti%E1%BA%BFt%20s%E1%BA%A3n%20ph%E1%BA%A9m%20tr%C3%A1i%20c%C3%A2y%20s%E1%BA%A5y.jpg",
    commentCount: 2,
    likedCount: 3
  }
]
const Forum = () => {

  const renderPost = ({ item }: { item: any }) => <Post {...item} />;
  return (
    <>
      <HeaderNavigation type={'secondary'} title="Forums" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <View style={[{marginHorizontal: 10, marginBottom: 20}]}>
        <FlatList data={Forums} renderItem={renderPost}/>
      </View>
    </>
  )
}

export {Forum}
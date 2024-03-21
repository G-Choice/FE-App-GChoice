import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../assets/colors';
import GChoiceAxios from '../../api/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomSliderBox from '../../components/slider/SliderBox';
import { HeaderNavigation } from "../../components/navigation/HeaderNavigation.tsx";
import { formattedPrice } from "../../utils";
interface Discount {
  discountPrice: string;
  minQuantity: number
}

const ProductDetail = () => {
  const route = useRoute()
  const id = route.params;
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const groupInfo = '8 groups are joining';
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await GChoiceAxios.get(`/products/${id}`);
      setProductDetails(response?.data?.data);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching product details:', error);
    }
  };

  const navToGroup = useNavigation<any>()

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!productDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <>
      <HeaderNavigation type={'secondary'} title="Product" wrapperStyle={{ paddingTop: 1, marginBottom: 10 }} />
      <View style={styles.container}>
        <ScrollView>
          <CustomSliderBox
            images={productDetails.images}
            sliderBoxHeight={200}
            borderRadius={10}
          />
          <View style={styles.infoContainer}>
            <View style={styles.textInfoContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.productName}>{productDetails.product_name}</Text>
                {/* <Icon name="home" size={20} color={Colors.primaryColor} style={styles.icon} /> */}
                {/* <Text style={styles.shopName}>{productDetails.shop.shop_name}</Text> */}
              </View>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>{formattedPrice(productDetails.price)}</Text>
            <TouchableOpacity style={styles.groupInfoContainer} onPress={() => navToGroup.navigate("GroupEachProduct", route.params)}>
              <Text style={styles.groupInfo}>{groupInfo}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.safeImagesContainer}>
            <View style={styles.safeImageItem}>
              <Image source={require('../../assets/images/authentic.jpg')} style={styles.safeImage} />
              <Text style={styles.safeImageLabel}>Authentic</Text>
            </View>
            <View style={styles.safeImageItem}>
              <Image source={require('../../assets/images/guarantee.jpg')} style={styles.safeImage} />
              <Text style={styles.safeImageLabel}>Guarantee</Text>
            </View>
            <View style={styles.safeImageItem}>
              <Image source={require('../../assets/images/secures.jpg')} style={styles.safeImage} />
              <Text style={styles.safeImageLabel}>Safe & Secure</Text>
            </View>
            <View style={styles.safeImageItem}>
              <Image source={require('../../assets/images/heart.jpg')} style={styles.safeImage} />
              <Text style={styles.safeImageLabel}>New</Text>
            </View>
          </View>
          <View style={styles.shopInfoContainer}>
            <View style={styles.shopAvatarContainer}>
              {productDetails.shop.shop_image ? (
                <Image source={{ uri: productDetails.shop.shop_image[0] }} style={styles.shopAvatar} />
              ) : (
                <Text>No Image Available</Text>
              )}
            </View>
            
            <View style={styles.shopDetailsContainer}>
              <Text style={styles.shopName}>{productDetails.shop.shop_name}</Text>
              <View style={styles.shopAddressContainer}>
                <Icon name="map-marker" size={18} color={Colors.primaryColor} style={styles.addressIcon} />
                <Text style={styles.shopAddress}>{productDetails.shop.shop_address}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewShopButton} onPress={()=> navToGroup.navigate("ShopInfor",{shopId:productDetails.shop.id })}>
              <Text style={styles.viewShopButtonText}>View Shop</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.titleReviews}>Product Description</Text>
          <Text style={styles.productDescription}>{productDetails.description}</Text>
          <Text style={styles.titleReviews}>Product reviews</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.numberRating}>{productDetails.avgrating}/5</Text>
            <Rating type="custom" ratingCount={5} imageSize={20} startingValue={productDetails.avgrating} readonly tintColor="#f4f4f4" />
          </View>
          <View style={styles.feedbacksContainer}>
            {productDetails.reviews.map((feedback: any) => (
              <View key={feedback.id} style={styles.feedbackItem}>
                <View style={styles.userReviewInfo}>
                  <Image source={require('../../assets/images/avt.jpg')} style={styles.avatar} />
                  <View>
                    <Text style={styles.userName}>{feedback.users.username}</Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      imageSize={13}
                      startingValue={feedback.rating}
                      readonly
                      ratingColor={Colors.primaryColor}
                      tintColor="#f4f4f4"
                    />
                  </View>
                </View>
                <Text style={styles.reviewText}>{feedback.comment}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.titleReviews}>Discounts</Text>
          <View style={styles.discountTableContainer}>
            <View style={styles.discountTableHeader}>
              <Text style={styles.discountTableHeaderCell}>Quantity</Text>
              <Text style={styles.discountTableHeaderCell}>Price</Text>
            </View>
            {productDetails?.discounts.map((discount: Discount, index: number) => (
              <View key={index} style={styles.discountTableRow}>
                <Text style={styles.discountTableCell}> {">"}{discount.minQuantity}</Text>
                <Text style={styles.discountTableCell}> {discount.discountPrice} $</Text>
              </View>
            ))}
          </View>
        </ScrollView>

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={toggleLike}
        >
          <Icon
            name={isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={isLiked ? Colors.primaryColor : Colors.primaryColor}
            style={styles.buttonIcon}
          />
          <Text> 2030</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinGroupButton} onPress={() => navToGroup.navigate("GroupEachProduct", route.params)}>
          <Text style={styles.buttonText}>Join Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  textInfoContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: -200,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 25,
    color: Colors.primaryColor,
    fontWeight: '600'
  },
  shopInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20

  },
  shopAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  shopNameDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGrey,
  },
  shopAvatarContainer: {
    marginRight: 10,
  },
  shopDetailsContainer: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGrey,
  },
  shopAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    marginRight: 5,
  },
  shopAddress: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  viewShopButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
    borderColor: Colors.primaryColor,
    borderWidth: 1
  },
  viewShopButtonText: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 15,
    color: Colors.darkGrey,
    padding: 5
  },
  groupInfoContainer: {
    backgroundColor: '#FFCDD2',
    padding: 8,
    borderRadius: 13,
  },
  groupInfo: {
    fontSize: 13,
    color: Colors.primaryColor,
  },
  ratingContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  numberRating: {
    marginRight: 4
  },
  feedbacksContainer: {
    marginTop: 16,
  },
  feedbackItem: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#FF4081',
  },
  safeImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  safeImageItem: {
    alignItems: 'center',
  },
  safeImage: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
  safeImageLabel: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userReviewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },

  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewText: {
    marginBottom: 8,
  },
  titleReviews: {
    fontSize: 17,
    fontWeight: '600',
    paddingTop: 10
  },
  discountTableContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
  },
  discountTableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.darkGrey
  },
  discountTableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    color: Colors.darkGrey,
    fontWeight: 'bold',
  },
  discountTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,

    borderColor: Colors.primaryColor,
    paddingVertical: 8,
  },
  discountTableCell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#FFF',
  },
  joinGroupButton: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  heartButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'center',

  },
  buttonIcon: {
    marginLeft: 8,

  },
  buttonText: {
    color: Colors.secondaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { ProductDetail };

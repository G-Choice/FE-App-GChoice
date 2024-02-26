import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import { SliderBox } from 'react-native-image-slider-box';
import { Colors } from '../../assets/colors/index';
import GChoiceAxios from '../../api/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import CustomSliderBox from '../../components/slider/SliderBox';
interface ProductDetailProps {
  route: {
    params: {
      id: string;
    };
  };
}
interface Discount {
  discountPrice: string;
}

interface Feedback {
  id: String;
  rating: number;
  comment: string;
  users: {
    username: string;
  }
}
interface ProductDetails {
  product_name: string;
  shop: {
    shop_name: string;
  };
  price: string;
  description: string;
  avgrating: number;
  reviews: Feedback[];
  discounts: Discount[]
}

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const navigation = useNavigation()
  const { id } = route.params;
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const groupInfo = '8 groups are joining';
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const { width, height } = Dimensions.get('window');
  console.log(width,)
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await GChoiceAxios.get(`/products/${id}`);
      const data = response.data;
      console.log(data);
      setProductDetails(data?.data);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching product details:', error);
    }
  };

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
              <Icon name="home" size={20} color={Colors.primaryColor} style={styles.icon} />
              <Text style={styles.shopName}>{productDetails.shop.shop_name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${productDetails.price}</Text>
          <TouchableOpacity style={styles.groupInfoContainer}  onPress={() => navigation.navigate('CreateGroup')}>
            <Text style={styles.groupInfo}>{groupInfo}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.safeImagesContainer}>
          <View style={styles.safeImageItem}>
            <Image source={require('../../assets/images/authentic.png')} style={styles.safeImage} />
            <Text style={styles.safeImageLabel}>Authentic</Text>
          </View>
          <View style={styles.safeImageItem}>
            <Image source={require('../../assets/images/guarantee.png')} style={styles.safeImage} />
            <Text style={styles.safeImageLabel}>Guarantee</Text>
          </View>
          <View style={styles.safeImageItem}>
            <Image source={require('../../assets/images/secure.png')} style={styles.safeImage} />
            <Text style={styles.safeImageLabel}>Safe & Secure</Text>
          </View>
          <View style={styles.safeImageItem}>
            <Image source={require('../../assets/images/heart.png')} style={styles.safeImage} />
            <Text style={styles.safeImageLabel}>New</Text>
          </View>
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
                <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
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
              <Text style={styles.discountTableCell}> {">"}{discount.discountPrice}</Text>
              <Text style={styles.discountTableCell}> {discount.discountPrice} $</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
        <TouchableOpacity style={styles.joinGroupButton}>
          <Text style={styles.buttonText}>Join Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

    </View>
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
  shopName: {
    fontSize: 16,
    color: Colors.darkGrey,
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

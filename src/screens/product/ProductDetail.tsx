import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native';
import { Rating } from 'react-native-ratings';
import { SliderBox } from 'react-native-image-slider-box';
import { Colors } from '../../assets/colors/index';
import GChoiceAxios from '../../api/index';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';  // Import from deprecated-react-native-prop-types

interface ProductDetailProps {
  route: {
    params: {
      id: string;
    };
  };
}



const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const { id } = route.params;
  const [productDetails, setProductDetails] = useState<any>(null);

  const productImages = [
    'https://down-vn.img.susercntent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d',
    'https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e',
    'https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d',
  ];

  const groupInfo = '8 groups are joining';


  const fetchProductDetails = async () => {
    try {
      const response = await GChoiceAxios.get(`/products/${id}`);
      const data = response.data;
      console.log(data);
      setProductDetails(data?.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  console.log(productDetails, 'lllmmmm');

  if (!productDetails) {
    return <Text>Loading...</Text>;
  }
  

  return (
    <ScrollView>
    <View style={styles.container}>
      <SliderBox
        images={[productDetails.image]}
        sliderBoxHeight={200}
        dotColor="#FA7189"
        inactiveDotColor="#90A4AE"
        circleLoop
      />
      

      <View style={styles.infoContainer}>
        <View style={styles.textInfoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.productName}>{productDetails.product_name}</Text>
            <Text style={styles.shopName}>{productDetails.shop.shop_name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>${productDetails.price}</Text>
        <View style={styles.groupInfoContainer}>
          <Text style={styles.groupInfo}>{groupInfo}</Text>
        </View>
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
        <Rating type="custom" ratingCount={5} imageSize={20} startingValue={productDetails.avgrating} readonly />
      </View>

      <View style={styles.feedbacksContainer}>
        {productDetails.reviews.map((feedback) => (
          <View key={feedback.id} style={styles.feedbackItem}>
            <View style={styles.userReviewInfo}>
              <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{feedback.users.username}</Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={13}
                  startingValue={feedback.rating}
                  readonly
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
        {productDetails.discounts.map((discount, index) => (
          <View key={index} style={styles.discountTableRow}>
            <Text style={styles.discountTableCell}>>{discount.minQuantity}</Text>
            <Text style={styles.discountTableCell}>>{discount.discountPrice}</Text>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  shopName: {
    fontSize: 16,
    color: Colors.darkGrey,
    marginLeft: 8,

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
  productDescription:{
    fontSize:15,
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
  userInfo: {
    flex: 1,
    flexDirection:'column'
    
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewText: {
    marginBottom: 8,
  },
  titleReviews:{
    fontSize: 17,
    fontWeight:'600',
    paddingTop : 10
  },
  discountTableContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
  },
  discountTableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    paddingVertical: 8,
  },
  discountTableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
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
});

export { ProductDetail };

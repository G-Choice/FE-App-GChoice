import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { SliderBox } from 'react-native-image-slider-box';
import { Colors } from '../../assets/colors/index'

const ProductDetail = () => {
  const productImages = [
    'https://down-vn.img.susercntent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d',
    'https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e',
    'https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d',
  ];

  const productName = 'Product Name';
  const shopName = 'Shop Name';
  const productPrice = '$99.99';
  const groupInfo = '8 groups are joining'; 
  const rating = 4.5;
  const feedbacks = [
    { id: 1, text: 'Great product!', rating: 5 },
    { id: 2, text: 'Fast shipping, recommended.', rating: 4 },
    { id: 3, text: 'Not what I expected.', rating: 2 },
  ];

  return (
    <View style={styles.container}>
      <SliderBox
        images={productImages}
        sliderBoxHeight={200}
        dotColor= "#FA7189"
        inactiveDotColor="#90A4AE"
        circleLoop
      />

    <View style={styles.infoContainer}>
  <View style={styles.textInfoContainer}>
    <View style={styles.nameContainer}>
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.shopName}>{shopName}</Text>
    </View>
  </View>
</View>

      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>{productPrice}</Text>
        <View style={styles.groupInfoContainer}>
    <Text style={styles.groupInfo}>{groupInfo}</Text>
  </View>
      </View>
      <View style={styles.safeImagesContainer}>
  {/* Add your Safe images and labels here */}
  <View style={styles.safeImageItem}>
    {/* Add your Safe image component here */}
    <Image
      source={require('../../assets/images/authentic.png')} 
      style={styles.safeImage}
    />
    <Text style={styles.safeImageLabel}>Authentic</Text>
  </View>
  <View style={styles.safeImageItem}>
    {/* Add your Safe image component here */}
    <Image
      source={require('../../assets/images/guarantee.png')} 
      style={styles.safeImage}
    />
    <Text style={styles.safeImageLabel}>Guarantee</Text>
  </View>
  <View style={styles.safeImageItem}>
    {/* Add your Safe image component here */}
    <Image
      source={require('../../assets/images/secure.png')} 
      style={styles.safeImage}
    />
    <Text style={styles.safeImageLabel}>Safe & Secure</Text>
  </View>
  <View style={styles.safeImageItem}>
    {/* Add your Safe image component here */}
    <Image
      source={require('../../assets/images/heart.png')} 
      style={styles.safeImage}
    />
    <Text style={styles.safeImageLabel}>New</Text>
  </View>
</View>
      <View style={styles.ratingContainer}>
        <Rating
          type="custom"
          ratingCount={5}
          imageSize={20}
          startingValue={rating}
          readonly
        />
      </View>

      <View style={styles.feedbacksContainer}>
        {feedbacks.map((feedback) => (
          <View key={feedback.id} style={styles.feedbackItem}>
            <Text>{feedback.text}</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={15}
              startingValue={feedback.rating}
              readonly
            />
          </View>
        ))}
      </View>

      {/* Add your Add to Cart button or TouchableOpacity here */}
    </View>
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
    // borderRadius: 25,
    marginBottom: 8,
  },
  safeImageLabel: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
});

export { ProductDetail };

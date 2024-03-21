import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import {promotionSliderData} from "../../data/promotionSliderData.ts";

const { width, height } = Dimensions.get('screen');

interface SlideItemProps {
  img: string,
  id: number
}

const SlideItem = (item: SlideItemProps) => {
  const translateYImage = new Animated.Value(40);

  useEffect(() => {
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/banner/top5.jpg")}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />

    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height: 200,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
  },
});

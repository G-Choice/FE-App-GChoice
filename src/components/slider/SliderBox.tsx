import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { View, StyleSheet } from 'react-native';

interface CustomSliderBoxProps {
    images: string [],
    sliderBoxHeight: number;
    borderRadius: number;
}
const CustomSliderBox:React.FC<CustomSliderBoxProps> = ({ images, sliderBoxHeight, borderRadius }) => {
  return (
    <View style={{ borderRadius: borderRadius, overflow: 'hidden' }}>
      <SliderBox
        images={images}
        sliderBoxHeight={sliderBoxHeight}
        dotColor="#FA7189"
        inactiveDotColor="#90A4AE"
        circleLoop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomSliderBox;

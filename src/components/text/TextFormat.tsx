import {StyleProp, StyleSheet, Text} from 'react-native';
import {Colors} from '../../assets/colors';

interface CsTextProps {
   size?: keyof typeof size;
   weight?: any;
   children: any;
   style?: StyleProp<any>;
   color?: keyof typeof Colors;
   numberOfLines?: number,
}

function TextFormat(props: CsTextProps) {
   return (
      <Text
         numberOfLines={props.numberOfLines}
         style={[
            size[props.size || 'sm'].text,
            {fontWeight: props.weight || 'normal', color: Colors[props.color || 'primaryColor'], alignSelf: 'baseline'},
            props.style,
         ]}>
         {props.children}
      </Text>
   );
}

const size = {
   xs: StyleSheet.create({
      text: {
         fontSize: 11,
      },
   }),
   sm: StyleSheet.create({
      text: {fontSize: 13},
   }),
   md: StyleSheet.create({
      text: {
         fontSize: 17,
      },
   }),
   lg: StyleSheet.create({
      text: {
         fontSize: 20,
      },
   }),
   xxl: StyleSheet.create({
      text: {
         fontSize: 27,
      },
   }),
};

export {TextFormat};

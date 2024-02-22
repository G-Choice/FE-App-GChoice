import React, { Ref } from 'react';
import {StyleSheet, Text, TextInput, View, Keyboard} from 'react-native';
import {Colors} from '../../assets/colors';

interface TextInputProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  type?: keyof typeof type;
  size?: keyof typeof size;
  wrapperStyle?: any;
  textFieldStyle ?: any
  keyboardType?: any;
  error?: string;
  multiline?: boolean
  ref?: Ref<TextInput>;
}

const TextInputField = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <View style={[size[props.size ?? 'sm'].contain, defaultStyle.wrapper, props.wrapperStyle]}>
      <TextInput
        ref={ref}
        onBlur={() => Keyboard.dismiss()}
        multiline={props.multiline}
        onChangeText={props.onChangeText}
        style={[defaultStyle.textField, type[props.type ?? 'left'].placeholder, props.textFieldStyle]}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
      />
      {props.error ? (
        <Text style={defaultStyle.error}>{props.error}</Text>
      ) : null}
    </View>
  );
})
const defaultStyle = StyleSheet.create({
  wrapper: {
  },
  textField: {
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  error: {
    color: 'red',
    fontSize: 11,
    textAlign: 'right',
    marginRight: 10,
  },
});
const size = {
  xs: StyleSheet.create({
    contain: {
      width: 65,
    },
  }),
  sm: StyleSheet.create({
    contain: {
      width: 155,
    },
  }),
  md: StyleSheet.create({
    contain: {
      width: 270,
    },
  }),
  lg: StyleSheet.create({
    contain: {
      width: 331,
    },
  }),
  xxl: StyleSheet.create({
    contain: {
      width: '100%',
    },
  }),
};
const type = {
  left: StyleSheet.create({
    textField: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: Colors.primaryColor,
    },
    placeholder: {
      textAlign: 'left',
      paddingHorizontal: 15,
    },
  }),
  top: StyleSheet.create({
    textField: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: Colors.primaryColor,
    },
    placeholder: {
      textAlign: 'left',
      textAlignVertical: 'top',
      padding: 18
    },
  }),
  center: StyleSheet.create({
    textField: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: Colors.primaryColor,
    },
    placeholder: {
      textAlign: 'center',
    },
  }),
  none: {
    textField: {
      border: 0
    },
    placeholder: {

    },
  }
};

export {TextInputField};

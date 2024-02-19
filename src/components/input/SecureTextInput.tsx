import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard} from 'react-native';
import {Colors} from '../../assets/colors';
import Icon from 'react-native-vector-icons/Feather'


interface SecureTextFieldProps {
  placeholder: string;
  onChangeText ?: (text: string) => void;
  type?: keyof typeof type;
  size?: keyof typeof size;
  wrapperStyle?: any;
  error?: string;
}
const SecureTextInput = (props: SecureTextFieldProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordVisibility = () => {
      setHidePassword(!hidePassword)
  };

  return (
    <View
      style={[defaultStyle.wrapper, size[props.size || 'lg'], defaultStyle.wrapper, props.wrapperStyle]}>
      <TextInput
        onBlur={() => Keyboard.dismiss()}
        secureTextEntry={hidePassword}
        style={[defaultStyle.textField, type[props.type || 'left'].placeholder]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={{position: 'absolute', right: 20, top: 15}}>
        <Icon name={hidePassword ? 'eye-off' : 'eye'} size={20} color={Colors.A}/>
      </TouchableOpacity>
      {props.error ? (
        <Text style={defaultStyle.error}>{props.error}</Text>
      ) : null}
    </View>
  );
};
const defaultStyle = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  textField: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.C,
    paddingHorizontal: 15,
  },
  error: {
    color: 'red',
    fontSize: 11,
    textAlign: 'right',
    marginRight: 10,
  },
});
const size = {
  sm: {
    width: 155,
  },
  lg: {
    width: 331,
  },
};
const type = {
  left: StyleSheet.create({
    placeholder: {
      textAlign: 'left',
    },
  }),
  center: StyleSheet.create({
    placeholder: {
      textAlign: 'center',
    },
  }),
};

export {SecureTextInput};

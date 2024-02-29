import {StyleSheet, TouchableOpacity, View, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import React, { Ref } from "react";
import {TextInputField} from "./TextInputField.tsx";
import {Colors} from "../../assets/colors";

interface SearchBarProps
{
  wrapperStyle?: any
  placeholder: string
  onSubmit: () => void
  inputRef?: Ref<TextInput>
  onChangeText?: (text: string) => void
  error?: string,
  onPressIn: () => void
}

const SearchBar = React.forwardRef<TextInput, SearchBarProps>((props, ref) => {
  return(
    <View style={[defaultStyle.wrapper, props.wrapperStyle]}>
      <View style={defaultStyle.searchBar} >
        <TextInputField
          type='none'
          textFieldStyle={{padding: 5, borderWidth: 0}}
          error={props.error}
          ref={ref}
          wrapperStyle={{width: "50%", border: 0}}
          onChangeText={props.onChangeText} placeholder={props.placeholder}
          onPressIn={props.onPressIn}
        />
        <TouchableOpacity onPress={props.onSubmit} style={{position: 'absolute', zIndex: 1, right: 0, padding: 8}}>
          <Icon name='search' size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
})

const defaultStyle = StyleSheet.create({
  wrapper: {
    margin: 5
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryColor
  }
})

export {SearchBar}
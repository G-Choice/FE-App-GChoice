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
  onBack: () => void
  inputRef?: Ref<TextInput>
  onChangeText?: (text: string) => void
  error?: string
}

const SearchBar = React.forwardRef<TextInput, SearchBarProps>((props, ref) => {
  return(
    <View style={[defaultStyle.wrapper, props.wrapperStyle]}>
      <View style={defaultStyle.searchBar}>
        <TouchableOpacity onPress={props.onBack} style={{padding: 8}}>
          <Icon name='chevron-left' size={30} />
        </TouchableOpacity>
        {/* <CsText style={{alignSelf: "center"}} weight={500}>restaurant:</CsText> */}
        <TextInputField
          type='none'
          textFieldStyle={{padding: 5, borderWidth: 0}}
          error={props.error}
          ref={ref}
          wrapperStyle={{width: "50%", border: 0}}
          onChangeText={props.onChangeText} placeholder={props.placeholder}
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
    width: "100%",
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    // backgroundColor: "red"
  }
})

export {SearchBar}
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react';
// Context
import { useAuth } from '../../context/AuthContext';

interface Props {
   title: string,
   placeholder: string,
   value: any,
   onChangeText: any,
   required: boolean,
   keyboardType: any,
}

const Input = (props: Props) => {
   // Context
   const { useThemeSelector } = useAuth();
   const { theme } = useThemeSelector;
   const color = theme.colors;
   return (
      <View style={styles.inputWrap}>
         <Text style={[styles.titleText, { color: color.onSurface }]}>{props.title}</Text>
         <TextInput style={[styles.textInput, { color: color.onSurface, borderColor: props.value || props.required === false ? color.onSurface : color.error }]}
            placeholder={props.placeholder}
            placeholderTextColor={color.gray}
            onChangeText={props.onChangeText}
            value={props.value}
            keyboardType={props.keyboardType}
         />
      </View>
   )
}

export default Input

const styles = StyleSheet.create({
   inputWrap: {
      height: 75,
      width: '90%',
      marginBottom: 10,
      // borderWidth: 1,
   },
   titleText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 5
   },
   textInput: {
      width: '100%',
      height: 'auto',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      // borderWidth: 1,
      alignSelf: 'center',
   },
})
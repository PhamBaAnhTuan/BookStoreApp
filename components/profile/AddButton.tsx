import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';

interface Props {
   onPress: any,
   title: string,
   color: string
}
const AddButton = (props: Props) => {
   const color = `${props.color}`
   return (
      <TouchableOpacity style={[styles.addBookBtn, { backgroundColor: color }]} onPress={props.onPress}>
         <Text style={styles.addBookText}>{props.title}</Text>
      </TouchableOpacity>
   )
}

export default AddButton

const styles = StyleSheet.create({
   addBookBtn: {
      height: 50,
      width: '90%',
      backgroundColor: '#644f19',
      borderRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
   },
   addBookText: {
      fontSize: 13,
      fontWeight: 'bold',
      color: 'white'
   },
})
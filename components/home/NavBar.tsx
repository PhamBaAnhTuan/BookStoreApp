import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Context
import { useAuth } from '../../context/AuthContext';

interface Props{
   children: any
}
const NavBar = (props: Props) => {
   // Redux
   const {useAuthSelector} = useAuth();
   const {theme} = useAuthSelector;
   const color = theme.colors;
   return (
      <View style={[styles.header, { backgroundColor: color.primary }]}>
         {props.children}
      </View>
   )
}

export default NavBar

const styles = StyleSheet.create({
   // Header
   header: {
      height: 120,
      width: '100%',
      // borderWidth: 1,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
   },
})
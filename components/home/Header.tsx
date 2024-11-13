import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// Context
import { useAuth } from '../../context/AuthContext';

interface Props {
   onPress: any,
}
const Header = (props: Props) => {
   // Auth context
   const { useThemeSelector } = useAuth();
   // Redux state
   const { theme } = useThemeSelector;
   const color = theme.colors;
   return (
      <View style={[styles.header, { backgroundColor: color.primary }]}>
         <TouchableOpacity style={styles.icon} onPress={props.onPress} >
            <Ionicons name="arrow-back" size={21} color="white" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.icon}>
            <Entypo name="dots-three-vertical" size={17} color="white" />
         </TouchableOpacity>
      </View>
   )
}

export default Header

const styles = StyleSheet.create({
   header: {
      height: 60,
      width: '100%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      // borderWidth: 1,
      // borderBottomLeftRadius: 15,
      // borderBottomRightRadius: 15,
   },
   icon: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   },
})
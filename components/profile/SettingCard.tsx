import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useAuth } from '../../context/AuthContext';
// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
   onPress: any,
   icon: any,
   title: string,
}
const SettingCard = (props: Props) => {
   const { useThemeSelector } = useAuth();
   const { theme } = useThemeSelector;
   const color = theme.colors;

   return (
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
         <View style={styles.iconContainer}>
            {props.icon}
         </View>
         <View style={styles.contentContainer}>
            <Text style={{ color: color.text, fontWeight: 'bold' }}>{props.title}</Text>
         </View>
         <View style={styles.wrap}>
            <Entypo name="chevron-right" size={24} color={color.onSurface} />
         </View>
      </TouchableOpacity>
   )
}

export default SettingCard

const styles = StyleSheet.create({
   container: {
      height: 55,
      width: '100%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
   },

   iconContainer: {
      height: '100%',
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   icon: {
      height: 30,
      width: 30,
      // resizeMode: 'contain',
   },


   contentContainer: {
      height: '100%',
      width: '70%',
      // borderWidth: 1,
      justifyContent: 'center',
      paddingLeft: 10,
   },


   wrap: {
      height: '100%',
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   },
   rightIcon: {
      height: 24,
      width: 24,
      resizeMode: 'contain',
   }
})
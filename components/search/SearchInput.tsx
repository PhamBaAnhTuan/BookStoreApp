import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
// Icons
import Feather from 'react-native-vector-icons/Feather';

const SearchInput = () => {
   // Handle search
   const [search, setSearch] = useState('');
   const handleSearchChange = (text: string) => setSearch(text);
   const resetSearch = () => setSearch('');
   return (
      <View style={[styles.searchContainer, { backgroundColor: 'white', opacity: 0.9 }]}>
         <TouchableOpacity style={styles.icon}>
            <Feather name="search" size={23} color="black" />
         </TouchableOpacity>
         <TextInput
            style={styles.searchInput}
            placeholder='Search for book title'
            selectionColor={'orange'}
            placeholderTextColor={'gray'}
            value={search}
            onChangeText={handleSearchChange}
         />
         {search !== ''
            ? (
               <TouchableOpacity style={styles.icon} onPress={resetSearch}>
                  <Feather name="x-circle" size={21} color="black" />
               </TouchableOpacity>
            )
            : null}
      </View>
   )
}

export default SearchInput

const styles = StyleSheet.create({
   searchContainer: {
      height: 45,
      width: '97%',
      // borderWidth: 1,
      borderRadius: 15,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      paddingLeft: 5
   },
   icon: {
      height: 25,
      width: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   },
   xIcon: {
      height: 20,
      width: '10%',
   },

   searchInput: {
      height: '100%',
      width: '80%',
      color: 'black'
   },
})
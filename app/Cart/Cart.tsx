import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
// Icons
import Feather from 'react-native-vector-icons/Feather'
// Context
import { useAuth } from '../../context/AuthContext';
// Components
import ItemCart from '../../components/cart/ItemCart';
import SearchInput from '../../components/search/SearchInput';
import NavBar from '../../components/home/NavBar';

const Cart = ({ navigation }) => {
  // Context
  const { dispatch, useAuthSelector, useThemeSelector } = useAuth();
  // Redux state
  const { books } = useAuthSelector;
  const { theme } = useThemeSelector;
  const color = theme.colors;

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <NavBar
          children={<SearchInput />}
        />

        <View style={styles.itemContainer}>
          {books.map((book: any, index: number) => (
            <ItemCart
              key={index}
              img={book.img ? book.img : 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg?version=6.0.31'}
              title={book.title}
              discount={book.discount}
              is_free={book.free_ship}
              price={book.price}
              sold={book.sold}
              star={book.rate}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Cart;

const styles = StyleSheet.create({
  // Item container
  itemContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
  }
})
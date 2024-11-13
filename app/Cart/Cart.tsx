import { Alert, Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
// Icons
import Feather from 'react-native-vector-icons/Feather'
// Context
import { useAuth } from '../../context/AuthContext';
// Actions
import { removeFromCartAction } from '../redux/reducer/authActions';
// Components
import ItemCart from '../../components/cart/ItemCart';
import SearchInput from '../../components/search/SearchInput';
import NavBar from '../../components/home/NavBar';

const Cart = ({ navigation }) => {
  // Context
  const { dispatch, useAuthSelector, useThemeSelector } = useAuth();
  // Redux state
  const { books, cart } = useAuthSelector;
  const { theme } = useThemeSelector;
  const color = theme.colors;
  // Handle remove
  const [book, setBook] = useState({});
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (isRemoving && book?.id) {
      handleRemove();
      setIsRemoving(false);
    }

  }, [book, isRemoving]);
  const handleRemove = () => {
    Alert.alert(
      `Remove ${book.title}?`,
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel', style: 'cancel',
          onPress: () => {
            ToastAndroid.show(`Canceled!`, ToastAndroid.SHORT);
          }
        },
        {
          text: 'Remove',
          onPress: () => { dispatch(removeFromCartAction(book)) }
        },
      ],
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <NavBar
          children={<SearchInput />}
        />

        <View style={styles.itemContainer}>
          {cart ? (
            cart.map((book: any, index: number) => (
              <ItemCart
                onPress={() => navigation.navigate('BuyNow', { selectedBook: cart[index] })}
                onRemove={
                  () => {
                    setBook(cart[index]);
                    setIsRemoving(true);
                  }
                }
                key={index}
                img={book.img ? book.img : 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg?version=6.0.31'}
                title={book.title}
                discount={book.discount}
                is_free={book.free_ship}
                price={book.price}
                sold={book.sold}
                star={book.rate}
              />
            )))
            : (
              <Text style={[styles.text, { color: color.text }]}>No items in your cart!</Text>
            )
          }
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
  },

  text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30
  },
})
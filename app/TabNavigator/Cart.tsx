import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Theme context
import { useTheme } from '../../context/ThemeContext';
// Components
import ItemCart from '../../components/cart/ItemCart';

const Cart = ({ navigation }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.safeView, { backgroundColor: theme.bgc }]}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.headerContainer}>
        <Text style={[styles.cartTitle, { color: theme.text }]}>Your car</Text>
      </View>
        <View style={styles.itemContainer}>
          <ItemCart
            itemImg={require('../../assets/icons/coat.png')}
            itemName='Nike Coat'
            discount={20}
            price={21}
            sold={8365}
            star={4.5}
          />
          <ItemCart
            itemImg={require('../../assets/icons/jeans.png')}
            itemName='Vietgangz Pant'
            discount={10}
            price={26}
            sold={6887}
            star={5}
          />
          <ItemCart
            itemImg={require('../../assets/icons/soft-drink.png')}
            itemName='Soft drink'
            discount={5}
            price={2}
            sold={9943}
            star={4.7}
          />
          <ItemCart
            itemImg={require('../../assets/icons/sneakers.png')}
            itemName='Soft drink'
            discount={30}
            price={39}
            sold={6045}
            star={4.5}
          />
          <ItemCart
            itemImg={require('../../assets/icons/candy.png')}
            itemName='Sweet candy'
            discount={17}
            price={0.7}
            sold={2143}
            star={4}
          />
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

export default Cart;

const styles = StyleSheet.create({
  safeView: {
    // backgroundColor: 'white',
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },


  // Header container
  headerContainer: {
    height: '10%',
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },

  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },


  // Item container
  itemContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
  }
})
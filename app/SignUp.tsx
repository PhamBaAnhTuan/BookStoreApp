import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react';
// Context
import { useTheme } from '../context/ThemeContext';

const SignUp = ({ navigation }) => {
  const {theme} = useTheme();
  return (
    <SafeAreaView style={styles.safeView}>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo2.png')} resizeMode='contain' />
      </View>
      <View style={styles.shopeeTextContainer}>
        <Image style={styles.shopeeText} source={require('../assets/images/shopeeText.png')} resizeMode='contain' />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.emailInputContainer}>
          <Text style={[styles.emailText, {color: theme.text}]}>Full Name</Text>
          <TextInput style={styles.emailInput} />
        </View>

        <View style={styles.emailInputContainer}>
          <Text style={[styles.emailText, {color: theme.text}]}>Email</Text>
          <TextInput style={styles.emailInput} />
        </View>

        <View style={styles.emailInputContainer}>
          <Text style={[styles.emailText, {color: theme.text}]}>Password</Text>
          <TextInput style={styles.emailInput} secureTextEntry={true} />
        </View>

      </View>

      <View style={styles.signUpBtnContainer}>
        <TouchableOpacity style={styles.signUpBtn}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={{ height: 1, width: '35%', backgroundColor: theme.bgc }}></View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.bgc }}>Or</Text>
          <View style={{ height: 1, width: '35%', backgroundColor: theme.bgc }}></View>
        </View>

        <View style={styles.otherMethodIcon}>
          <TouchableOpacity><Image source={require('../assets/icons/google.png')} resizeMode='cover'/></TouchableOpacity>
          <TouchableOpacity><Image source={require('../assets/icons/meta.png')} resizeMode='cover'/></TouchableOpacity>
          <TouchableOpacity><Image source={require('../assets/icons/instagram.png')} resizeMode='cover'/></TouchableOpacity>
        </View>

        <View style={styles.otherMethodContainer}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.text }}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.bgc }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: '#F1B720',
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    // alignItems: 'center',
  },


  // Logo container
  logoContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
  },
  logo: {
  },

  shopeeTextContainer: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
  },
  shopeeText: {
    // alignSelf: 'center',
  },


  // Input container
  inputContainer: {
    height: 250,
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },

  emailInputContainer: {
    height: 'auto',
    width: '85%',
    // borderWidth: 1,
    marginBottom: 5
  },
  emailText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emailInput: {
    height: 40,
    // borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fde8b2',
    paddingLeft: 10,
  },


  // Sign in btn container
  signUpBtnContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
  },

  signUpBtn: {
    height: 50,
    width: '65%',
    backgroundColor: '#644f19',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: '20%'
  },
  signUpText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white'
  },


  // Or container
  orContainer: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '10%'
  },

  // Other method icons
  otherMethodIcon:{
    height: 'auto',
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 1,
    marginBottom: '10%'
  },

  // Other method container
  otherMethodContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
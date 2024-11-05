import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
// Context
import { useAuth } from '../context/AuthContext';
// Icons
import Feather from 'react-native-vector-icons/Feather';
// Action
import { signUpAction } from './redux/reducer/authActions';

const SignUp = ({ navigation }) => {
  // Auth context
  const {
    userName, setUserName, password, setPassword, dispatch, resetAuth,
    useAuthSelector, useThemeSelector
  } = useAuth();
  // Redux state
  const { signedUpDone } = useAuthSelector;
  const { theme } = useThemeSelector;
  const color = theme.colors;
  // Handle hide password
  const [icon, setIcon] = useState('eye');
  const [isHide, setIsHide] = useState(true);
  const handleIconEye = () => {
    setIcon(icon === "eye" ? "eye-off" : "eye");
    setIsHide(!isHide);
  };
  // Handle email change
  const handleUserNameChange = (text: string) => setUserName(text);
  const handlePasswordChange = (text: string) => setPassword(text);
  // Handle sign up
  // Handle sign in
  const handleSignUp = () => {
    dispatch(signUpAction(userName, password, resetAuth));
  };
  useEffect(() => {
    if (signedUpDone === true) {
      navigation.replace('SignIn');
      ToastAndroid.show('Sign up successful!', ToastAndroid.SHORT);
    }
  }, [signedUpDone]);

  return (
    <SafeAreaView style={{ backgroundColor: color.orange, flex: 1, justifyContent: 'space-between' }}>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo2.png')} resizeMode='contain' />
      </View>
      <View style={styles.shopeeTextContainer}>
        <Image style={styles.shopeeText} source={require('../assets/images/shopeeText.png')} resizeMode='contain' />
      </View>

      <View style={styles.inputContainer}>

        <View style={styles.inputWrap}>
          <Text style={[styles.emailText, { color: 'black' }]}>User Name</Text>
          <TextInput style={[styles.emailInput, { backgroundColor: color.divider, color: color.onSurface }]}
            value={userName}
            onChangeText={handleUserNameChange}
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={[styles.emailText, { color: 'black' }]}>Password</Text>
          <View style={[styles.passwordInputContainer, { backgroundColor: color.white }]}>
            <TextInput style={[styles.passwordInput, { backgroundColor: color.divider, color: color.onSurface }]}
              secureTextEntry={isHide}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              style={[styles.eyeIcon, {backgroundColor: color.divider}]}
              onPress={handleIconEye}
            >
              <Feather name={icon} size={23} color={color.onSurface} />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <View style={styles.signUpBtnContainer}>
        <TouchableOpacity style={[styles.signUpBtn, { backgroundColor: color.success }]} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={{ height: 1, width: '35%', backgroundColor: color.surface }}></View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: color.surface }}>Or</Text>
          <View style={{ height: 1, width: '35%', backgroundColor: color.surface }}></View>
        </View>

        <View style={styles.otherMethodIcon}>
          <TouchableOpacity><Image source={require('../assets/icons/google.png')} resizeMode='cover' /></TouchableOpacity>
          <TouchableOpacity><Image source={require('../assets/icons/meta.png')} resizeMode='cover' /></TouchableOpacity>
          <TouchableOpacity><Image source={require('../assets/icons/instagram.png')} resizeMode='cover' /></TouchableOpacity>
        </View>

        <View style={styles.otherMethodContainer}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn', resetAuth())}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: color.success }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  // Logo container
  logoContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
  },

  // SHopee text
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
  },

  inputWrap: {
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

  passwordInputContainer: {
    height: 40,
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 5,
  },
  passwordInput: {
    height: '100%',
    width: '85%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingLeft: 10
  },
  eyeIcon: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },


  // Sign in btn container
  signUpBtnContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
  },

  signUpBtn: {
    height: 40,
    width: '85%',
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
  otherMethodIcon: {
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
    marginBottom: 20
  }
})
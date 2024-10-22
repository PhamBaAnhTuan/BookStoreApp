import { Dimensions, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
// Context
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
// Icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store/store';
import { loginAction } from './redux/store/userActions';

const SignIn = ({ navigation }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  // Theme
  const { theme } = useTheme();
  // Handle icon eye
  const [icon, setIcon] = useState("eye");
  const [isHide, setIsHide] = useState(true);
  const handleIconEye = () => {
    setIcon(icon === "eye" ? "eye-off" : "eye");
    setIsHide(!isHide);
  };
  // Handle remember
  const [rememberMe, setRememberMe] = useState('check-box-outline-blank');
  const toggleRmbMe = () => {
    rememberMe == 'check-box-outline-blank' ? setRememberMe('check-box') : setRememberMe('check-box-outline-blank')
  }
  // Auth
  const {
    signIn, isAuthenticated, setIsAuthenticated,
    username, setUsername, password, setPassword, user
  } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const handleUsernameChange = (text: string) => setUsername(text);
  const handlePasswordChange = (text: string) => setPassword(text);
  // Handle sign in
  useEffect(() => {
    if (isLogin) {
      signInMethod();
      if (isAuthenticated === true) {
        navigation.replace('TabNavigator');
      }
      else {
        return
      }
      setIsLogin(false);
    }
  }, [isLogin, isAuthenticated]);
  // Sign in method
  const signInMethod = async () => {
    if (!username && !password) {
      ToastAndroid.show('Enter Full name and Password!', ToastAndroid.SHORT);
      return;
    } if (!username) {
      ToastAndroid.show('Enter User name!', ToastAndroid.SHORT);
      return;
    } if (!password) {
      ToastAndroid.show('Enter Password!', ToastAndroid.SHORT);
      return;
    }
    try {
      await signIn(username, password);
    } catch (error) {
      console.log('Sign in error: ', error);
    }
    setUsername('');
    setPassword('');
    setIsLogin(false);
  };

  const log = () => console.log('User: ', user, '| Is authenticated: ', isAuthenticated, '| Is login: ', isLogin)
  const logout = () => { setIsLogin(false), setIsAuthenticated(false) }
  return (
    <SafeAreaView style={{ backgroundColor: theme.orange, flex: 1, justifyContent: 'space-between' }}>
      <StatusBar backgroundColor={'#ff7233'} />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo2.png')} resizeMode='cover' />
      </View>
      <View style={styles.shopeeTextContainer}>
        <Image source={require('../assets/images/shopeeText.png')} resizeMode='contain' />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrap}>
          <Text style={[styles.emailText, { color: 'black' }]}>User Name</Text>
          <TextInput style={[styles.emailInput, { backgroundColor: theme.white, color: 'black' }]}
            value={username}
            onChangeText={handleUsernameChange}
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={[styles.emailText, { color: 'black' }]}>Password</Text>
          <View style={[styles.passwordInputContainer, { backgroundColor: theme.white }]}>
            <TextInput style={[styles.passwordInput, { backgroundColor: theme.white, color: 'black' }]}
              secureTextEntry={isHide}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={handleIconEye}
            >
              <Feather name={icon} size={23} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={toggleRmbMe} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name={rememberMe} size={24} color="black" />
            <Text style={{ fontSize: 12, color: 'black' }}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(loginAction.prototype)}>
            <Text style={{ fontSize: 12, color: 'black' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.signInBtnContainer}>
        <TouchableOpacity style={[styles.signInBtn, { backgroundColor: theme.green }]} onPress={() => dispatch(loginAction())}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.otherMethodContainer}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Not a member? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.green }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  // Logo container
  logoContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
  },

  // Shopee text
  shopeeTextContainer: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
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
    marginBottom: 10
  },
  emailText: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginBottom: 5
  },
  emailInput: {
    height: 40,
    // borderWidth: 1,
    borderRadius: 5,
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
    borderRadius: 5,
    paddingLeft: 10
  },
  eyeIcon: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // Forgot Password container
  forgotPasswordContainer: {
    height: 'auto',
    width: '85%',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


  // Sign in btn container
  signInBtnContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
  },

  signInBtn: {
    height: 40,
    width: '85%',
    backgroundColor: '#644f19',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25%'
  },
  signInText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white'
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
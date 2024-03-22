import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { InputComponent } from '../../components/input/TextField';
import { ButtonComponent } from '../../components/input/Button';
import { useDispatch, useSelector } from 'react-redux';
import { InputStateType } from '../../@types/InputStateType.ts';
import { RootState } from '../../app/store';
import GchoiceAxios from '../../api/index';
import { setAuth } from '../../global-states';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { AsyncStorage } from 'react-native';

const RegisterLayout = () => {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [fullNameInput, setFullNameInput] = useState({ value: '' });
  const [emailInput, setEmailInput] = useState({ value: '' });
  const [passwordInput, setPasswordInput] = useState({ value: '' });
  const [phoneInput, setPhoneInput] = useState({ value: '' });

  const auth = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : 'Invalid email address');
    return isValid;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    const isValid = password.length >= 6;
    setPasswordError(isValid ? '' : 'Password must be at least 6 characters');
    return isValid;
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d+$/;
    
    if (phone && (!phoneRegex.test(phone) || (phone.length !== 10 && phone.length !== 11))) {
      setPhoneError('Invalid phone number');
      return false;
    }
  
    setPhoneError('');
    return true;
  };
  
  const resetForm = () => {
    setEmailInput({ value: '' });
    setPasswordInput({ value: '' });
    setFullNameInput({ value: '' });
    setPhoneInput({ value: '' });
  };

  const submit = async () => {
    Keyboard.dismiss()
    setIsLoading(true);
    if (!emailInput.value && !passwordInput.value) {
      setEmailError('Email is required');
      setPasswordError('Password is required');
      setIsLoading(false);
      return;
    }
  
    if (!validateEmail(emailInput.value) || !validatePassword(passwordInput.value) || !validatePhoneNumber(phoneInput.value)) {
      setIsLoading(false);
      return;
    }
    let data = {
      email: emailInput.value,
      password: passwordInput.value,
      username: fullNameInput.value,
      number_phone: phoneInput.value,
    };
    if (
      !validateEmail(emailInput.value) ||
      !validatePassword(passwordInput.value) ||
      !validatePhoneNumber(phoneInput.value)
    ) {
      setIsLoading(false);
      return;
    }

    GchoiceAxios({
      url: 'auth/register',
      method: 'post',
      data,
    })
      .then(res => {
        dispatch(
          setAuth({
            authToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );
        setIsLoading(false);
        resetForm()
        navigation.navigate('VerificationScreen', { email: emailInput.value });
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
        const status: number = e.response.data.status;
        const errors = e.response.data.error;
        if (errors === 'Username or email already exists') {
            Toast.show({
              type: 'error',
              text1: 'Email already exists',
              visibilityTime: 3000,
              autoHide: true,
            });
          
          setEmailError('Email already exists');
        } else {
          console.log('Error'); 
        }
      });

  };


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logo}
          />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '600',
              fontSize: 25,
            }}>
            Sign Up
          </Text>
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
            }}>
            Sign up to continue
          </Text>
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '700',
              marginTop: 20,
            }}>
            Email <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputComponent
            value={emailInput.value}
            placeholder="Enter email"
            onChangeText={text => setEmailInput({ value: text })}
          />
          {emailError.length > 0 && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '700',
            }}>
            Password <Text style={{ color: 'red' }}>*</Text>
          </Text>

          <InputComponent
            secureTextEntry={!showPassword}
            value={passwordInput.value}
            placeholder="Enter password"
            onChangeText={(text) => setPasswordInput({ value: text })}
          />
          {passwordError.length > 0 && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color={Colors.darkBlack}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: Colors.darkBlack,
              marginLeft: 10,
              fontWeight: '700',
            }}>
            Full Name
          </Text>

          <InputComponent
            value={fullNameInput.value}
            placeholder="Enter name"
            onChangeText={text => setFullNameInput({ value: text })}
          />
          <Text
            style={{ color: Colors.darkBlack, marginLeft: 5, fontWeight: '700' }}>
            {' '}
            Phone
          </Text>

          <InputComponent
            value={phoneInput.value}
            placeholder="Enter phone number"
            onChangeText={text => setPhoneInput({ value: text })}
          />
          {phoneError.length > 0 && (
            <Text style={styles.errorText}>{phoneError}</Text>
          )}

          <ButtonComponent onPress={() => submit()} buttonText="Sign Up" />
          {isLoading && (
            <ActivityIndicator size="large" color={Colors.primaryColor} style={styles.loadingIndicator} />
          )}
          <View style={styles.haveAccountContainer}>
            <Text style={styles.haveAccountText}>
              Do you already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Or sign up with</Text>
            <View style={styles.separatorLine} />
          </View>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/google.jpg')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/Facebook.jpg')}
                style={{ width: 14, height: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/icons/Apple.jpg')}
                style={{ width: 21, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  safeAreaView: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  logo: {
    width: 300,
    height: 60,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 16,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -500,
  },
  input: {
    padding: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: Colors.darkBlack,
    marginBottom: 10,
    color: '#888',
  },
  signUpButton: {
    padding: 12,
    backgroundColor: Colors.primaryColor,
    borderRadius: 12,
    marginTop: 15,
  },
  signUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  haveAccountText: {
    color: Colors.darkBlack,
    fontWeight: '400',
    marginRight: 5
  },
  loginLink: {
    fontWeight: '600',
    color: Colors.primaryColor,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.darkBlack,
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: '300',
    color: Colors.darkBlack,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
  eyeIconContainer: {
    position: 'absolute',
    top: 180,
    right: 20,
  },
});

export { RegisterLayout };

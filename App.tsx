/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "./src/screens/home";
import {BottomTabs} from "./src/navigations";
import {
  RegisterLayout,
  SplashScreen,
  Verification,
  LoginLayout,
  ProductDetail,
} from './src/screens';
import {RootState, store} from './src/app/store'
import {Provider} from 'react-redux'
import { useSelector } from 'react-redux';


export const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='RegisterScreen' component={RegisterLayout} />
      <Stack.Screen name='VerificationScreen' component={Verification} />
      <Stack.Screen name='LoginScreen' component={LoginLayout} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title: '', headerShown: false}} name='HomeScreen' component={BottomTabs} />
      <Stack.Screen  options={{title: '', headerShown: true}} name='ProductDetail' component={ProductDetail} />
    </Stack.Navigator>
  );
};

const App = () => {
  // const { authToken } = useSelector((state: RootState) => state.auth);
  // console.log(authToken,'a')
  const authTokens = true
  return (
    <Provider store={store}>
    <NavigationContainer>
    {authTokens  ? (
      <MainStack />
    ) : (
      <AuthStack />
    )}
  </NavigationContainer>
</Provider>

  );
}

export default App;
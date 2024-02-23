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
// import { RegisterLayout } from './src/screens/register/RegisterLayout';
// import SplashScreen from './src/screens/slash/SplashScreen';
// import { Verification } from './src/screens/verification/Verification';
// import {LoginLayout} from './src/screens/login/LoginLayout';
import {
  RegisterLayout,
  SplashScreen,
  Verification,
  LoginLayout,
  ProductDetail,
} from './src/screens';
import {store} from './src/app/store'
import {Provider} from 'react-redux'


export const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{ title: '', headerShown: false }}
          name='SplashScreen'
          component={SplashScreen}
        />
        <Stack.Screen options={{title: '', headerShown: false}} name='BottomTabs' component={BottomTabs} />
        <Stack.Screen options={{title: '', headerShown: false}} name='HomeScreen' component={Home} />
        <Stack.Screen options={{title: '', headerShown: false}} name='RegisterScreen' component={RegisterLayout} />
        <Stack.Screen options={{title: '', headerShown: false}} name='VerificationScreen' component={Verification} />
        <Stack.Screen options={{title: '', headerShown: false}} name='LoginScreen' component={LoginLayout} />
        <Stack.Screen options={{title: '', headerShown: true}} name='ProductDetail' component={ProductDetail} />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;
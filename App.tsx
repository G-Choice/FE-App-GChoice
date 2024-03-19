
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/screens/home";
import { BottomTabs } from "./src/navigations";

import {
  RegisterLayout,
  SplashScreen,
  Verification,
  LoginLayout,
  ProductDetail,
  CreateGroup,
  GroupEachProduct,
  GroupChatScreen,
  GroupCart,
  ConfirmOrder,
  SetLocation,
  AccountSetting,
  OrderDtail,
  TrackStatus

} from './src/screens';
import { RootState } from './src/app/store'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux';
import { Search } from "./src/screens/search";
import { SearchResult } from "./src/screens/search/SearchResult.tsx";
import { store } from './src/redux/store/store.ts';
import { requestUserPermission } from './src/utils/notificationService.ts';

import messaging, {
  FirebaseMessagingTypes,
  firebase
} from "@react-native-firebase/messaging";
import NotificationPopup from "react-native-push-notification-popup";
import { Platform } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ShopInfor } from './src/screens/shops/ShopInfor.tsx';

const STRIPE_KEY =
  'pk_test_51OuEF7Ex4IqeBbkk3aXFjexlLG0PAGD8cLzHvZTVXMdV50hvM8OhFO2yOjbp2XdAZiorIuU00ErGyTq64BV77YRv00W52VrSxr';

export const Stack = createNativeStackNavigator();

console.log('App is starting, blublu');

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
  const notificationPopupRef = useRef<NotificationPopup | null>(null);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (mess: FirebaseMessagingTypes.RemoteMessage) => {
        if (Platform.OS === "android" && notificationPopupRef.current) {
          notificationPopupRef.current.show({
            title: mess.notification?.title,
            body: mess.notification?.body,
          });
        }
      }
    );
    return unsubscribe;
  });
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen options={{ title: '', headerShown: false }} name='HomeScreen' component={BottomTabs} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='CreateGroup' component={CreateGroup} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='ProductDetail' component={ProductDetail} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='GroupEachProduct' component={GroupEachProduct} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='GroupChat' component={GroupChatScreen} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='Search' component={Search} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='SearchResult' component={SearchResult} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='GroupCart' component={GroupCart} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='ConfirmOrder' component={ConfirmOrder} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='SetLocation' component={SetLocation} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='AccountSetting' component={AccountSetting} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='OrderDetail' component={OrderDtail} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='TrackStatus' component={TrackStatus} />
        <Stack.Screen options={{ title: '', headerShown: false }} name='ShopInfor' component={ShopInfor} />
      </Stack.Navigator>
      <NotificationPopup ref={notificationPopupRef} />
    </>

  );
};

const AuthSelector = () => {

  const { authToken } = useSelector((state: RootState) => state.auth);
  return authToken ? (
    <MainStack />
  ) : (
    <AuthStack />
  )
}

const App = () => {

  // console.log('firebase apps in App', firebase.apps);
  useEffect(() => {
    const requestPermission = async () => {
      await requestUserPermission();
    };
    requestPermission();
  }, []);
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <AuthSelector />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}

export default App;

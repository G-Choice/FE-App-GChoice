
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

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
  CreateGroup,
  GroupEachProduct,
  JoinGroup,
  GroupChatScreen
} from './src/screens';
import { RootState } from './src/app/store'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux';
import {Search} from "./src/screens/search";
import {SearchResult} from "./src/screens/search/SearchResult.tsx";
import {store} from './src/redux/store/store.ts';

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
      <Stack.Screen options={{ title: '', headerShown: false }} name='HomeScreen' component={BottomTabs} />
      <Stack.Screen options={{ title: '', headerShown: false }} name='CreateGroup' component={CreateGroup} />
      <Stack.Screen options={{title: '', headerShown: false}} name='ProductDetail' component={ProductDetail} />
      <Stack.Screen options={{title: '', headerShown: false}} name='GroupEachProduct' component={GroupEachProduct} />
      <Stack.Screen options={{title: '', headerShown: false}} name='JoinGroup' component={JoinGroup} />
      <Stack.Screen options={{title: '', headerShown: false}} name='GroupChat' component={GroupChatScreen} />
      <Stack.Screen options={{title: '', headerShown: false}} name='Search' component={Search} />
      <Stack.Screen options={{title: '', headerShown: false}} name='SearchResult' component={SearchResult} />
    </Stack.Navigator>
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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthSelector />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

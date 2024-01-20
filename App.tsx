import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "./src/screens/home";
import {BottomTabs} from "./src/navigations";
import { RegisterLayout } from './src/screens/register/RegisterLayout';
import SplashScreen from './src/screens/slash/SplashScreen';
import { Verification } from './src/screens/verification/Verification';



export const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{ title: '', headerShown: false }}
          name='SplashScreen'
          component={SplashScreen}
        />
        <Stack.Screen options={{title: '', headerShown: false}} name='BottomTabs' component={BottomTabs} />
        {/*<Stack.Screen options={{title: '', headerShown: false}} name='HomeScreen' component={Home} />*/}
        <Stack.Screen options={{title: '', headerShown: false}} name='RegisterScreen' component={RegisterLayout} />
        <Stack.Screen options={{title: '', headerShown: false}} name='VerificationScreen' component={Verification} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

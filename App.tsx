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

export const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{title: '', headerShown: false}} name='BottomTabs' component={BottomTabs} />
        {/*<Stack.Screen options={{title: '', headerShown: false}} name='HomeScreen' component={Home} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import messaging, {
//     FirebaseMessagingTypes,
//     firebase
//   } from "@react-native-firebase/messaging";

// console.log('index.js blublu')

// global.HermesInternal = true;

// messaging().setBackgroundMessageHandler(async mess => {

// })

// messaging().onNotificationOpenedApp(mess => {
//     console.log(mess);
// })
AppRegistry.registerComponent(appName, () => App);

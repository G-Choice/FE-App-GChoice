/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging, {
    FirebaseMessagingTypes,
    firebase
  } from "@react-native-firebase/messaging";

console.log('index.js blublu')

// console.log('firebase apps', firebase.apps);
// firebase.initializeApp()
// console.log('firebase apps', firebase.apps);

global.HermesInternal = true;
// console.log('firebase apps', firebase.apps);

// if (firebase.apps.length === 0) {
//   // const firebaseConfig = {
//   //   apiKey: 'AIzaSyBsY7IiTyRsdUm_vMFTzQzIRmW2IdwIneM',
//   //   storageBucket: 'gchoice-3b866.appspot.com',
//   //   projectId: 'gchoice-3b866',
//   //   authDomain: 'gchoice-3b866.firebaseapp.com',
//   //   messagingSenderId: '578702676032',
//   //   appId: '1:578702676032:android:1ff526c5c6728f6628cfa5',
//   //   databaseURL: 'https://gchoice-3b866.firebaseio.com'
//   // };
//   const firebaseConfig = {
//     "apiKey": "AIzaSyBsY7IiTyRsdUm_vMFTzQzIRmW2IdwIneM",
//     "appId": "1:578702676032:android:1ff526c5c6728f6628cfa5",
//     "databaseURL": 'https://gchoice-3b866.firebaseio.com',
//     "gaTrackingId": null,
//     "messagingSenderId": "578702676032",
//     "projectId": "gchoice-3b866",
//     "storageBucket": "gchoice-3b866.appspot.com"
//   }
//   console.log('initializarion', firebase.initializeApp(firebaseConfig));
//   console.log('firebase configured');
// }

// console.log('firebase apps', firebase.apps);

// if (firebase.apps.length > 0) {
//   console.log('configuring notifications');
//   messaging().setBackgroundMessageHandler(async mess => {

//   })

//   messaging().onNotificationOpenedApp(mess => {
//       console.log(mess);
//   })
// }
messaging().setBackgroundMessageHandler(async mess => {

})

messaging().onNotificationOpenedApp(mess => {
    console.log(mess);
})
AppRegistry.registerComponent(appName, () => App);
